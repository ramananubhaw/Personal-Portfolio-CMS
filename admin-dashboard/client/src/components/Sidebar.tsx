import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Sidebar({displayPage, activePage, handleLogin}: {displayPage: (page: string) => void; activePage: string; handleLogin: () => void}) {
    return (
        <>
            <SidebarProvider className="w-1/6">
                <AppSidebar displayPage={displayPage} activePage={activePage} handleLogin={handleLogin} />
            </SidebarProvider>
        </>
    )
}