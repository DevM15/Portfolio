import About from "./sections/About"
import Hero from "./sections/Hero"
import Navbar from "./components/Navbar"
import Platform from "./Platform"
import Skills from "./sections/Skills"
import Projects from "./sections/Projects"
import Education from "./sections/Education"
import Contact from "./sections/Contact"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full"><img src="./img/bg.png" alt="" className="object-fit w-full h-full" /></div>
        <Navbar />
        <Hero />
      </div>
      <div className="bg-[#00314e] h-full w-full text-white">
        <div className="max-w-2xl lg:max-w-7xl w-full m-auto flex flex-col lg:flex-row gap-10 p-10 md:py-20" id="About">
          <div className="lg:border-r-2 lg:border-gray-300 lg:pr-10 lg:w-1/2">
            <About />
            <Education />
          </div>
          <div className="flex flex-col justify-between lg:w-1/2">
            <Skills />
            <Platform />
          </div>
        </div>
      </div>
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}