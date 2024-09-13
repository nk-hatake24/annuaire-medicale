export default function Footer(){
    return(
        <footer className="bg-slate-950 max-w-screen overflow-x-clip">
            <div className="max-w-6xl mx-auto flex justify-between  py-10 px-4 lg:px-0 text-slate-50">
                <ul className="navlist flex  flex-col gap-4">
                    <li className="text-sm md:text-md">Home</li>
                    <li className="text-sm md:text-md">Find a doctor</li>
                    <li className="text-sm md:text-md">Find a hospital</li>
                    <li className="text-sm md:text-md">Health A to Z</li>
                    <li className="text-sm md:text-md">Anouncement</li>
                </ul>
                <h2 className="font-semibold text-2xl flex items-center ">MedMeet</h2>
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold">how to contact us</h3> 
                    <p className="text-sm md:text-md">mitcode237gmail.com</p>
                </div>
            </div>
            <div className="bg-zinc-950 w-full text-gray-50">
                <div className="max-w-6xl mx-auto py-3 flex justify-between"> 
                    <p className="text-sm ">copyrignt 2024</p>
                    <p className="text-sm ">by Mitcode</p>
                </div>
            </div>
        </footer>
    )
}