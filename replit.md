# Overview

This is a React component library project focused on building two reusable UI components: InputField and DataTable. The project uses modern web technologies including React 18+ with TypeScript, TailwindCSS with shadcn/ui components, and comprehensive testing with Vitest. The application follows a full-stack architecture with an Express.js backend, PostgreSQL database using Drizzle ORM, and includes a complete demonstration page showcasing the components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18+ with TypeScript for type safety and modern development patterns
- **Styling**: TailwindCSS with shadcn/ui component library providing a consistent design system and pre-built components
- **Build Tool**: Vite for fast development with hot module replacement and optimized production builds
- **Routing**: Wouter for lightweight client-side routing instead of React Router
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Testing**: Vitest with jsdom environment and React Testing Library for comprehensive component testing

## Component Design Patterns
- **Compound Components**: Both InputField and DataTable use compound component patterns for maximum flexibility and composition
- **Variant-based Styling**: Uses class-variance-authority (CVA) for type-safe component variant management
- **Forward Refs**: Proper ref forwarding throughout all components for seamless integration and accessibility
- **TypeScript Generics**: DataTable leverages generics for type-safe data handling and column definitions
- **Accessibility**: Components include proper ARIA labels, keyboard navigation, and screen reader support

## Backend Architecture
- **Server Framework**: Express.js with TypeScript for type-safe server development
- **Database**: PostgreSQL with Drizzle ORM providing type-safe database operations and schema management
- **Session Management**: Interface-based storage design with in-memory implementation, easily swappable for Redis or other stores
- **API Design**: RESTful API structure with `/api` prefix routing for clear separation from frontend routes
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database queries and migrations
- **Schema**: Centralized schema definitions in shared directory accessible by both client and server
- **Migrations**: Drizzle Kit for database schema migrations and version control
- **Connection**: Neon Database serverless PostgreSQL connection for scalable cloud deployment

## Component Features

### InputField Component
- **Variants**: Three visual styles (filled, outlined, ghost) using CVA for consistent theming
- **Sizes**: Small, medium, and large size options for different UI contexts
- **States**: Comprehensive state management including disabled, invalid, loading, and focus states
- **Enhanced Features**: Optional clear button, password visibility toggle, and extensive validation support
- **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility

### DataTable Component
- **Type Safety**: Generic TypeScript implementation for type-safe data and column handling
- **Sorting**: Built-in column sorting with visual indicators and configurable sort functions
- **Selection**: Single and multiple row selection with callback handlers
- **Loading States**: Skeleton loading animation during data fetching
- **Empty States**: Customizable empty state with optional action buttons
- **Responsive**: Mobile-friendly design with horizontal scrolling and optimized layouts

## Testing Strategy
- **Unit Testing**: Comprehensive test coverage for all component variants, states, and user interactions
- **Accessibility Testing**: Integration with @testing-library/jest-dom for accessibility assertions
- **User Interaction**: Testing Library user-event for realistic user interaction simulation
- **Visual Regression**: Vitest UI for visual test running and debugging

## Development Workflow
- **Hot Reload**: Vite HMR for instant feedback during development
- **Type Checking**: Strict TypeScript configuration with path mapping for clean imports
- **Code Quality**: ESLint integration for code consistency and best practices
- **Build Optimization**: Separate client and server builds with proper asset bundling

# External Dependencies

## UI Component Library
- **shadcn/ui**: Comprehensive React component library built on Radix UI primitives
- **Radix UI**: Headless UI components providing accessibility and behavior foundations
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography

## Database and ORM
- **Neon Database**: Serverless PostgreSQL database service for cloud deployment
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect and migration support
- **Drizzle Kit**: CLI tool for schema management and database migrations

## Development Tools
- **Vite**: Build tool with fast development server and optimized production builds
- **Vitest**: Testing framework with jsdom environment for React component testing
- **TypeScript**: Static type checking for enhanced developer experience and code reliability

## Styling and Design
- **class-variance-authority**: Type-safe variant management for component styling
- **clsx**: Utility for conditional CSS class concatenation
- **tailwind-merge**: Intelligent Tailwind class merging to prevent conflicts

## State Management
- **TanStack Query**: Server state management with caching, synchronization, and background updates
- **React Hook Form**: Form state management with validation (via @hookform/resolvers)

## Authentication and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions (configured but not actively used)
- **Interface-based storage**: Abstraction layer allowing easy swapping between in-memory, Redis, or database storage