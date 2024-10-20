import { AppSidebar } from "./components/Sidebar"
import { SidebarProvider } from "./components/ui/sidebar"

function App() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </>
  )
}

export default App
