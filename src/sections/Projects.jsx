import Cards from '../components/cards';

export default function Projects() {
    return (
        <>
            <div className=" max-w-2xl md:max-w-2xl lg:max-w-7xl w-full m-auto my-10 py-10" id="Projects">
                <h1 className="text-4xl font-bold mb-10 ">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    <Cards />
                </div>
            </div>
        </>
    )
}