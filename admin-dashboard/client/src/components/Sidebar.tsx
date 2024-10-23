import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Sidebar({displayPage, activePage}: {displayPage: (page: string) => void; activePage: string;}) {
    return (
        <>
            <SidebarProvider className="w-1/6">
                <AppSidebar displayPage={displayPage} activePage={activePage} />
            </SidebarProvider>
        </>
    )
}