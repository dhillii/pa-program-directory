import React from "react";
import { Program } from "../types";
import { X } from "lucide-react";

interface ProgramDetailModalProps {
  program: Program;
  onClose: () => void;
}

const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-4 md:pt-0">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative animate-in fade-in zoom-in duration-200 my-0 md:my-8 mt-4 md:mt-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-1"
        >
          <X size={24} />
        </button>

        {/* Content Container with padding for close button */}
        <div className="p-6 md:p-8 pt-12 md:pt-8">
          {/* Header */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h2 className="text-3xl font-bold font-serif text-[#00283c] leading-tight mb-2">
              {program.name}
            </h2>
            <div className="text-[#346663] font-medium text-lg">
              {program.city}, {program.state}
            </div>
            <div className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-wide">
              {program.accreditationStatus}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              {/* Tuition & Length */}
              <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Program Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Tuition</span>
                     <span className="text-gray-900 font-medium">{program.tuition}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Length</span>
                     <span className="text-gray-900 font-medium">{program.programLength}</span>
                  </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Start Date</span>
                     <span className="text-gray-900 font-medium">{program.startDate}</span>
                  </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Deadline</span>
                     <span className="text-gray-900 font-medium">{program.applicationDeadline}</span>
                  </div>
                </div>
              </div>

               {/* Stats */}
               <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Performance
                </h3>
                <div className="bg-[#e6f2f2] px-4 py-3 flex justify-between items-center rounded-sm">
                  <span className="font-bold text-[#4a1d48] text-sm">PANCE Pass Rate</span>
                  <span className="text-gray-900 font-bold text-lg">{program.pancePassRate}</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
               {/* Requirements */}
               <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Requirements
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-sm space-y-3">
                   <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">Min GPA</span>
                     <span className="text-gray-900 font-medium">{program.minGpa}</span>
                  </div>
                   <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">Prereq GPA</span>
                     <span className="text-gray-900 font-medium">{program.prerequisiteGpa}</span>
                  </div>
                   <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">GRE</span>
                     <span className="text-gray-900 font-medium">{program.greRequirement}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">PA-CAT</span>
                     <span className="text-gray-900 font-medium">{program.paCatRequirement}</span>
                  </div>
                </div>
              </div>

               {/* Clinical/Shadowing */}
               <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Experience (Hours)
                </h3>
                <div className="space-y-2">
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Clinical Required</span>
                     <span className="text-gray-900 font-medium">{program.healthcareExperience}</span>
                  </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Shadowing</span>
                     <span className="text-gray-900 font-medium">{program.shadowingHours}</span>
                  </div>
                </div>
                 <p className="mt-2 text-xs text-gray-500 italic leading-relaxed">
                  {program.experienceType}. {program.experienceNote}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailModal;
