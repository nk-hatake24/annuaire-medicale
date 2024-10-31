export default function AmountBar(){
    return(
        <div className="h-52 flex flex-row gap-8 md:gap-28 justify-center items-center bg-blue-600 text-slate-50">
            <div className="flex flex-col gap-4 max-w-28 md:max-w-none">
                <h2 className="font-extrabold  text-3xl md:text-5xl text-center">13000+</h2>
                <p className="text-md md:text-xl font-bold line text-center">doctors of all specialties</p>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="font-extrabold  text-3xl md:text-5xl text-center">200+</h2>
                <p className="text-md md:text-xl font-bold text-center">hopitals</p>
            </div>
        </div>
    )
}