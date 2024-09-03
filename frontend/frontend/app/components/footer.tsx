export default function Footer(){
    return(
        <footer className="bg-slate-950 max-w-screen overflow-x-clip">
            <div className="max-w-6xl mx-auto flex justify-between  py-10 px-4 lg:px-0 text-slate-50">
                <ul className="navlist flex flex-col gap-4">
                    <li>Home</li>
                    <li>Find a doctor</li>
                    <li>Find a hospital</li>
                    <li>Health A to Z</li>
                    <li>Anouncement</li>
                </ul>
                <h2 className="font-semibold text-2xl flex items-center ">MedMeet</h2>
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold">how to contact us</h3> 
                    <p>mitcode237gmail.com</p>
                </div>
            </div>
            <div className="bg-zinc-950 w-full text-gray-50">
                <div className="max-w-6xl mx-auto py-3 flex justify-between"> 
                    <p>copyrignt 2024</p>
                    <p>by mitcode</p>
                </div>
            </div>
        </footer>
    )
}