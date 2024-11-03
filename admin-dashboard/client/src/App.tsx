import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { isLoggedIn } from "./graphql/queries";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import PersonalInfo from "./components/PersonalInfo";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experiences from "./components/Experiences";
import Accounts from "./components/Accounts";

function App() {

  type ShowPage = {
    info: boolean,
    projects: boolean,
    skills: boolean,
    experiences: boolean,
    accounts: boolean
  }

  const [showPage, setShowPage] = useState<ShowPage> ({
    info: true,
    projects: false,
    skills: false,
    experiences: false,
    accounts: false
  })

  const [activePage, setActivePage] = useState<string>("info");

  function displayPage(page: string) {
    setActivePage(page);
    setShowPage((prevState: ShowPage) => ({
      ...prevState,
      info: false,
      projects: false,
      skills: false,
      experiences: false,
      accounts: false,
      [page]: true
    }));
  }

  const [loggedIn, setLoggedIn] = useState<boolean> (false);

  const { error, data } = useQuery(isLoggedIn);

  useEffect(() => {
    if (error) {
      console.log(error);
      return;
    }
    if (data && data.isLoggedIn !== loggedIn) {
      setLoggedIn(!loggedIn);
    }
  }, [data]);

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  return loggedIn ? (
    <div className="flex">
      <Sidebar displayPage={displayPage} activePage={activePage} handleLogin={handleLogin} />
      {showPage.info && <PersonalInfo />}
      {showPage.projects && <Projects />}
      {showPage.skills && <Skills />}
      {showPage.experiences && <Experiences />}
      {showPage.accounts && <Accounts />}
    </div>
  ) : (
    <LoginPage handleLogin={handleLogin} />
  )
}

export default App
