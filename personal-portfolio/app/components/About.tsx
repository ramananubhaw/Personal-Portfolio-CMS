import Heading from "./Heading";
import MainCard from "./MainCard";
// import BlurCircle from "./BlurCircle";

export default function About() {
    return (
        <MainCard>
            <Heading first="ABOUT" second="ME" />
            {/* <BlurCircle size='25rem' op={0.3} /> */}
        </MainCard>
    )
}