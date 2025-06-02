import About from "./sections/About"
import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"
import Platform from "./sections/Platform"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Education from "./sections/Education"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"

export default function App() {
  return (
    <>
      <div className="h-screen ">
        <Navbar />
        <Hero />
      </div>
      <div className="max-w-2xl md:max-w-2xl lg:max-w-7xl w-full m-auto mb-10 flex">
        <About />
        <Platform />
      </div>
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}