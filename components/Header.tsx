"use client"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState(false);
  const {data: session} = useSession()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
    return(
        <header className="bg-white dark:bg-gray-900">
  <div
    className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
  >
    <a className="block text-red-600" href="/">
      <span className="sr-only">Home</span>
      <h1 className=" text-3xl font-bold">Pages<strong className="dark:text-white text-black">.</strong></h1>
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        {!session?.user._id&&<ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
              Pricing
            </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
              About
            </a>
          </li>
        </ul>}
      </nav>

      <div className="flex items-center gap-4">
       {!session?.user._id&&(<div className="sm:flex sm:gap-4">
          <a
            className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            href="/login"
          >
            Login
          </a>

          <a
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:text-red-600/75 sm:block"
            href="/register"
          >
            Register
          </a>
        </div>)}
       {session?.user._id&&(<ul className="hidden md:flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/dashboard">
              Dashboard
            </a>
          </li>

          <li>
            <Button variant={"primary"} size={"sm"} className="text-gray-500 transition hover:text-gray-500/75 cursor-pointer" onClick={() => signOut()}>
              Logout
            </Button>
          </li>


        </ul>)}

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
          onClick={()=> setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

  </div>

  <nav aria-label="Global" className={`${isOpen ? 'block' : 'hidden' }`} >
        {!session?.user._id&&<ul className="flex flex-col text-right mr-5 mt-10 gap-6 text-sm">
            <li>
            <a
            className="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-red-600 transition hover:text-red-600/75"
            href="/register"
          >
            Register
          </a>
            </li>
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
              Pricing
            </a>
          </li>
          
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
              About
            </a>
          </li>
        </ul>}
        {session?.user._id&&<ul className="flex flex-col text-right mr-5 mt-10 gap-6 text-sm">
            <li>
            <a
            className="text-gray-500 transition hover:text-gray-500/75"
            href="/dashboard"
          >
            Dashboard
          </a>
            </li>
          <li>
            <Button variant={"primary"} size={"sm"} className="text-gray-500 transition hover:text-gray-500/75"onClick={() => signOut()}>
              Logout
            </Button>
          </li>
        </ul>}

      </nav>
</header>
    )
}

export default Header