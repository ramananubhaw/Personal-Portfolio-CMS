import Icon from "./Icon";
import Profile from "../assets/profile.svg";
import Experience from "../assets/experience.svg";
import Accounts from "../assets/accounts.svg";
import Skills from "../assets/skills.svg";
import Projects from "../assets/projects.svg";

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

const items = [
  {
    title: "Personal Info",
    url: "#",
    icon: <Icon src={Profile} />
  },
  {
    title: "Projects",
    url: "#",
    icon: <Icon src={Projects} />
  },
  {
    title: "Experiences",
    url: "#",
    icon: <Icon src={Experience} />
  },
  {
    title: "Skills",
    url: "#",
    icon: <Icon src={Skills} />
  },
  {
    title: "Accounts",
    url: "#",
    icon: <Icon src={Accounts} />
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-1/6 text-black font-medium bg-white">
      <SidebarContent className="bg-inherit">
        <SidebarGroup className="bg-inherit">
          <SidebarGroupLabel className="w-full text-black text-2xl font-bold mt-3 mb-5 bg-inherit flex items-center justify-center">Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="bg-inherit">
            <SidebarMenu className="bg-inherit">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full bg-inherit my-1">
                  <SidebarMenuButton asChild className="w-full bg-inherit hover:bg-gray-200">
                    <a href={item.url}>
                      <span className="w-full text-left pl-1 bg-inherit text-base flex items-center py-px">
                        <div className="bg-inherit mr-2">{item.icon}</div>
                        <div className="bg-inherit flex-auto text-lg">{item.title}</div>
                      </span>
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