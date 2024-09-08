import { Navigation } from "@/components/navbar";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { LandingPageJobCard } from "@/components/job-card";
import Link from "next/link";
import { Alert } from "@/components/main-alert";
import { BentoDemo } from "@/components/feature";
import { SiteFooter } from "@/components/site-footer";

export const metadata:Metadata = {
  title: "Heliup Beta",
  description: "Heliup, Hiring for startups & small teams.",
  applicationName: "Heliup"

}
export default async function Page() {
  const session = await auth();
  return (
  <>
  <div className="top-0 z-10 sticky">
  <Navigation session={session}/>
  </div>
   <div className="text-center w-full p-8 flex flex-col gap-4 items-center">
    <div className="relative sm:-mt-1">
    <Alert />
    </div>
        <div className="text-center items-center flex flex-col">
        <h1 className="text-4xl tracking-[-0.05em] text-black dark:text-white md:text-6xl md:leading-[5rem] font-medium sm:-mt-2">
          Hiring, for startups & small teams.
        </h1>
        <p className="text-sm max-w-3xl text-muted-foreground items-center text-center align-middle font-light">Create stunning career pages, receive applicants & start the hiring process. All in one place.</p>
        </div>
      <div className="flex flex-row w-full max-w-fit items-center justify-center gap-4">
      <Button asChild className="w-52 font-medium" variant={"secondary"}>
        <Link href={`https://demo.${process.env.NEXT_URL}`} target="_blank">
        See Demo
        </Link>
        </Button>
      <Button variant={"expandIcon"} className="w-52 font-medium" asChild>
        <Link href='/auth'>
        Start Hiring <i>&nbsp;- It&apos;s Free</i>
        </Link>
      </Button>
        </div>
        <div className="border rounded-xl w-full lg:w-2/3 relative mt-1 shadow-xl backdrop-blur-md">
          <img src="/screenshot.png" className="rounded-[inherit] shadow-xl" alt="Heliup Image"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[inherit] shadow-xl"></div>
        </div>
      {/* <div className="w-full items-center flex content-center flex-col mt-4">
      <div className="flex flex-col gap-2 lg:w-1/2 w-full">
      <LandingPageJobCard title="Product Manager" type="Full-Time" location="Remote"/>
      <LandingPageJobCard title="Operations Manager" type="Contract" location="Austin, TX"/>
      </div>
      </div> */}
      <h1 className="pt-6 pb-6 text-4xl tracking-[-0.05em] text-black dark:text-white md:text-6xl md:leading-[5rem] font-medium sm:-mt-2">
          Some <i>Features</i>
        </h1>
      <div className="w-full lg:w-2/3 text-left">
      <BentoDemo />
      </div>
    </div>
    <div>
      <SiteFooter />
    </div>
    </>
  );
}

