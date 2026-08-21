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
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  event.status === "cancelled"
                    ? "bg-red-100"
                    : event.isCompleted
                    ? "bg-green-100"
                    : event.isCurrent
                    ? "bg-[#0052a1] text-white"
                    : "bg-gray-100"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    event.status === "cancelled"
                      ? "text-red-600"
                      : event.isCompleted
                      ? "text-green-600"
                      : event.isCurrent
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                />
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 h-16 ${
                    event.isCompleted ? "bg-green-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}>
              <p
                className={`font-medium ${
                  event.status === "cancelled"
                    ? "text-red-600"
                    : event.isCurrent
                    ? "text-[#0052a1]"
                    : event.isCompleted
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
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
