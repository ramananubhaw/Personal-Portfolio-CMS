import { Navs } from "../types";

export default function Navbar({ navigatePage, navs }: { navigatePage: (page: string) => void, navs: Navs }) {
    return (
        <nav className="w-full flex justify-between pl-12 pr-12 items-center shadow-soft-bottom shadow-white/30 fixed top-0 bg-inherit">
            <h1 className="text-4xl text-white font-mntsrt"><span className="text-white/30">&lt;</span> Anubhaw<span className="text-light-green font-bold">Raman&nbsp;</span><span className="text-white/30">/&gt;</span></h1>
            <ul className="w-1/3 h-16 my-3 text-lg flex items-center justify-end gap-x-12 px-0 z-10">
                <li className={`bg-inherit font-mntsrt ${navs.about ? "text-light-green scale-105" : "text-white"} hover:text-light-green hover:cursor-pointer hover:scale-105`}><button onClick={() => navigatePage("about")}>About</button></li>
                <li className={`bg-inherit font-mntsrt ${navs.skills ? "text-light-green scale-105" : "text-white"} hover:text-light-green hover:cursor-pointer hover:scale-105`}><button onClick={() => navigatePage("skills")}>Skills</button></li>
                <li className={`bg-inherit font-mntsrt ${navs.projects ? "text-light-green scale-105" : "text-white"} hover:text-light-green hover:cursor-pointer hover:scale-105`}><button onClick={() => navigatePage("projects")}>Projects</button></li>
                <li className={`bg-inherit font-mntsrt ${navs.experience ? "text-light-green scale-105" : "text-white"} hover:text-light-green hover:cursor-pointer hover:scale-105`}><button onClick={() => navigatePage("experience")}>Experience</button></li>
            </ul>
        </nav>
    )
}