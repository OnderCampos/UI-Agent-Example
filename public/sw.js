/**
 * Service Worker for PriceSmart PWA
 * Provides offline support, caching, and background sync
 */

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `pricesmart-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `pricesmart-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `pricesmart-images-${CACHE_VERSION}`;

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Routes that should use network-first strategy
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '/account/',
  '/cart',
  '/checkout/',
];

// Routes that should use cache-first strategy
const CACHE_FIRST_ROUTES = [
  '/products/',
  '/categories',
  '/stores',
  '/faq',
  '/help',
];

// Max items in dynamic cache
const MAX_DYNAMIC_CACHE_ITEMS = 50;
const MAX_IMAGE_CACHE_ITEMS = 100;

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

/**
 * Activate event - clean old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('pricesmart-') && 
                     name !== STATIC_CACHE && 
                     name !== DYNAMIC_CACHE &&
                     name !== IMAGE_CACHE;
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

/**
 * Fetch event - handle requests with appropriate strategy
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip cross-origin requests (except images)
  if (url.origin !== self.location.origin) {
    if (isImageRequest(request)) {
      event.respondWith(handleImageRequest(request));
    }
    return;
  }

  // Handle image requests
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle API requests (network-first)
  if (isNetworkFirstRoute(url.pathname)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Handle cache-first routes
  if (isCacheFirstRoute(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default: stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request));
});

/**
 * Check if request is for an image
 */
function isImageRequest(request) {
  const acceptHeader = request.headers.get('Accept') || '';
  const url = new URL(request.url);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico'];
  
  return acceptHeader.includes('image/') || 
         imageExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
}

/**
 * Check if route should use network-first strategy
 */
function isNetworkFirstRoute(pathname) {
  return NETWORK_FIRST_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Check if route should use cache-first strategy
 */
function isCacheFirstRoute(pathname) {
  return CACHE_FIRST_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Network-first strategy
 * Try network, fall back to cache
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      await trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_ITEMS);
    }
    
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }
    
    throw error;
  }
}

/**
 * Cache-first strategy
 * Try cache, fall back to network
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      await trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_ITEMS);
    }
    
    return response;
  } catch (error) {
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }
    throw error;
  }
}

/**
 * Stale-while-revalidate strategy
 * Return cached response immediately, update cache in background
 */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then((c) => {
          c.put(request, response.clone());
          trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_ITEMS);
        });
      }
      return response;
    })
    .catch((error) => {
      console.log('[SW] Fetch failed:', error);
      return cached;
    });

  return cached || fetchPromise;
}

/**
 * Handle image requests with cache-first and size limit
 */
async function handleImageRequest(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, response.clone());
      await trimCache(IMAGE_CACHE, MAX_IMAGE_CACHE_ITEMS);
    }
    
    return response;
  } catch (_error) {
    // Return placeholder image on error
    return caches.match('/icons/placeholder.png');
  }
}

/**
 * Trim cache to max items (LRU-like)
 */
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    const deleteCount = keys.length - maxItems;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}

/**
 * Background sync for offline actions
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
  
  if (event.tag === 'sync-wishlist') {
    event.waitUntil(syncWishlist());
  }
});

/**
 * Sync cart with server
 */
async function syncCart() {
  try {
    const pendingCart = await getFromIndexedDB('pending-cart');
    
    if (pendingCart) {
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingCart),
      });
      
      await deleteFromIndexedDB('pending-cart');
      console.log('[SW] Cart synced successfully');
    }
  } catch (error) {
    console.error('[SW] Cart sync failed:', error);
  }
}

/**
 * Sync wishlist with server
 */
async function syncWishlist() {
  try {
    const pendingWishlist = await getFromIndexedDB('pending-wishlist');
    
    if (pendingWishlist) {
      await fetch('/api/wishlist/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingWishlist),
      });
      
      await deleteFromIndexedDB('pending-wishlist');
      console.log('[SW] Wishlist synced successfully');
    }
  } catch (error) {
    console.error('[SW] Wishlist sync failed:', error);
  }
}

/**
 * Push notification handler
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
    },
    actions: data.actions || [
      { action: 'open', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

/**
 * IndexedDB helpers for background sync
 */
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pricesmart-sw', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('pending', { keyPath: 'id' });
    };
  });
}

async function getFromIndexedDB(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending', 'readonly');
    const store = tx.objectStore('pending');
    const request = store.get(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result?.data);
  });
}

async function deleteFromIndexedDB(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending', 'readwrite');
    const store = tx.objectStore('pending');
    const request = store.delete(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

console.log('[SW] Service worker loaded');
