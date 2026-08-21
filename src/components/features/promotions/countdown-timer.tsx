"use client";

import { useState, useEffect, useCallback } from "react";
import { Timer, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimeRemaining } from "@/types/promotion";

interface CountdownTimerProps {
  endDate: string;
  onExpire?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "urgent";
  showIcon?: boolean;
  label?: string;
  className?: string;
}

function calculateTimeRemaining(endDate: string): TimeRemaining {
  const total = Date.parse(endDate) - Date.now();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  };
}

export function CountdownTimer({
  endDate,
  onExpire,
  size = "md",
  variant = "default",
  showIcon = true,
  label,
  className,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(endDate)
  );
  const [isExpired, setIsExpired] = useState(false);

  const handleExpire = useCallback(() => {
    setIsExpired(true);
    onExpire?.();
  }, [onExpire]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(endDate);
      setTimeRemaining(remaining);

      if (remaining.total <= 0) {
        clearInterval(interval);
        handleExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, handleExpire]);

  if (isExpired) {
    return (
      <div className={cn(
        "flex items-center gap-2 text-gray-500",
        className
      )}>
        <Clock className="w-4 h-4" />
        <span>Sale ended</span>
      </div>
    );
  }

  const isUrgent = timeRemaining.days === 0 && timeRemaining.hours < 4;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  const _boxSizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  // Minimal variant
  if (variant === "minimal") {
    const parts: string[] = [];
    if (timeRemaining.days > 0) parts.push(`${timeRemaining.days}d`);
    parts.push(`${timeRemaining.hours.toString().padStart(2, "0")}h`);
    parts.push(`${timeRemaining.minutes.toString().padStart(2, "0")}m`);
    parts.push(`${timeRemaining.seconds.toString().padStart(2, "0")}s`);

    return (
      <div className={cn(
        "flex items-center gap-1.5 font-mono",
        sizeClasses[size],
        isUrgent ? "text-red-600" : "text-gray-700",
        className
      )}>
        {showIcon && (
          isUrgent 
            ? <AlertTriangle className={iconSizes[size]} />
            : <Timer className={iconSizes[size]} />
        )}
        {label && <span className="font-normal mr-1">{label}</span>}
        <span className="font-medium">{parts.join(" ")}</span>
      </div>
    );
  }

  // Urgent variant
  if (variant === "urgent") {
    return (
      <div className={cn(
        "bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg",
        "flex items-center gap-3",
        className
      )}>
        <AlertTriangle className={cn(iconSizes[size], "animate-pulse")} />
        {label && <span className="font-medium">{label}</span>}
        <div className="flex items-center gap-1 font-mono font-bold">
          {timeRemaining.days > 0 && (
            <>
              <span>{timeRemaining.days.toString().padStart(2, "0")}</span>
              <span className="text-red-200">:</span>
            </>
          )}
          <span>{timeRemaining.hours.toString().padStart(2, "0")}</span>
          <span className="text-red-200">:</span>
          <span>{timeRemaining.minutes.toString().padStart(2, "0")}</span>
          <span className="text-red-200">:</span>
          <span>{timeRemaining.seconds.toString().padStart(2, "0")}</span>
        </div>
      </div>
    );
  }

  // Default variant - boxes
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label && (
        <span className={cn(
          "font-medium text-gray-700",
          sizeClasses[size]
        )}>
          {label}
        </span>
      )}
      <div className="flex items-center gap-2">
        {showIcon && (
          <Timer className={cn(
            iconSizes[size],
            isUrgent ? "text-red-500" : "text-[#0052a1]"
          )} />
        )}
        
        {/* Days - only if > 0 */}
        {timeRemaining.days > 0 && (
          <>
            <TimeBox
              value={timeRemaining.days}
              label="Days"
              size={size}
              isUrgent={isUrgent}
            />
            <span className={cn(
              "font-bold",
              sizeClasses[size],
              isUrgent ? "text-red-500" : "text-gray-400"
            )}>:</span>
          </>
        )}

        {/* Hours */}
        <TimeBox
          value={timeRemaining.hours}
          label="Hours"
          size={size}
          isUrgent={isUrgent}
        />
        <span className={cn(
          "font-bold",
          sizeClasses[size],
          isUrgent ? "text-red-500" : "text-gray-400"
        )}>:</span>

        {/* Minutes */}
        <TimeBox
          value={timeRemaining.minutes}
          label="Mins"
          size={size}
          isUrgent={isUrgent}
        />
        <span className={cn(
          "font-bold",
          sizeClasses[size],
          isUrgent ? "text-red-500" : "text-gray-400"
        )}>:</span>

        {/* Seconds */}
        <TimeBox
          value={timeRemaining.seconds}
          label="Secs"
          size={size}
          isUrgent={isUrgent}
        />
      </div>
    </div>
  );
}

interface TimeBoxProps {
  value: number;
  label: string;
  size: "sm" | "md" | "lg";
  isUrgent?: boolean;
}

function TimeBox({ value, label, size, isUrgent }: TimeBoxProps) {
  const boxSizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const labelSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "rounded-lg flex items-center justify-center font-mono font-bold",
        boxSizeClasses[size],
        isUrgent
          ? "bg-red-100 text-red-600"
          : "bg-[#e6f0fa] text-[#0052a1]"
      )}>
        {value.toString().padStart(2, "0")}
      </div>
      <span className={cn(
        "text-gray-500 mt-1",
        labelSizes[size]
      )}>
        {label}
      </span>
    </div>
  );
}

/**
 * Simple inline countdown (e.g. "Ends in 2h 34m")
 */
export function CountdownInline({
  endDate,
  prefix = "Ends in",
  className,
}: {
  endDate: string;
  prefix?: string;
  className?: string;
}) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(endDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (timeRemaining.total <= 0) {
    return <span className={cn("text-gray-500", className)}>Ended</span>;
  }

  const parts: string[] = [];
  if (timeRemaining.days > 0) {
    parts.push(`${timeRemaining.days}d`);
  }
  if (timeRemaining.hours > 0 || timeRemaining.days > 0) {
    parts.push(`${timeRemaining.hours}h`);
  }
  parts.push(`${timeRemaining.minutes}m`);

  const isUrgent = timeRemaining.days === 0 && timeRemaining.hours < 4;

  return (
    <span className={cn(
      "font-medium",
      isUrgent ? "text-red-600" : "text-gray-700",
      className
    )}>
      {prefix} {parts.join(" ")}
    </span>
  );
}
