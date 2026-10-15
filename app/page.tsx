import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Program } from "@/components/sections/program";
import { Solutions } from "@/components/sections/solutions";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Solutions />
      <Program />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
