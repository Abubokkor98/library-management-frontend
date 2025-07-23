import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: theme === "dark" 
            ? 'rgb(6 78 59 / 0.15)' 
            : 'hsl(var(--card))',
          border: '1px solid rgb(34 197 94 / 0.3)',
          color: theme === "dark" 
            ? 'rgb(209 250 229)' 
            : 'hsl(var(--foreground))',
          backdropFilter: 'blur(8px)',
          boxShadow: theme === "dark"
            ? '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -2px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(34 197 94 / 0.2)'
            : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05), 0 0 0 1px rgb(34 197 94 / 0.1)',
        },
      }}
      style={
        {
          "--normal-bg": theme === "dark" ? "rgb(6 78 59 / 0.15)" : "hsl(var(--card))",
          "--normal-text": theme === "dark" ? "rgb(209 250 229)" : "hsl(var(--foreground))",
          "--normal-border": "rgb(34 197 94 / 0.3)",
          "--success-bg": theme === "dark" ? "rgb(6 78 59 / 0.2)" : "rgb(240 253 244)",
          "--success-text": theme === "dark" ? "rgb(167 243 208)" : "rgb(6 78 59)",
          "--success-border": theme === "dark" ? "rgb(34 197 94 / 0.4)" : "rgb(34 197 94 / 0.3)",
          "--error-bg": theme === "dark" ? "rgb(127 29 29 / 0.2)" : "rgb(254 242 242)",
          "--error-text": theme === "dark" ? "rgb(248 113 113)" : "rgb(127 29 29)",
          "--error-border": theme === "dark" ? "rgb(239 68 68 / 0.4)" : "rgb(239 68 68 / 0.3)",
          "--warning-bg": theme === "dark" ? "rgb(133 77 14 / 0.2)" : "rgb(255 251 235)",
          "--warning-text": theme === "dark" ? "rgb(253 224 71)" : "rgb(133 77 14)",
          "--warning-border": theme === "dark" ? "rgb(234 179 8 / 0.4)" : "rgb(234 179 8 / 0.3)",
          "--info-bg": theme === "dark" ? "rgb(30 58 138 / 0.2)" : "rgb(239 246 255)",
          "--info-text": theme === "dark" ? "rgb(96 165 250)" : "rgb(30 58 138)",
          "--info-border": theme === "dark" ? "rgb(59 130 246 / 0.4)" : "rgb(59 130 246 / 0.3)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }