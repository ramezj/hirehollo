import { getJobById } from "@/server-actions/jobs/get-job"
import { Job } from "@prisma/client"
import { redirect } from "next/navigation";
import { RenderContent } from "@/components/render-content";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export async function generateMetadata({ params }: { params: { jobId: string } }): Promise<Metadata> {
    const job = await getJobById(params.jobId)
    return {
      title: job.job?.title
    };
}
export default async function Page({ params }: { params: { jobId: string } }) {
    const job = await getJobById(params.jobId);
    if(job?.error) { redirect('/jobs') }
    console.log(job.job?.content)
    return (
        <>
        <div className="w-full flex flex-col items-center text-center p-8 gap-y-4">
                <h1 className="font-bold text-2xl">{job.job?.title}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <Badge className="rounded-sm">{job.job?.type}</Badge>
                    <Badge className="rounded-sm">{job.job?.type}</Badge>
                </div>
            <div className="text-left w-1/2">
                <RenderContent content={job.job?.content!} />
            </div>
            <div className="sm:w-1/2 w-full rounded-lg border border-white/10 space-y-4 p-8 text-left">
            <div className="space-y-2">
            <Label htmlFor="name">First Name</Label>
            <Input placeholder="Joe" />
            </div>
            <div className="space-y-2">
            <Label htmlFor="name">Last Name</Label>
            <Input placeholder="Biden" />
            </div>
            <div className="space-y-2">
            <Label htmlFor="name">Email Address</Label>
            <Input placeholder="joebiden@gmail.com" />
            </div>
            </div>
        </div>
        </>
    )
}