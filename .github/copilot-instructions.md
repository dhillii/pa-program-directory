# PA Program Directory - Copilot Instructions

## Project Overview
This represents the `pa-program-directory` codebase, a React application for searching and filtering Physician Assistant (PA) programs. It uses Vite as a build tool and TypeScript for type safety. It is designed to be a simple tool that can be embedded into a wix side as embed code. The data will come from a publically available google sheet.

## Architecture & Core Concepts
- **Framework**: React 19 + TypeScript.
- **Build Tool**: Vite.
- **Styling**: **CDN-based Tailwind CSS**. 
  - Tailwind is loaded via `<script src="https://cdn.tailwindcss.com"></script>` in `index.html`.
  - Configuration (colors, fonts) is defined inline in `index.html`.
  - **IMPORTANT**: Do NOT install tailwindcss via npm or try to run postcss/tailwind build processes.
- **Data Flow**:
  - `services/programService.ts` fetches data directly from a public Google Sheet CSV using `papaparse`.
  - `App.tsx` holds the global state (`allPrograms`, `filters`) and handles the filtering logic directly.
  - Data is passed down to components (`ProgramList`, `FilterSection`) via props.

## Directory Structure
- `pa-program-directory/`: Root of the actual application (ignore files outside this folder like `PAComparisonTool.tsx` if they conflict).
- `components/`: UI components.
- `services/`: Data access layer (e.g., `programService.ts`).
- `types.ts`: Central location for all TypeScript interfaces (`Program`, `FilterState`).

## Coding Conventions
- **TypeScript**:
  - Strictly use interfaces from `types.ts`.
  - Avoid `any`.
  - Ensure `Program` interface matches the data shape found in the CSV columns (see `programService.ts`).
- **Components**:
  - Use Functional Components with `React.FC` or inferred types.
  - specific imports from `lucide-react` for icons.
- **State Management**:
  - Local state in `App.tsx` usage `useState` and `useEffect` for data loading and filtering.
  - Avoid introducing Redux or Context unless state complexity significantly increases.

## Critical Workflows
- **Development**: Run `npm run dev` to start the Vite server.
- **Data Updates**: Edit the Google Sheet and republish to web (CSV). The app matches columns by name in `programService.ts`.
- **Environment**: `GEMINI_API_KEY` is referenced in `vite.config.ts` and `README.md` but currently not actively used in the main logic (as of now).

## Common Patterns
- **Filtering**: Filters are applied in `App.tsx` inside a `useEffect` that watches `filters` and `allPrograms`. 
- **Icons**: Use `lucide-react` (e.g., `import { Search } from 'lucide-react'`).

## Pitfalls to Avoid
- **Tailwind**: Do not try to debug `tailwind.config.js` - it does not exist. Look in `index.html`.
- **File Location**: Ensure you are working within the `pa-program-directory` folder.
