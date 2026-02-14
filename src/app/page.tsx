import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TheLab from "@/components/TheLab";
import Systems from "@/components/Systems";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import GitHubStats from "@/components/GitHubStats";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TheLab />
        <Systems />
        <CurrentlyBuilding />
        <GitHubStats />
        <About />
      </main>
      <Footer />
    </>
  );
}
