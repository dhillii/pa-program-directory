export interface Program {
  id: string;
  name: string;
  state: string;
  city: string;
  degreeOffered: string;
  
  // Clinical Hours
  healthcareExperience: string; // Mapped to "Clinical Hours Requirement"
  experienceType: string;
  experienceNote: string;
  
  // Academics
  minGpa: string; // "GPA Requirement"
  prerequisiteGpa: string;
  
  // Dates & Duration
  startMonth: string; // Kept for filtering
  startDate: string; // Added: e.g. "5/15/2026"
  applicationDeadline: string; // Added: e.g. "10/1/2025"
  programLength: string; // Added: e.g. "28 months"
  
  // Costs
  tuition: string;
  
  // Testing & accreditation
  testRequirementDetails: string;
  greRequirement: string; // Added: string representation e.g. "Not Required"
  paCatRequirement: string; // Added: e.g. "Not Required"
  pancePassRate: string; // Added: e.g. "97%"
  accreditationStatus: string; // Added: e.g. "Accredited"
  shadowingHours: string; // Added: e.g. "80"

  // Boolean flags for checkboxes
  greRequired: boolean; // Kept for logic
  paCatRequired: boolean;
}

export interface FilterState {
  state: string;
  degreeOffered: string;
  healthcareExperience: string;
  minGpa: string;
  startMonth: string;
  greRequired: boolean; // "No GRE Required"
  paCatRequired: boolean; // "No PA-CAT Required"
}


export const INITIAL_FILTERS: FilterState = {
  state: "",
  degreeOffered: "",
  healthcareExperience: "",
  minGpa: "",
  startMonth: "",
  greRequired: false,
  paCatRequired: false,
};
