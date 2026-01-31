import React, { useState } from "react";
import { Program } from "../types";
import { Check, X, ArrowLeft, ArrowRightLeft, Download } from "lucide-react";
import ProgramDetailModal from "./ProgramDetailModal";

interface ProgramListProps {
  programs: Program[];
}

const ProgramList: React.FC<ProgramListProps> = ({ programs }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert("You can compare up to 3 programs at a time.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
    setIsComparing(false);
  };

  const downloadCSV = () => {
    if (programs.length === 0) return;

    // Define CSV Headers
    const headers = [
      "ID",
      "Program Name",
      "State",
      "City",
      "Degree",
      "Tuition",
      "Length",
      "Start Date",
      "Deadline",
      "Clinical Hours",
      "Shadowing Hours",
      "Min GPA",
      "Prereq GPA",
      "GRE Req",
      "PA-CAT Req",
      "PANCE Rate",
      "Accreditation"
    ];

    // Map data to rows
    const rows = programs.map((p) => [
      p.id,
      `"${p.name}"`, // Quote name to handle commas
      p.state,
      p.city,
      p.degreeOffered,
      `"${p.tuition}"`,
      p.programLength,
      p.startDate,
      p.applicationDeadline,
      `"${p.healthcareExperience}"`,
      p.shadowingHours,
      p.minGpa,
      p.prerequisiteGpa,
      p.greRequirement,
      p.paCatRequirement,
      p.pancePassRate,
      p.accreditationStatus
    ]);

    // Combine headers and rows
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pa_programs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isComparing) {
    const comparisonList = programs.filter((p) => selectedIds.includes(p.id));

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsComparing(false)}
            className="flex items-center text-[#4a1d48] font-bold text-sm uppercase tracking-wider hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </button>
          <h2 className="text-xl font-serif text-[#2c1a2b] font-bold">
            Program Comparison
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3 bg-gray-50 border border-gray-200 w-1/4 font-bold text-gray-700">
                  Feature
                </th>
                {comparisonList.map((p) => (
                  <th
                    key={p.id}
                    className="p-3 bg-gray-50 border border-gray-200 w-1/4 align-top text-[#4a1d48] font-serif font-bold text-base"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Basic Info */}
              {renderRow("State", comparisonList, (p) => p.state)}
              {renderRow("City", comparisonList, (p) => p.city)}
              {renderRow("Tuition", comparisonList, (p) => p.tuition)}
              {renderRow("Program Length", comparisonList, (p) => p.programLength)}
              
              {/* Dates */}
              {renderRow("Start Date", comparisonList, (p) => p.startDate)}
              {renderRow("Deadline", comparisonList, (p) => p.applicationDeadline)}

              {/* Requirements */}
              {renderRow("Clinical Hours", comparisonList, (p) => p.healthcareExperience)}
              {renderRow("Shadowing Hours", comparisonList, (p) => p.shadowingHours)}
              {renderRow("Min GPA", comparisonList, (p) => p.minGpa)}
              {renderRow("Prereq GPA", comparisonList, (p) => p.prerequisiteGpa)}
              {renderRow("GRE", comparisonList, (p) => p.greRequirement)}
              {renderRow("PA-CAT", comparisonList, (p) => p.paCatRequirement)}
              
              {/* Stats */}
              {renderRow("PANCE Rate", comparisonList, (p) => p.pancePassRate)}
              {renderRow("Accreditation", comparisonList, (p) => p.accreditationStatus)}
              
              {/* Features (Booleans) */}
              {renderBoolRow("Part-time Option", comparisonList, "partTimeOption")}
              {renderBoolRow("Undergrad to Masters", comparisonList, "undergradToMasters")}
              {renderBoolRow("Masters to Doctorate", comparisonList, "mastersToDoctorate")}
              {renderBoolRow("Accepts Int'l", comparisonList, "acceptsInternational")}
              {renderBoolRow("Veteran Support", comparisonList, "veteranSupport")}
              {renderBoolRow("On Campus Housing", comparisonList, "onCampusHousing")}
              {renderBoolRow("Distance Learning", comparisonList, "distanceLearning")}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
      
      <div>
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 bg-gray-50 p-3 rounded border border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="text-sm text-gray-600 order-2 md:order-1">
            <span className="font-bold text-[#4a1d48]">{selectedIds.length}</span>{" "}
            program{selectedIds.length !== 1 && "s"} selected (max 3)
          </div>

          <div className="flex gap-3 order-1 md:order-2 w-full md:w-auto justify-end">
            <button
                onClick={downloadCSV}
                className="flex items-center text-gray-600 hover:text-[#4a1d48] text-xs font-bold uppercase tracking-wider mr-4"
                title="Download CSV"
            >
                <Download className="w-4 h-4 mr-1" />
                Download
            </button>

            {selectedIds.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-gray-500 hover:text-gray-700 text-xs uppercase font-bold tracking-wider"
              >
                Clear
              </button>
            )}

            <button
              onClick={() => setIsComparing(true)}
              disabled={selectedIds.length < 2}
              className={`flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase rounded transition-colors ${
                selectedIds.length >= 2
                  ? "bg-[#c5a065] hover:bg-[#a88550] text-white shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Compare
            </button>
          </div>
        </div>

        {/* List View */}
        <div className="w-full">
          {/* Table Header */}
          <div className="hidden md:flex justify-between items-center py-3 border-b-2 border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <div className="flex-1">Program</div>
            <div className="w-1/3 text-right pr-4">State</div>
            <div className="w-16 text-center">Compare</div>
          </div>

          {/* Program Items */}
          <div className="flex flex-col">
            {programs.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No programs match your filters.
              </div>
            ) : (
              programs.map((program, index) => {
                const isSelected = selectedIds.includes(program.id);
                return (
                  <div
                    key={program.id}
                    className={`flex flex-col md:flex-row items-start md:items-center py-4 px-2 md:px-4 border-b border-gray-100 transition-colors
                      ${index % 2 === 0 ? "bg-[#f4f7f8]" : "bg-white"}
                      ${
                        isSelected
                          ? "!bg-yellow-50 !border-l-4 !border-l-[#c5a065]"
                          : ""
                      }
                    `}
                  >
                    {/* Program Info (Clickable) */}
                    <div className="w-full flex-1 mb-2 md:mb-0 pl-1 cursor-pointer group" onClick={() => setSelectedProgram(program)}>
                      <h3 className="text-[#4a1d48] font-bold text-sm md:text-base font-serif group-hover:underline group-hover:text-[#6a2b66]">
                        {program.name}
                      </h3>
                      {/* Mobile Only Location shows here too usually, but we have column for state */}
                    </div>

                    {/* State */}
                    <div className="w-full md:w-1/3 text-left md:text-right text-sm text-gray-600 pl-1 md:pr-8 mb-2 md:mb-0">
                      {program.state}
                    </div>

                    {/* Checkbox Area - Moved to END */}
                    <div className="w-full md:w-16 flex items-center md:justify-center">
                      <label className="flex items-center cursor-pointer p-1">
                        <span className="md:hidden mr-2 text-xs font-bold text-gray-500 uppercase">
                          Compare
                        </span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelection(program.id)}
                          className="w-5 h-5 accent-[#c5a065] cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper for rendering comparison rows
const renderRow = (
  label: string,
  programs: Program[],
  getValue: (p: Program) => React.ReactNode
) => (
  <tr>
    <td className="p-3 border border-gray-200 font-medium text-gray-600 bg-gray-50 w-1/4">
      {label}
    </td>
    {programs.map((p) => (
      <td
        key={p.id}
        className="p-3 border border-gray-200 text-gray-800 w-1/4"
      >
        {getValue(p)}
      </td>
    ))}
  </tr>
);

const renderBoolRow = (
  label: string,
  programs: Program[],
  key: keyof Program
) => (
  <tr>
    <td className="p-3 border border-gray-200 font-medium text-gray-600 bg-gray-50 w-1/4">
      {label}
    </td>
    {programs.map((p) => {
      // @ts-ignore
      const val = p[key];
      return (
        <td
          key={p.id}
          className="p-3 border border-gray-200 text-gray-800 text-left w-1/4"
        >
          {val ? (
            <div className="flex items-center text-teal-700 font-bold">
              <Check className="w-4 h-4 mr-1" />
              <span className="text-xs uppercase">Yes</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <X className="w-4 h-4 mr-1" />
              <span className="text-xs uppercase">No</span>
            </div>
          )}
        </td>
      );
    })}
  </tr>
);

export default ProgramList;
