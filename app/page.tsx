import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ShortURL from "@/components/ShortURL";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ShortURL />
    </div>
  );
}
