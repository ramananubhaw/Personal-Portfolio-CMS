import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Sidebar({displayPage, handleLogin}: {displayPage: (page: string) => void; handleLogin: () => void}) {
    return (
        <>
            <SidebarProvider className="w-1/6">
                <AppSidebar displayPage={displayPage} handleLogin={handleLogin} />
            </SidebarProvider>
        </>
    )
}