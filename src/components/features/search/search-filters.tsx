"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  type: "checkbox" | "range" | "rating";
  options: FilterOption[];
}

interface SearchFiltersProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearAll: () => void;
  priceRange?: { min: number; max: number };
  onPriceRangeChange?: (min: number, max: number) => void;
}

export function SearchFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  priceRange,
  onPriceRangeChange,
}: SearchFiltersProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(filters.map((f) => [f.id, true]))
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleCheckboxChange = (filterId: string, value: string, checked: boolean) => {
    const current = selectedFilters[filterId] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange(filterId, updated);
  };

  const hasActiveFilters = Object.values(selectedFilters).some((v) => v.length > 0);

  return (
    <div className="space-y-6">
      {/* Clear All */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Active Filters</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-[#0052a1] hover:text-[#003d7a]"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pb-4 border-b">
          {Object.entries(selectedFilters).map(([filterId, values]) =>
            values.map((value) => {
              const filter = filters.find((f) => f.id === filterId);
              const option = filter?.options.find((o) => o.value === value);
              return (
                <span
                  key={`${filterId}-${value}`}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#0052a1]/10 text-[#0052a1] rounded-full text-sm"
                >
                  {option?.label || value}
                  <button
                    onClick={() => handleCheckboxChange(filterId, value, false)}
                    className="p-0.5 hover:bg-[#0052a1]/20 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
      )}

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.id} className="border-b pb-4 last:border-0">
          <button
            onClick={() => toggleGroup(group.id)}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">{group.name}</span>
            {expandedGroups[group.id] ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedGroups[group.id] && (
            <div className="mt-2 space-y-2">
              {group.type === "checkbox" &&
                group.options.map((option) => {
                  const isChecked = (selectedFilters[group.id] || []).includes(
                    option.value
                  );
                  return (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`${group.id}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(group.id, option.value, checked as boolean)
                        }
                        className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                      />
                      <Label
                        htmlFor={`${group.id}-${option.value}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                      {option.count !== undefined && (
                        <span className="text-xs text-gray-400">({option.count})</span>
                      )}
                    </div>
                  );
                })}

              {group.type === "rating" &&
                group.options.map((option) => {
                  const isChecked = (selectedFilters[group.id] || []).includes(
                    option.value
                  );
                  const rating = parseInt(option.value);
                  return (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`${group.id}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(group.id, option.value, checked as boolean)
                        }
                        className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                      />
                      <Label
                        htmlFor={`${group.id}-${option.value}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer flex items-center gap-1"
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? "fill-[#f5a623] text-[#f5a623]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1">& Up</span>
                      </Label>
                      {option.count !== undefined && (
                        <span className="text-xs text-gray-400 ml-auto">
                          ({option.count})
                        </span>
                      )}
                    </div>
                  );
                })}

              {group.type === "range" && priceRange && onPriceRangeChange && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Label className="text-xs text-gray-500">Min</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          $
                        </span>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) =>
                            onPriceRangeChange(
                              Math.max(0, parseInt(e.target.value) || 0),
                              priceRange.max
                            )
                          }
                          className="w-full pl-7 pr-3 py-2 border rounded-lg text-sm"
                          min={0}
                        />
                      </div>
                    </div>
                    <span className="text-gray-400 pt-5">-</span>
                    <div className="flex-1">
                      <Label className="text-xs text-gray-500">Max</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          $
                        </span>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) =>
                            onPriceRangeChange(
                              priceRange.min,
                              Math.max(priceRange.min, parseInt(e.target.value) || 0)
                            )
                          }
                          className="w-full pl-7 pr-3 py-2 border rounded-lg text-sm"
                          min={priceRange.min}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
