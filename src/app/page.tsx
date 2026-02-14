import { HeroControlRoom } from "@/components/HeroControlRoom";
import { LabGrid } from "@/components/LabGrid";
import { SystemsStrip } from "@/components/SystemsStrip";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { GithubIntel } from "@/components/GithubIntel";
import { AboutMinimal } from "@/components/AboutMinimal";

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-a" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-b" aria-hidden="true" />

      <HeroControlRoom />
      <LabGrid />
      <SystemsStrip />
      <CurrentlyBuilding />
      <GithubIntel />
      <AboutMinimal />
    </main>
  );
}
