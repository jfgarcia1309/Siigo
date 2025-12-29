# Renovation Team Analytics Dashboard

## Overview

A performance analytics dashboard for managing a team of 23 Renewal Managers (Gestores de Renovación) who work remotely handling B2B customer renewals. The application tracks quarterly KPIs including renewal completions, quality scores, and follow-up delays across February, March, and April. It features a main dashboard with team statistics, individual performance tables sorted by impact index (IIT), and a strategic action plan page with corrective measures.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions
- **Build Tool**: Vite with custom Replit plugins

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/` prefix
- **Data Layer**: Drizzle ORM for type-safe database queries

### Data Model
The core entity is `gestores` (managers) tracking:
- Monthly renewal counts (Feb/Mar/Apr)
- Quality score (0-100%)
- Delay percentage
- Performance classification (Alto/Medio/Bajo)

### Impact Index Calculation (IIT)
The system uses a weighted formula to rank managers by risk/impact:
- 50% weight: Normalized renewals (inverse - fewer = higher impact)
- 30% weight: Normalized quality score (inverse)
- 20% weight: Normalized delay percentage

Managers are then segmented into quartiles (Q1-Q4) for prioritization.

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components
    pages/        # Route components (Dashboard, StrategicPlan)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API endpoint definitions
  storage.ts      # Database access layer
  db.ts           # Drizzle connection
shared/           # Shared types and schemas
  schema.ts       # Drizzle table definitions
  routes.ts       # API contract definitions
```

## External Dependencies

### Database
- **PostgreSQL**: Primary data store via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema defined in `shared/schema.ts`, migrations in `./migrations`
- **connect-pg-simple**: Session storage (available but sessions not currently implemented)

### UI Components
- **shadcn/ui**: Full component library installed (new-york style)
- **Radix UI**: Underlying primitives for accessible components
- **Lucide React**: Icon library

### Key NPM Packages
- `drizzle-kit`: Database migration tooling (`npm run db:push`)
- `recharts`: Data visualization (referenced in requirements)
- `zod`: Schema validation for API contracts
- `drizzle-zod`: Auto-generate Zod schemas from Drizzle tables