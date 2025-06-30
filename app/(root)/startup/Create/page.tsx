import Startform from "@/app/components/Startform"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
const page = async () => {
    const sesion = await auth();

  if(!sesion) redirect("/");
  return (
    <>
    <section className="pink_container !min-h-{230px}">
      <h1 className="heading">Submit YOUR STARTup Pitch</h1>
    </section>
    <Startform />
    </>
  )
}

export default page