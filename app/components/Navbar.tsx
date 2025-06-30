import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { auth, signIn, signOut } from '@/auth'

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white text-3-bold">
      <nav className=" flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width={144} height={30} alt="Logo" />
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/startup/Create">
                <span>
                  <h1 className=" text-black font-bold">Create</h1>
                </span>
              </Link>
          {session?.user ? (
            <>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded"
                >
                  Logout
                </button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              >
               GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar
