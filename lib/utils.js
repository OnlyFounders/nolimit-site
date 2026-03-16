/**
 * Merges class names. Compatible with shadcn/cn pattern.
 * Use clsx + tailwind-merge for full shadcn support when Tailwind is installed.
 */
export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ');
}
