"use client";

import { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Store, StoreHours as StoreHoursType, DayOfWeek } from "@/types/store";

interface StoreHoursProps {
  hours: StoreHoursType[];
  isOpen: boolean;
  nextOpenTime?: string;
  className?: string;
  expandable?: boolean;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const DAY_ORDER: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function StoreHoursDisplay({
  hours,
  isOpen,
  nextOpenTime,
  className,
  expandable = true,
}: StoreHoursProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const today = getCurrentDay();
  const todayHours = hours.find((h) => h.day === today);

  // Sort hours by day
  const sortedHours = [...hours].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );

  // Group consecutive days with same hours
  const groupedHours = groupHours(sortedHours);

  return (
    <div className={cn("bg-white rounded-xl border border-gray-200", className)}>
      {/* Header */}
      <button
        onClick={() => expandable && setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-4",
          expandable && "cursor-pointer hover:bg-gray-50"
        )}
        disabled={!expandable}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isOpen ? "bg-green-100" : "bg-gray-100"
            )}
          >
            <Clock
              className={cn("w-5 h-5", isOpen ? "text-green-600" : "text-gray-500")}
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-semibold",
                  isOpen ? "text-green-600" : "text-gray-600"
                )}
              >
                {isOpen ? "Open Now" : "Closed"}
              </span>
              {todayHours && !todayHours.isClosed && (
                <span className="text-sm text-gray-500">
                  {isOpen
                    ? `until ${formatTime(todayHours.closeTime)}`
                    : nextOpenTime || `Opens at ${formatTime(todayHours.openTime)}`}
                </span>
              )}
            </div>
            {todayHours && !todayHours.isClosed && (
              <p className="text-sm text-gray-500">
                Today: {formatTime(todayHours.openTime)} - {formatTime(todayHours.closeTime)}
              </p>
            )}
          </div>
        </div>
        {expandable && (
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-400 transition-transform",
              isExpanded && "rotate-180"
            )}
          />
        )}
      </button>

      {/* Expanded Hours */}
      {expandable && isExpanded && (
        <div className="border-t px-4 pb-4">
          <table className="w-full mt-4">
            <tbody>
              {groupedHours.map((group, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b last:border-0",
                    group.days.includes(today) && "bg-[#e6f0fa]/50"
                  )}
                >
                  <td className="py-2 text-sm font-medium text-gray-900">
                    {formatDayRange(group.days)}
                  </td>
                  <td className="py-2 text-sm text-gray-600 text-right">
                    {group.isClosed ? (
                      <span className="text-gray-400">Closed</span>
                    ) : (
                      `${formatTime(group.openTime)} - ${formatTime(group.closeTime)}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

interface StoreHoursCompactProps {
  store: Store;
  className?: string;
}

export function StoreHoursCompact({ store, className }: StoreHoursCompactProps) {
  const today = getCurrentDay();
  const todayHours = store.hours.find((h) => h.day === today);

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          store.isOpen ? "bg-green-500" : "bg-gray-400"
        )}
      />
      <span className={store.isOpen ? "text-green-600" : "text-gray-500"}>
        {store.isOpen ? "Open" : "Closed"}
      </span>
      {todayHours && !todayHours.isClosed && (
        <>
          <span className="text-gray-400">-</span>
          <span className="text-gray-500">
            {store.isOpen
              ? `Closes ${formatTime(todayHours.closeTime)}`
              : `Opens ${formatTime(todayHours.openTime)}`}
          </span>
        </>
      )}
    </div>
  );
}

// Helper functions
function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[new Date().getDay()];
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function formatDayRange(days: DayOfWeek[]): string {
  if (days.length === 1) {
    return DAY_LABELS[days[0]];
  }
  if (days.length === 7) {
    return "Every day";
  }
  // Check if consecutive
  const indices = days.map((d) => DAY_ORDER.indexOf(d)).sort((a, b) => a - b);
  const isConsecutive = indices.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
  
  if (isConsecutive && days.length > 2) {
    return `${DAY_LABELS[days[0]]} - ${DAY_LABELS[days[days.length - 1]]}`;
  }
  
  return days.map((d) => DAY_LABELS[d].slice(0, 3)).join(", ");
}

interface GroupedHours {
  days: DayOfWeek[];
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

function groupHours(hours: StoreHoursType[]): GroupedHours[] {
  const groups: GroupedHours[] = [];
  
  for (const h of hours) {
    const lastGroup = groups[groups.length - 1];
    if (
      lastGroup &&
      lastGroup.openTime === h.openTime &&
      lastGroup.closeTime === h.closeTime &&
      lastGroup.isClosed === h.isClosed
    ) {
      lastGroup.days.push(h.day);
    } else {
      groups.push({
        days: [h.day],
        openTime: h.openTime,
        closeTime: h.closeTime,
        isClosed: h.isClosed,
      });
    }
  }
  
  return groups;
}
