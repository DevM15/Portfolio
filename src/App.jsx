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
      <div className="bg-[#00314e] h-full w-full pt-20 pb-10 text-white">
        <div className="max-w-2xl md:max-w-2xl lg:max-w-7xl w-full m-auto flex gap-10 py-20" id="About">
          <div className="w-1/2 border-r-2 border-gray-300 pr-10">
            <About />
            <Education />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
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