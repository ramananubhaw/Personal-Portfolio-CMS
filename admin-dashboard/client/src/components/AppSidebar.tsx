import { ReactNode, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { adminLogout } from "@/graphql/queries";
import Icon from "./Icon";
import Profile from "../assets/profile.svg";
import Experience from "../assets/experience.svg";
import Accounts from "../assets/accounts.svg";
import Skills from "../assets/skills.svg";
import Projects from "../assets/projects.svg";
import Logout from "../assets/logout.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const items: {title: string, url: string, icon: ReactNode}[] = [
  {
    title: "Personal Info",
    url: "info",
    icon: <Icon src={Profile} />
  },
  {
    title: "Projects",
    url: "projects",
    icon: <Icon src={Projects} />
  },
  {
    title: "Experiences",
    url: "experiences",
    icon: <Icon src={Experience} />
  },
  {
    title: "Skills",
    url: "skills",
    icon: <Icon src={Skills} />
  },
  {
    title: "Accounts",
    url: "accounts",
    icon: <Icon src={Accounts} />
  },
]

export function AppSidebar({displayPage, activePage, handleLogin}: {displayPage: (page: string) => void; activePage: string; handleLogin: () => void}) {

  const [logout, {error, data}] = useMutation(adminLogout);

  useEffect(() => {
    if (error) {
      console.log(error);
      return;
    }
    if (data && data.adminLogout.loggedOut) {
      console.log(data.adminLogout.message);
      handleLogin();
    }
  }, [data, error]);

  async function handleLogout() {
    try {
      await logout();
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const isActive = (url: string): boolean => url === activePage;

  return (
    <Sidebar className="text-black font-medium shadow-xl bg-white">
      <SidebarContent className="bg-white">
        <SidebarGroup className="bg-inherit">
          <SidebarGroupLabel className="w-full text-black text-2xl font-bold mt-3 mb-5 bg-inherit flex items-center justify-center">Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent className="bg-inherit">
            <SidebarMenu className="bg-inherit">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full bg-inherit my-1">
                  <SidebarMenuButton className={`w-full cursor-pointer ${isActive(item.url) ? "bg-gray-200" : "bg-inherit"} hover:bg-gray-200`} onClick={() => displayPage(item.url)}>
                    <span className="w-full text-left pl-2 bg-inherit text-base flex items-center py-px">
                      <div className="bg-inherit mr-2">{item.icon}</div>
                      <div className="bg-inherit flex-auto text-lg">{item.title}</div>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mb-5 bg-white flex justify-end items-center p-0 hover:bg-white hover:cursor-default w-full pr-5">
        <button onClick={handleLogout} className="bg-white hover:bg-gray-200 p-2 rounded-lg"><Icon src={Logout} className="h-7 hover:cursor-pointer bg-inherit" /></button>
      </div>
    </Sidebar>
  )
}