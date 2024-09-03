import { Navigation } from "@/components/navbar";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { LandingPageJobCard } from "@/components/job-card";
import Link from "next/link";
import { Alert } from "@/components/main-alert";
import { ArrowRightIcon, SquareArrowOutUpRight } from "lucide-react"

export const metadata:Metadata = {
  title: "Heliup Public Beta",
  description: "Heliup, Hiring for startups & small teams.",
  applicationName: "Heliup"

}
export default async function Page() {
  const session = await auth();
  return (
  <>
   <Navigation session={session}/>
   <div className="text-center w-full p-8 flex flex-col gap-4 items-center">
    <div className="relative sm:-mt-1">
    <Alert />
    </div>
        <div className="text-center items-center flex flex-col">
        <h1 className="text-4xl tracking-[-0.05em] text-black dark:text-white md:text-6xl md:leading-[5rem] font-bold sm:-mt-2">
          Hiring, for startups & small teams.
        </h1>
        <p className="text-sm max-w-3xl text-muted-foreground items-center text-center align-middle">Create stunning career pages, receive applicants & start the hiring process. All in one place.</p>
        </div>
      <div className="flex flex-row w-full max-w-fit items-center justify-center gap-4">
      <Button asChild className="w-52 font-bold" variant={"expandIcon"} Icon={SquareArrowOutUpRight} iconPlacement="right">
        <Link href={`https://demo.${process.env.NEXT_URL}`} target="_blank">
        See Demo
        </Link>
        </Button>
      <Button variant={"expandIcon"} Icon={ArrowRightIcon} iconPlacement="right" className="w-52 bg-blue-600 text-white hover:bg-blue-700 duration-200 font-bold" asChild>
        <Link href='/auth'>
        Start Hiring
        </Link>
      </Button>
        </div>
      <div className="w-full items-center flex content-center flex-col mt-4">
      <div className="flex flex-col gap-2 lg:w-1/2 w-full">
      <LandingPageJobCard title="Product Manager" type="Full-Time" location="Remote"/>
      <LandingPageJobCard title="Operations Manager" type="Contract" location="Austin, TX"/>
      {/* <LandingPageJobCard title="Software Engineer" type="Internship" location="Cairo, EG"/> */}
      </div>
      </div>
    </div>
    </>
  );
}

