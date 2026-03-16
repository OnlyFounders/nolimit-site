# Setup Instructions: shadcn, Tailwind CSS, TypeScript

Your project currently uses **Vite + React** with **plain JavaScript/JSX**. The TextEffect component is integrated and working. If you want to adopt the full **shadcn + Tailwind + TypeScript** stack, follow these steps.

---

## 1. Install TypeScript

```bash
npm install -D typescript @types/react @types/react-dom
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.jsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.js"]
}
```

Then rename `.jsx` files to `.tsx` and add type annotations as needed.

---

## 2. Install Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:

```javascript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ...
});
```

Create `tailwind.config.js` (optional, for customization):

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

---

## 3. Initialize shadcn

```bash
npx shadcn@latest init
```

During setup, choose:

- **Style**: Default
- **Base color**: Slate (or your preference)
- **CSS variables**: Yes
- **Components path**: `components/ui` (or keep default)
- **Utils path**: `lib/utils`

Ensure `components/ui` and `lib/utils` exist. shadcn will place components in `components/ui` and use `cn` from `lib/utils`.

### Why `components/ui`?

- shadcn’s default location for reusable UI components
- Keeps primitives and design-system components separate
- Matches common Next.js/React conventions for easier adoption across projects

---

## 4. Upgrade `lib/utils` for Tailwind

When using Tailwind, `cn` typically uses `clsx` + `tailwind-merge`:

```bash
npm install clsx tailwind-merge
```

Update `lib/utils.js` → `lib/utils.ts`:

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
```

---

## 5. Convert TextEffect to TypeScript

Rename `components/ui/text-effect.jsx` → `components/ui/text-effect.tsx` and add the original TypeScript types from your reference implementation.

---

## Current Integration Summary

| Item           | Status                                             |
|----------------|----------------------------------------------------|
| Components path| `components/ui` ✓                                 |
| TextEffect     | Added at `components/ui/text-effect.jsx` ✓        |
| framer-motion  | Installed ✓                                        |
| lib/utils (cn) | Added at `lib/utils.js` ✓                          |
| Path alias @/  | Configured in `vite.config.js` ✓                   |
| Hero integration | h1 and p use TextEffect ✓                        |
| TypeScript     | Not used (optional)                                 |
| Tailwind       | Not used (optional)                                 |
| shadcn         | Not used (optional)                                 |
