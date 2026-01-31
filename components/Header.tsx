import React from "react";

const Header: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const cycleText = `${previousYear}-${currentYear} Application Cycle`;

  return (
    <div className="text-center py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-[#2c1a2b]">
        {cycleText}
      </h1>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        The directory is updated annually with information provided by
        participating programs to reflect admissions requirements for each CASPA
        cycle, helping applicants and institutions access admission details in
        one place. The directory is updated annually to reflect admissions
        requirements for each CASPA cycle.
      </p>
    </div>
  );
};

export default Header;
