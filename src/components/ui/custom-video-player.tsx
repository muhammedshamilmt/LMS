'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface CustomVideoPlayerProps {
  src: string;
}

export function CustomVideoPlayer({ src }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls when playing and not hovering
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProgress(value);
    if (videoRef.current && duration) {
      videoRef.current.currentTime = (value / 100) * duration;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
      setIsMuted(value === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden group rounded-[inherit]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Top Gradient Overlay */}
      <div 
        className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Play/Pause Center Overlay */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center hover:bg-indigo-500 hover:scale-105 transition-transform backdrop-blur-md">
            <Play className="w-8 h-8 ml-1" />
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full mb-3">
          <input 
            type="range" 
            min="0" max="100" 
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer hover:h-2 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 hover:[&::-webkit-slider-thumb]:w-4 hover:[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:border-0 hover:[&::-moz-range-thumb]:w-4 hover:[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:transition-all"
            style={{
              background: `linear-gradient(to right, #6366f1 ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
            }}
          />
        </div>

        {/* Buttons and Info */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 group/volume relative">
              <button onClick={toggleMute} className="hover:text-indigo-400 transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input 
                type="range" 
                min="0" max="1" step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-indigo-500 opacity-0 group-hover/volume:opacity-100 transition-opacity absolute left-8 -top-1"
                style={{ top: '6px' }}
              />
            </div>
            <span className="text-sm font-medium opacity-90 font-mono tracking-tighter">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div>
            <button onClick={toggleFullscreen} className="hover:text-indigo-400 transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
