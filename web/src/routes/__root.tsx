import { TanStackDevtools } from "@tanstack/react-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})

import { ThemeProvider } from "@/providers/theme-provider"
import appCss from "../styles.css?url"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "dash",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background">
        <ThemeProvider defaultTheme="system" storageKey="dashy-ui-theme">
          <QueryClientProvider client={queryClient}>
            <main className="relative max-w-400 mx-auto p-3 md:p-6">
              {children}
            </main>
            <AnimatedThemeToggler className="absolute bottom-2 left-2" />

            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
            <Scripts />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
