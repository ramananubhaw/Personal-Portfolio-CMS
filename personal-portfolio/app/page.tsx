'use client';

import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Exerience";
import About from "./components/About";
import { Navs } from "./types";
import { useState } from "react";

export default function Home() {

  const [navs, setNavs] = useState<Navs>({
    about: true,
    skills: false,
    experience: false,
    projects: false
  })

  function navigatePage(page: string) {
    setNavs((prevState: Navs) => (
      {...prevState, about: false, skills: false, experience: false, projects: false, [page as keyof Navs]: true}
    ))
  }

  return (
    <div>
      <Navbar navigatePage={navigatePage} navs={navs} />
      {navs.about && <About />}
      {navs.skills && <Skills />}
      {navs.experience && <Experience />}
      {navs.projects && <Projects />}
    </div>
  );
}
