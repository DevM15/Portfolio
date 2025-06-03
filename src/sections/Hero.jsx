import ButterflyCurve from "./ButterflyCurve"

export default function Hero() {
    return (
        <>
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl w-full m-auto mt-10 mb-[8%] h-3/4 flex items-center justify-between bg-stone-100 dark:bg-stone-900 p-10 rounded-lg shadow-lg relative">
                <div className="bg-stone-200 dark:bg-stone-800 p-5 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                    <div className="rounded-full border-2 border-stone-800 h-64 w-64 mb-10 overflow-hidden"><img src="./mypic.png" alt="" /></div>
                    <h1 className="text-5xl mb-5 font-bold text-10lg">Hi, I'm Dev</h1>
                    <p className="mb-10">A Website Developer from India, Code is an art 🎨 be the artist!</p>
                </div>
                <ButterflyCurve />
            </div>
        </>
    )
}