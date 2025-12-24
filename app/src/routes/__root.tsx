import { TanStackDevtools } from "@tanstack/react-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import appCss from "../styles.css?url"
import { DashboardToolbar } from "@/components/grid/dashboard-toolbar"
import { Toaster } from "@/components/ui/sonner"
import { HotkeysProvider } from "@/providers/hotkeys-provider"
import { ThemeProvider } from "@/providers/theme-provider"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})

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
      <body className="bg-background w-screen relative min-h-screen">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <HotkeysProvider />
            <DashboardToolbar />
            {children}

            <Toaster position="top-right" richColors />

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
