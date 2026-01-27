import About from "./components/About";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Certifications from "./components/Certifications";
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <main className="themed-bg themed-text flex justify-center items-center mx-auto px-5 sm:px-10">
        <div className="max-w-7xl w-full">
          <About />
          <Skills/>
          <Project/>
          <Certifications/>
          <Contact/>
        </div>
      </main>
      <Footer />
    </>
  );
}
