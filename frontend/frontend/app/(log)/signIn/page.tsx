import Link from "next/link";

export default function Signin() {
  return (

<div className="w-full flex ">
<div className="w-1/2 bg-slate-950 p-3 flex flex-col justify-center items-center gap-8 text-slate-50">
  <h2 className="font-bold flex  text-2xl">Sign up</h2>
  <Link href={"/signUp"} className="flex text-xl items-center gap-3">
  <span className="relative group rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-slate-50 group-hover:text-slate-50 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
    </span>Sign in{" "}
    
  </Link>
</div>
<div className="w-1/2 p-8">
  <form action="" className="flex flex-col gap-5 text-sm text-slate-50">
    {/* <input
      placeholder="Your Email"
      type="email"
      className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
    /> */}
    <input
    placeholder="Your license ID     0000/0000"
      type="text"
      className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
    />
   
    <input
      placeholder="Password"
      type="password"
      className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
    />
    <input type="submit" value="send" className="p-1 bg-blue-600 hover:bg-transparent hover:border-gray-50 border-blue-600 border"/>
  </form>
</div>
</div>
  );
}
