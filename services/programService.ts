import Papa from "papaparse";
import { Program } from "../types";

const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTo22U3urAMM9pFs_s6TpvisdDXzHrLCQOluMUvZKEGUaq1vWoAPY5ukQRNtL3Wg/pub?output=csv";

interface CsvRow {
  "Program Name": string;
  State: string;
  Tuition: string;
  "Program Length": string;
  "GRE Requirement": string;
  "GPA Requirement": string;
  "PA-CAT Requirement": string;
  "PANCE Pass Rate": string;
  "Accreditation Status": string;
  "PA Shadowing Hours": string;
  "Clinical Hours Requirement": string;
  "Application Deadline": string;
  "Start Date": string;
}

export const fetchPrograms = async (): Promise<Program[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const programs: Program[] = results.data.map((row, index) => {
          return mapCsvRowToProgram(row, index);
        });
        resolve(programs);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        reject(error);
      },
    });
  });
};

const mapCsvRowToProgram = (row: CsvRow, index: number): Program => {
  const startDate = row["Start Date"] || "";
  let startMonth = "Unknown";
  
  if (startDate) {
    try {
        const date = new Date(startDate);
        if (!isNaN(date.getTime())) {
            startMonth = date.toLocaleString('default', { month: 'long' });
        }
    } catch(e) {
        // ignore date parse errors
    }
  }

  // Helper to determine requirement strictly based on "Required" vs "Not Required"
  // Used for "No GRE Required" and "No PA-CAT Required" checkboxes logic
  const isRequired = (text: string) => {
    if (!text) return false;
    const lower = text.toLowerCase().trim();
    // It must explicitly contain "required" and NOT contain "not required" or "no"
    return lower.includes("required") && !lower.includes("not required");
  };

  const greReq = row["GRE Requirement"] || "";
  const greRequired = isRequired(greReq);

  const paCatReq = row["PA-CAT Requirement"] || "";
  const paCatRequired = isRequired(paCatReq);

  return {
    id: String(index + 1),
    name: row["Program Name"] || "",
    state: row["State"] || "",
    city: "", // Not in CSV
    degreeOffered: "Masters", // Default assumption
    
    // Clinical Hours
    healthcareExperience: row["Clinical Hours Requirement"] || "",
    experienceType: "Direct Patient Care", // Default / Not in CSV
    experienceNote: "", // Not in CSV
    
    // Academics
    minGpa: row["GPA Requirement"] || "",
    prerequisiteGpa: "", // Not in CSV
    
    // Dates & Duration
    startMonth: startMonth,
    startDate: startDate,
    applicationDeadline: row["Application Deadline"] || "",
    programLength: row["Program Length"] || "",
    
    // Costs
    tuition: row["Tuition"] || "",
    
    // Testing & accreditation
    testRequirementDetails: greReq, 
    greRequirement: greReq,
    paCatRequirement: row["PA-CAT Requirement"] || "",
    pancePassRate: row["PANCE Pass Rate"] || "",
    accreditationStatus: row["Accreditation Status"] || "",
    shadowingHours: row["PA Shadowing Hours"] || "",

    // Boolean flags for checkboxes
    greRequired: greRequired,
    paCatRequired: paCatRequired,
  };
};

export const getUniqueValues = <K extends keyof Program>(
  programs: Program[],
  key: K
): string[] => {
  const values = new Set(programs.map((p) => String(p[key])));
  // Filter out empty strings or "undefined" if desired, currently kept simple
  return Array.from(values).filter(Boolean).sort();
};

