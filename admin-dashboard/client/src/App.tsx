import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setActivePage } from "./redux/appSlice";
// import { RootState } from "./redux/store";
import { isLoggedIn } from "./graphql/admin";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import PersonalInfo from "./components/PersonalInfo";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experiences from "./components/Experiences";
import Accounts from "./components/Accounts";

function App() {

  const dispatch = useDispatch();
  // const { loggedIn } = useSelector((state: RootState) => state.app);
  const [loggedIn, setLoggedIn] = useState<boolean>(
    sessionStorage.getItem("loggedIn") === "true"
  );

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

  function displayPage(page: string) {
    dispatch(setActivePage(page as keyof ShowPage));
    setShowPage({
      info: false,
      projects: false,
      skills: false,
      experiences: false,
      accounts: false,
      [page as keyof ShowPage]: true
    })
  }

  // const [loggedIn, setLoggedIn] = useState<boolean> (false);

  const { error, data } = useQuery(isLoggedIn, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setLoggedIn(data.isLoggedIn);
      sessionStorage.setItem("loggedIn", String(data.isLoggedIn));
    },
    onError: () => {
      console.error(error);
    }
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      return;
    }
    if (data && data.isLoggedIn !== loggedIn) {
      setLoggedIn(!loggedIn);
    }
  }, [data, error]);

  function handleLogin() {
    const newLoggedInState = !loggedIn;
    setLoggedIn(newLoggedInState);
    sessionStorage.setItem("loggedIn", String(newLoggedInState));
  }

  return loggedIn ? (
    <div className="flex">
      <Sidebar displayPage={displayPage} handleLogin={handleLogin} />
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

export default App;
