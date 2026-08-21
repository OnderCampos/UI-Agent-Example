/**
 * Algolia-specific types
 */

/**
 * Algolia search request parameters
 */
export interface AlgoliaSearchParams {
  query: string;
  page?: number;
  hitsPerPage?: number;
  filters?: string;
  facets?: string[];
  facetFilters?: string | string[] | string[][];
  numericFilters?: string[];
  tagFilters?: string | string[] | string[][];
  attributesToRetrieve?: string[];
  attributesToHighlight?: string[];
  attributesToSnippet?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  snippetEllipsisText?: string;
  restrictSearchableAttributes?: string[];
  typoTolerance?: boolean | "min" | "strict";
  aroundLatLng?: string;
  aroundLatLngViaIP?: boolean;
  aroundRadius?: number | "all";
  getRankingInfo?: boolean;
  clickAnalytics?: boolean;
  analytics?: boolean;
  analyticsTags?: string[];
  userToken?: string;
  distinct?: boolean | number;
  enablePersonalization?: boolean;
  personalizationImpact?: number;
  optionalWords?: string | string[];
  removeWordsIfNoResults?: "none" | "lastWords" | "firstWords" | "allOptional";
  sortFacetValuesBy?: "count" | "alpha";
}

/**
 * Algolia search response
 */
export interface AlgoliaSearchResponse<T = Record<string, unknown>> {
  hits: AlgoliaHit<T>[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  params: string;
  facets?: Record<string, Record<string, number>>;
  facets_stats?: Record<string, { min: number; max: number; avg: number; sum: number }>;
  exhaustiveFacetsCount?: boolean;
  exhaustiveNbHits?: boolean;
  queryID?: string;
  userData?: unknown[];
  renderingContent?: {
    facetOrdering?: {
      facets?: { order: string[] };
      values?: Record<string, { order: string[]; sortRemainingBy?: "count" | "alpha" | "hidden" }>;
    };
  };
}

/**
 * Algolia hit (search result item)
 * Extends T with Algolia metadata properties
 */
export type AlgoliaHit<T = Record<string, unknown>> = T & {
  objectID: string;
  _highlightResult?: Record<string, AlgoliaHighlight>;
  _snippetResult?: Record<string, AlgoliaSnippet>;
  _rankingInfo?: AlgoliaRankingInfo;
  _distinctSeqID?: number;
}

/**
 * Algolia highlight result
 */
export interface AlgoliaHighlight {
  value: string;
  matchLevel: "none" | "partial" | "full";
  matchedWords?: string[];
  fullyHighlighted?: boolean;
}

/**
 * Algolia snippet result
 */
export interface AlgoliaSnippet {
  value: string;
  matchLevel: "none" | "partial" | "full";
}

/**
 * Algolia ranking info
 */
export interface AlgoliaRankingInfo {
  nbTypos: number;
  firstMatchedWord: number;
  proximityDistance: number;
  userScore: number;
  geoDistance: number;
  geoPrecision: number;
  nbExactWords: number;
  words: number;
  filters: number;
  matchedGeoLocation?: {
    lat: number;
    lng: number;
    distance: number;
  };
}

/**
 * Algolia index settings
 */
export interface AlgoliaIndexSettings {
  searchableAttributes?: string[];
  attributesForFaceting?: string[];
  unretrievableAttributes?: string[];
  attributesToRetrieve?: string[];
  ranking?: string[];
  customRanking?: string[];
  replicas?: string[];
  maxValuesPerFacet?: number;
  sortFacetValuesBy?: "count" | "alpha";
  attributesToHighlight?: string[];
  attributesToSnippet?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  snippetEllipsisText?: string;
  restrictHighlightAndSnippetArrays?: boolean;
  hitsPerPage?: number;
  paginationLimitedTo?: number;
  minWordSizefor1Typo?: number;
  minWordSizefor2Typos?: number;
  typoTolerance?: boolean | "min" | "strict";
  allowTyposOnNumericTokens?: boolean;
  ignorePlurals?: boolean | string[];
  disableTypoToleranceOnAttributes?: string[];
  disableTypoToleranceOnWords?: string[];
  separatorsToIndex?: string;
  queryType?: "prefixLast" | "prefixAll" | "prefixNone";
  removeWordsIfNoResults?: "none" | "lastWords" | "firstWords" | "allOptional";
  advancedSyntax?: boolean;
  advancedSyntaxFeatures?: ("exactPhrase" | "excludeWords")[];
  optionalWords?: string | string[];
  removeStopWords?: boolean | string[];
  disablePrefixOnAttributes?: string[];
  disableExactOnAttributes?: string[];
  exactOnSingleWordQuery?: "attribute" | "none" | "word";
  alternativesAsExact?: ("ignorePlurals" | "singleWordSynonym" | "multiWordsSynonym")[];
  numericAttributesForFiltering?: string[];
  allowCompressionOfIntegerArray?: boolean;
  attributeForDistinct?: string;
  distinct?: boolean | number;
  replaceSynonymsInHighlight?: boolean;
  minProximity?: number;
  responseFields?: string[];
  maxFacetHits?: number;
  attributeCriteriaComputedByMinProximity?: boolean;
  userData?: Record<string, unknown>;
}

/**
 * Product record for Algolia index
 */
export interface AlgoliaProductRecord {
  objectID: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  brand?: string;
  categories: string[];
  categoryIds: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  image?: string;
  images: string[];
  inStock: boolean;
  quantity?: number;
  attributes: Record<string, string | number | boolean>;
  rating?: number;
  reviewCount?: number;
  createdAt: number;
  updatedAt: number;
  _tags?: string[];
}

/**
 * Autocomplete suggestion
 */
export interface AlgoliaSuggestion {
  query: string;
  objectID: string;
  popularity: number;
  nb_words: number;
  _highlightResult?: {
    query: AlgoliaHighlight;
  };
}

/**
 * Search analytics event
 */
export interface AlgoliaSearchEvent {
  eventType: "click" | "conversion" | "view";
  eventName: string;
  index: string;
  userToken: string;
  timestamp?: number;
  queryID?: string;
  objectIDs?: string[];
  positions?: number[];
}

/**
 * Facet configuration
 */
export interface AlgoliaFacetConfig {
  attribute: string;
  label: string;
  type: "list" | "range" | "boolean" | "color";
  sortBy?: "count" | "alpha" | "isRefined";
  limit?: number;
  showMore?: boolean;
  showMoreLimit?: number;
  searchable?: boolean;
  transformItems?: (items: unknown[]) => unknown[];
}
