import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import ProgramList from "./components/ProgramList";
import { FilterState, INITIAL_FILTERS, Program } from "./types";
import { fetchPrograms } from "./services/programService";

const App: React.FC = () => {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [displayedPrograms, setDisplayedPrograms] = useState<Program[]>([]);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPrograms();
      setAllPrograms(data);
      setDisplayedPrograms(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filtering Logic
  useEffect(() => {
    const filtered = allPrograms.filter((program) => {
      // 1. Dropdown Matches (String equality if filter is present)
      if (filters.state && program.state !== filters.state) return false;
      if (
        filters.degreeOffered &&
        program.degreeOffered !== filters.degreeOffered
      )
        return false;
      if (
        filters.healthcareExperience &&
        program.healthcareExperience !== filters.healthcareExperience
      )
        return false;
      if (filters.minGpa && program.minGpa !== filters.minGpa) return false;
      if (filters.startMonth && program.startMonth !== filters.startMonth)
        return false;

      // 2. Checkbox Requirements - Hide programs that REQUIRE tests when box is checked
      if (filters.greRequired && program.greRequired) return false;
      if (filters.paCatRequired && program.paCatRequired) return false;
      
      return true;
    });

    setDisplayedPrograms(filtered);
  }, [filters, allPrograms]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      {/* Top Banner Stripe simulation */}
      <div className="h-2 w-full bg-[#f4f1ea]"></div>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="max-w-6xl mx-auto">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a1d48]"></div>
             </div>
          ) : (
            <>
              <FilterSection
                programs={allPrograms}
                filters={filters}
                onFilterChange={setFilters}
              />
              <ProgramList programs={displayedPrograms} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
