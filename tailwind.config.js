/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: 'hsl(142,50%,35%)', hover: 'hsl(142,50%,30%)' },
        muted: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 600: '#4b5563', 800: '#1f2937' },
      },
      borderRadius: { xl: '1.25rem' },
      boxShadow: { soft: '0 10px 30px -12px rgba(0,0,0,0.08)' },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0", transform: "translateY(-4px)" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1", transform: "translateY(0)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1", transform: "translateY(0)" },
          to: { height: "0", opacity: "0", transform: "translateY(-4px)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-out-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-out-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "slide-out-to-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "slide-out-to-bottom": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "sheet-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "sheet-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "overlay-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "overlay-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "glass-in": {
          "0%": { 
            opacity: "0",
            backdropFilter: "blur(0px)"
          },
          "100%": { 
            opacity: "1",
            backdropFilter: "blur(12px)"
          },
        },
        "glass-out": {
          "0%": { 
            opacity: "1",
            backdropFilter: "blur(12px)"
          },
          "100%": { 
            opacity: "0",
            backdropFilter: "blur(0px)"
          },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 300ms ease-out",
        "accordion-up": "accordion-up 300ms ease-in",
        "slide-in-from-right": "slide-in-from-right 250ms ease-out",
        "slide-in-from-left": "slide-in-from-left 250ms ease-out",
        "slide-in-from-top": "slide-in-from-top 250ms ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 250ms ease-out",
        "slide-out-to-right": "slide-out-to-right 200ms ease-in",
        "slide-out-to-left": "slide-out-to-left 200ms ease-in",
        "slide-out-to-top": "slide-out-to-top 200ms ease-in",
        "slide-out-to-bottom": "slide-out-to-bottom 200ms ease-in",
        "fade-in": "fade-in 200ms ease-out",
        "fade-out": "fade-out 200ms ease-in",
        "sheet-in-right": "sheet-in-right 240ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        "sheet-out-right": "sheet-out-right 240ms ease-in",
        "overlay-fade-in": "overlay-fade-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        "overlay-fade-out": "overlay-fade-out 240ms ease-in",
        "glass-in": "glass-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        "glass-out": "glass-out 240ms ease-in",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
