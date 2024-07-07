import { auth } from "@/auth"
import { getUserJobs } from "@/server-actions/jobs/get-user-jobs";
import { redirect } from "next/navigation";
import { JobsTable } from "@/components/jobs-table";
import { Job } from "@prisma/client";
import { toast } from "sonner";
import { Metadata } from "next";
import { CreateJobButton } from "@/components/create-job";
import { DataTableDemo } from "@/components/jobs-table-2";
import { JobCard, JobCardForDashboard } from "@/components/job-card";
import { getOrganizationByUserId, getOrganizationBySlug } from "@/server-actions/organization/get-organization";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Generated by create next app",
};

export default async function Page() {
  const session = await auth();
  if(!session) { redirect('/') }
  if(session.user?.firstTimeUser === true) { redirect('/onboarding') }
  const organization = await getOrganizationByUserId(session.user?.id!);
  if(organization.error) { toast(organization.message ) }
  const jobs = await getUserJobs();
  if(jobs?.ok === false) { toast(jobs.message) }
  return (
    <>
    {
      jobs.jobs?.length as number === 0 
      ? 
      <>
      <h1 className="font-bold text-3xl tracking-tight">Jobs</h1>
      <div className="w-full border border-white/20 h-full rounded-lg items-center flex flex-col gap-3 justify-center">
        <div>
          <h1 className="font-bold text-xl text-center">You dont have any jobs yet</h1>
          <p className="text-muted-foreground">Create some jobs & start hiring immediately.</p>
        </div>
        <CreateJobButton />
      </div>
      </>
      : 
      <> 
       <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-3xl tracking-tight">Jobs</h1>
        <CreateJobButton />
        </div>
        <div className="gap-4 flex flex-col">
          {
          jobs.jobs?.map((job:Job) => {
            return (
              <>
              <JobCardForDashboard job={job}/>
              </>
            )
          })
         }
        </div>
      </>
    }
    </>
  )
}