"use client";

import { Check, Clock, Package, Truck, Home, X } from "lucide-react";

interface TimelineEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

const statusIcons: Record<string, typeof Check> = {
  placed: Clock,
  confirmed: Check,
  processing: Package,
  shipped: Truck,
  outForDelivery: Truck,
  delivered: Home,
  cancelled: X,
};

function getIconContainerClass(event: TimelineEvent): string {
  if (event.status === "cancelled") return "bg-red-100";
  if (event.isCompleted) return "bg-green-100";
  if (event.isCurrent) return "bg-[#0052a1] text-white";
  return "bg-gray-100";
}

function getIconClass(event: TimelineEvent): string {
  if (event.status === "cancelled") return "text-red-600";
  if (event.isCompleted) return "text-green-600";
  if (event.isCurrent) return "text-white";
  return "text-gray-400";
}

function getLineClass(isCompleted: boolean): string {
  return isCompleted ? "bg-green-300" : "bg-gray-200";
}

function getDescriptionClass(event: TimelineEvent): string {
  if (event.status === "cancelled") return "text-red-600";
  if (event.isCurrent) return "text-[#0052a1]";
  if (event.isCompleted) return "text-gray-900";
  return "text-gray-500";
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <div className="relative">
      {events.map((event, index) => {
        const Icon = statusIcons[event.status] || Check;
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="flex gap-4">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconContainerClass(
                  event
                )}`}
              >
                <Icon
                  className={`w-5 h-5 ${getIconClass(event)}`}
                />
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 h-16 ${getLineClass(event.isCompleted)}`}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}>
              <p
                className={`font-medium ${getDescriptionClass(event)}`}
              >
                {event.description}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(event.timestamp).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
