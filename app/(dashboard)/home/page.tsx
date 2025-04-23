export const dynamic = "force-dynamic";
// import Image from "next/image";
// import logo from "../../../assets/landingpage.png";
import StatsPage from "../stats/page";

function HomePage() {
  return (
    <div className="min-h-screen bg-[url('/AbstractWhiteBG.png')] bg-cover bg-center flex items-center justify-center">
      <StatsPage />
    </div>
  );
}

export default HomePage;
