import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ShortURL from "@/components/ShortURL";

export default function Home() {
  return (
    <div className="bg-gray-200">
      <Navbar />
      <Hero />
      <ShortURL />
    </div>
  );
}
