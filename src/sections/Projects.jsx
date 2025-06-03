import Cards from '../components/cards';

export default function Projects() {
    return (
        <>
            <div className=" max-w-2xl md:max-w-2xl lg:max-w-7xl w-full m-auto p-10" id="Projects">
                <h1 className="text-2xl sm:text-3xl font-bold mb-10">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <Cards />
                </div>
            </div>
        </>
    )
}