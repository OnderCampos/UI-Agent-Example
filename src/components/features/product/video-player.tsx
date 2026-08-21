"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductVideo } from "@/types/product";

interface VideoPlayerProps {
  video: ProductVideo;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

export function VideoPlayer({
  video,
  className,
  autoPlay = false,
  showControls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(!autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowOverlay(false);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  const handleVideoClick = useCallback(() => {
    if (showOverlay) {
      handlePlay();
    }
  }, [showOverlay, handlePlay]);

  // Render YouTube embed
  if (video.type === "youtube") {
    const videoId = extractYouTubeId(video.url);
    return (
      <div className={cn("video-container", className)} ref={containerRef}>
        {showOverlay && video.thumbnailUrl ? (
          <div className="relative w-full h-full cursor-pointer" onClick={() => setShowOverlay(false)}>
            <Image
              src={video.thumbnailUrl}
              alt={video.title || "Video thumbnail"}
              fill
              className="object-cover"
            />
            <div className="video-play-button">
              <div className="video-play-icon">
                <Play className="w-8 h-8 text-[#0052a1] ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.title || "Product video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    );
  }

  // Render Vimeo embed
  if (video.type === "vimeo") {
    const videoId = extractVimeoId(video.url);
    return (
      <div className={cn("video-container", className)} ref={containerRef}>
        {showOverlay && video.thumbnailUrl ? (
          <div className="relative w-full h-full cursor-pointer" onClick={() => setShowOverlay(false)}>
            <Image
              src={video.thumbnailUrl}
              alt={video.title || "Video thumbnail"}
              fill
              className="object-cover"
            />
            <div className="video-play-button">
              <div className="video-play-icon">
                <Play className="w-8 h-8 text-[#0052a1] ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
            title={video.title || "Product video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    );
  }

  // Render native video player (MP4, HLS)
  return (
    <div 
      className={cn("video-container group", className)} 
      ref={containerRef}
      onClick={handleVideoClick}
    >
      {/* Thumbnail overlay */}
      {showOverlay && video.thumbnailUrl && (
        <div className="absolute inset-0 z-10 cursor-pointer">
          <Image
            src={video.thumbnailUrl}
            alt={video.title || "Video thumbnail"}
            fill
            className="object-cover"
          />
          <div className="video-play-button">
            <div className="video-play-icon">
              <Play className="w-8 h-8 text-[#0052a1] ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={video.url}
        muted={isMuted}
        autoPlay={autoPlay}
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Controls */}
      {showControls && !showOverlay && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMute();
                }}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
            >
              {isFullscreen ? (
                <X className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}

function extractVimeoId(url: string): string {
  const regExp = /vimeo\.com\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

// Video thumbnail gallery component
interface VideoGalleryProps {
  videos: ProductVideo[];
  onSelectVideo: (video: ProductVideo) => void;
  selectedVideoId?: string;
}

export function VideoGallery({ videos, onSelectVideo, selectedVideoId }: VideoGalleryProps) {
  if (!videos.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {videos.map((video) => (
        <button
          key={video.id}
          onClick={() => onSelectVideo(video)}
          className={cn(
            "relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all",
            selectedVideoId === video.id
              ? "border-[#0052a1] ring-2 ring-[#0052a1]/20"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          {video.thumbnailUrl ? (
            <Image
              src={video.thumbnailUrl}
              alt={video.title || "Video thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Play className="w-6 h-6 text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-6 h-6 text-white" />
          </div>
          {video.duration && (
            <span className="absolute bottom-1 right-1 text-[10px] bg-black/70 text-white px-1 rounded">
              {formatDuration(video.duration)}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
