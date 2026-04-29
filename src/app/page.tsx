import Header from "@/components/layout/Header";
import BottomTabBar from "@/components/layout/BottomTabBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: "430px", margin: "0 auto" }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <BottomTabBar />
    </>
  );
}
