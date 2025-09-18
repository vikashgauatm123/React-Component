# Overview

This is a React component library project focused on building two reusable UI components: InputField and DataTable. The project uses modern web technologies including React, TypeScript, TailwindCSS, and shadcn/ui components to create a scalable component system with comprehensive testing and documentation capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18+ with TypeScript for type safety
- **Styling**: TailwindCSS with shadcn/ui component library for consistent design system
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management

## Component Design Pattern
- **Compound Components**: Both InputField and DataTable follow compound component patterns for flexibility
- **Variant-based Styling**: Uses class-variance-authority (CVA) for managing component variants
- **Forward Refs**: Proper ref forwarding for component composition
- **TypeScript Generics**: DataTable uses generics for type-safe data handling

## Testing Strategy
- **Testing Framework**: Vitest with jsdom environment
- **Testing Library**: React Testing Library for component testing
- **Test Coverage**: Comprehensive unit tests for both components with accessibility testing

## Development Workflow
- **Hot Reload**: Vite HMR for fast development cycles
- **Type Checking**: Strict TypeScript configuration with path mapping
- **Code Quality**: ESLint and Prettier integration (implied from structure)

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: In-memory storage with interface-based design for easy swapping
- **API Design**: RESTful API structure with `/api` prefix routing

## Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless connection

## Component Features

### InputField Component
- **Variants**: filled, outlined, ghost styles
- **Sizes**: small, medium, large
- **States**: disabled, invalid, loading
- **Features**: clear button, password toggle, validation states
- **Accessibility**: Proper ARIA labels and keyboard navigation

### DataTable Component
- **Generic Type Support**: Type-safe data handling
- **Sorting**: Column-based sorting functionality  
- **Selection**: Single and multiple row selection
- **States**: Loading skeleton, empty state handling
- **Customization**: Custom cell renderers and column configuration

# External Dependencies

## UI Components
- **@radix-ui/***: Comprehensive set of accessible UI primitives for dialogs, dropdowns, tooltips, and form controls
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **tailwind-merge**: TailwindCSS class merging utility

## Icons and Assets
- **lucide-react**: Modern icon library for UI elements
- **@hookform/resolvers**: Form validation resolvers

## Database and Backend
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe SQL toolkit and ORM
- **drizzle-kit**: Database migration and introspection toolkit

## Development Tools
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-***: Replit-specific development plugins for error handling and debugging
- **@testing-library/***: Testing utilities for React components
- **@vitest/ui**: Visual testing interface

## Build and Deployment
- **esbuild**: Fast bundler for server-side code
- **tsx**: TypeScript execution environment
- **postcss**: CSS processing with autoprefixer