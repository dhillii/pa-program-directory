import React, { useEffect } from "react";
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
  // Prevent body scroll when drawer is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer - Slides in from bottom on mobile, from right on desktop */}
      <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-0 md:left-auto md:right-0 z-50 md:w-96 md:h-screen h-[95dvh] bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-bottom md:slide-in-from-right duration-500 ease-out">
        {/* Close Button - Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg md:text-xl font-bold font-serif text-[#2c1a2b] truncate">
            {program.name}
          </h2>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Header Info */}
          <div className="mb-6 pb-4 border-b border-gray-100">
            <div className="text-[#346663] font-medium text-base mb-2">
              {program.city}, {program.state}
            </div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">
              {program.accreditationStatus}
            </div>
          </div>

          <div className="space-y-6">
            {/* Column 1 */}
            <div>
              {/* Tuition & Length */}
              <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                  Program Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Tuition</span>
                     <span className="text-gray-900 font-medium text-sm">{program.tuition}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Length</span>
                     <span className="text-gray-900 font-medium text-sm">{program.programLength}</span>
                  </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Start Date</span>
                     <span className="text-gray-900 font-medium text-sm">{program.startDate}</span>
                  </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Deadline</span>
                     <span className="text-gray-900 font-medium text-sm">{program.applicationDeadline}</span>
                  </div>
                </div>
              </div>

               {/* Stats */}
               <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                  Performance
                </h3>
                <div className="bg-[#e6f2f2] px-3 py-2 flex justify-between items-center rounded-sm">
                  <span className="font-bold text-[#4a1d48] text-sm">PANCE Pass Rate</span>
                  <span className="text-gray-900 font-bold text-base">{program.pancePassRate}</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
               {/* Requirements */}
               <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                  Requirements
                </h3>
                
                <div className="bg-gray-50 p-3 rounded-sm space-y-2">
                   <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">Min GPA</span>
                     <span className="text-gray-900 font-medium text-sm">{program.minGpa}</span>
                  </div>
                   <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">Prereq GPA</span>
                     <span className="text-gray-900 font-medium text-sm">{program.prerequisiteGpa}</span>
                  </div>
                   <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">GRE</span>
                     <span className="text-gray-900 font-medium text-sm">{program.greRequirement}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-bold text-[#4a1d48] text-sm">PA-CAT</span>
                     <span className="text-gray-900 font-medium text-sm">{program.paCatRequirement}</span>
                  </div>
                </div>
              </div>

               {/* Clinical/Shadowing */}
               <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                  Experience (Hours)
                </h3>
                <div className="space-y-2">
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Clinical Required</span>
                     <span className="text-gray-900 font-medium text-sm">{program.healthcareExperience}</span>
                  </div>
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="font-bold text-[#4a1d48] text-sm">Shadowing</span>
                     <span className="text-gray-900 font-medium text-sm">{program.shadowingHours}</span>
                  </div>
                </div>
                 <p className="mt-3 text-xs text-gray-500 italic leading-relaxed">
                  {program.experienceType}. {program.experienceNote}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramDetailModal;
