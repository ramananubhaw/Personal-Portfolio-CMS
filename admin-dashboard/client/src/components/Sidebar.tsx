import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

// Menu items.
const items = [
  {
    title: "Personal Info",
    url: "#",
  },
  {
    title: "Projects",
    url: "#",
  },
  {
    title: "Experiences",
    url: "#",
  },
  {
    title: "Skills",
    url: "#",
  },
  {
    title: "Accounts",
    url: "#",
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-1/6 text-white bg-black">
      <SidebarContent className="bg-black">
        <SidebarGroup className="bg-inherit">
          <SidebarGroupLabel className="text-white text-lg mb-5 bg-inherit">Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="bg-inherit">
            <SidebarMenu className="bg-inherit">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full bg-inherit">
                  <SidebarMenuButton asChild className="w-full bg-inherit">
                    <a href={item.url}>
                      <span className="w-full text-left pl-1 bg-inherit">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}