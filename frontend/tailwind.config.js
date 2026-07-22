/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--safex-background) / <alpha-value>)",
        surface: "rgb(var(--safex-surface) / <alpha-value>)",
        sidebar: "rgb(var(--safex-sidebar) / <alpha-value>)",
        primary: "rgb(var(--safex-primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--safex-primary-hover) / <alpha-value>)",
        success: "rgb(var(--safex-success) / <alpha-value>)",
        "success-strong": "rgb(var(--safex-success-strong) / <alpha-value>)",
        warning: "rgb(var(--safex-warning) / <alpha-value>)",
        "warning-soft": "rgb(var(--safex-warning-soft) / <alpha-value>)",
        danger: "rgb(var(--safex-danger) / <alpha-value>)",
        info: "rgb(var(--safex-info) / <alpha-value>)",
        "info-soft": "rgb(var(--safex-info-soft) / <alpha-value>)",
        heading: "rgb(var(--safex-heading) / <alpha-value>)",
        body: "rgb(var(--safex-body) / <alpha-value>)",
        muted: "rgb(var(--safex-muted) / <alpha-value>)",
        border: "rgb(var(--safex-border) / <alpha-value>)",
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        shell: "0 24px 80px rgba(15, 23, 42, 0.08)",
        card: "0 18px 50px rgba(15, 23, 42, 0.06)",
        soft: "0 12px 30px rgba(15, 23, 42, 0.05)",
        floating: "0 22px 60px rgba(79, 70, 229, 0.16)",
      },
    },
  },
  plugins: [],
};
