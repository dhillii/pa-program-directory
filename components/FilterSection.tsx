import React, { useState } from "react";
import { FilterState, Program } from "../types";
import { getUniqueValues } from "../services/programService";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
  programs: Program[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  programs,
  filters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Derive dropdown options dynamically from available data
  const states = getUniqueValues(programs, "state");
  const degrees = getUniqueValues(programs, "degreeOffered");
  const experiences = getUniqueValues(programs, "healthcareExperience");
  const gpas = getUniqueValues(programs, "minGpa");
  const startMonths = getUniqueValues(programs, "startMonth");

  const handleChange = (
    key: keyof FilterState,
    value: string | boolean
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-[#f8f9fa] border border-gray-200 rounded-md mb-8 shadow-sm">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-700">
          Filter Programs
        </h2>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {/* Filter Body */}
      {isOpen && (
        <div className="p-4 md:p-6 border-t border-gray-200">
          {/* Dropdowns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <select
              value={filters.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded bg-white text-gray-700 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            >
              <option value="">State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={filters.degreeOffered}
              onChange={(e) => handleChange("degreeOffered", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded bg-white text-gray-700 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            >
              <option value="">Degree Offered</option>
              {degrees.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={filters.healthcareExperience}
              onChange={(e) => handleChange("healthcareExperience", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded bg-white text-gray-700 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            >
              <option value="">Clinical Hours Requirement</option>
              {experiences.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>

            <select
              value={filters.minGpa}
              onChange={(e) => handleChange("minGpa", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded bg-white text-gray-700 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            >
              <option value="">Minimum GPA</option>
              {gpas.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              value={filters.startMonth}
              onChange={(e) => handleChange("startMonth", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded bg-white text-gray-700 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            >
              <option value="">Start Month</option>
              {startMonths.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
