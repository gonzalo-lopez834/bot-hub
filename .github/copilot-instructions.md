# Bot Hub · Copilot Instructions

## Project Overview
React + Vite SPA showcasing Bot Hub's automation services catalog. UI-only contact forms ready for future API integration. Spanish content for Latin American accounting automation services.

## Architecture Patterns

### Configuration-Driven Design
- **`src/provider/Provider.jsx`**: Centralized config via Context API
  - `AppConfigProvider`: Manages `basePath`, `linkStrategy` ('internal'|'external'|'callback'), and `contact` config
  - `RouterProvider`: Wraps React Router with dynamic `basename` for GitHub Pages deployment
  - Always use `useAppConfig()` hook to access global settings
  - Config is frozen (immutable) after normalization

### Data Flow
1. Static JSON (`src/data/services.json`) → statically imported via Vite
2. `useServices()` hook provides: `services[]`, `getById()`, `getBySlug()`, loading/error states
3. Components consume via hooks—no prop drilling for global data

### Routing Structure
- `/` → `LandingGrid` (service cards grid)
- `/services/:id` → `ServiceDetailView` (detail + contact form)
- `*` → `NotFound`

Service IDs/slugs are interchangeable: route param matches either `service.id` or `service.slug`.

## Component Conventions

### Icon System
`Icon.jsx` uses inline SVG definitions keyed by `iconName` strings ('scale', 'ledger', 'download', 'table', 'bank', 'chef'). Add new icons directly to the `icons` object. All icons have `aria-hidden="true"`.

### Form Handling
- `useContactForm()`: UI-only validation/state manager
  - Returns: `values`, `errors`, `status`, `canSubmit`, `submit()`, `reset()`
  - Currently simulates submission with 700ms delay—replace with real fetch when `contact.url` is configured
  - Validation: required fields + email regex in `validate()` function

### Accessibility Features
- `SkipLink.jsx`: keyboard users can skip to `main`
- `Navbar.jsx`: uses `NavLink` with `aria-current="page"`
- `FormsDetail.jsx`: `aria-live="polite"` for form status, moves focus to feedback region on submit
- All icons use `aria-hidden`, focus rings via `focus:ring-2 focus:ring-[var(--primary)]`

## Styling System

### Tailwind + CSS Variables
- Core theme tokens in `src/styles/index.css`: `--primary`, `--background`, `--muted-foreground`, etc.
- Use `var(--primary)` in Tailwind classes: `text-[var(--primary)]`, `ring-[var(--primary)]`
- Global focus styles defined for `a:focus-visible` and `button:focus-visible`
- Custom animation: `animate-gradient` (8s linear infinite background shift)

### Responsive Patterns
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Detail layout: `lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]` (60/40 split on large screens)
- Sticky sidebar: `lg:sticky lg:top-24`

## Development Workflow

### Scripts
```bash
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Serve production build locally
npm run lint     # ESLint check
```

### File Organization
- Components: single-responsibility, no nested folders (flat `src/components/`)
- Hooks: prefixed with `use`, return objects with destructurable properties
- Data: static JSON in `src/data/`, imported as ES modules
- Styles: global tokens in `src/styles/index.css`, component styles via Tailwind

## Future Integration Points

### Contact Form Backend
When ready, update `AppConfigProvider` in `main.jsx`:
```jsx
config={{ contact: { mode: 'webhook', url: 'https://api.example.com/contact' } }}
```
Then modify `FormsDetail.jsx` to POST to `contact.url` instead of simulated delay.

### External Link Strategy
Set `linkStrategy: 'external'` to open service cards in new tabs, or `'callback'` for custom handlers via `useLinkHandler()`.

## Code Style

- **Imports**: React first, then React Router, then local hooks/components, then styles
- **JSX**: self-closing tags (`<Icon />` not `<Icon></Icon>`)
- **Props**: destructure with defaults (`{ className = '' }`)
- **Naming**: camelCase for JS/JSX files, PascalCase for components
- **Comments**: JSDoc for hooks/providers, inline comments for non-obvious logic only

## Common Tasks

**Add a new service**: Update `src/data/services.json` with `id`, `slug`, `title`, `description`, `longDescription`, `iconName`, `advantages[]`, `href`.

**Add an icon**: Edit `Icon.jsx`, add new SVG to `icons` object with appropriate `iconName` key.

**Change theme colors**: Update CSS variables in `src/styles/index.css` `:root` block.

**Adjust responsive breakpoints**: Modify Tailwind classes directly (no custom breakpoints configured).
