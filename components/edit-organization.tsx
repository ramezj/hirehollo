"use client"
  import { useEditor, EditorContent } from "@tiptap/react"
  import StarterKit from "@tiptap/starter-kit"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Button } from "./ui/button"
  import { toast } from "sonner"
  import { Loader2 } from "lucide-react"
  import { Job, Organization } from "@prisma/client"
  import { useState } from "react"
  import RichTextEditor from "./rich-text-editor"
  import { motion } from "framer-motion"
  import { editJob } from "@/server-actions/jobs/edit-job"
  import { Textarea } from "./ui/textarea"
import { editOrganization } from "@/server-actions/organization/edit-organization"

export default function EditOrganization({ organization } : { organization:Organization}) {
    const [ org, setOrg ] = useState<Organization>(organization);
    const [ loading, setLoading ] = useState<Boolean>(false);
    const editOrg = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await editOrganization(org);
        toast(res.message);
        setLoading(false);
    }
    return (
        <>
        <form onSubmit={editOrg}>
        <div className="space-y-4 w-full">
            <motion.div 
            className="space-y-2"
            >
              <Label htmlFor="name">Name</Label>
              <Input className="bg-inherit" required placeholder="Microsoft" value={org.name!} onChange={((e) => {setOrg((prevOrg) => ({ ...prevOrg, name: e.target.value }))})}/>
              <div>
              <Label htmlFor="name">Slug</Label>
              <Input className="bg-inherit" required placeholder="microsoft.jobspire.co" value={org.slug!} onChange={((e) => {setOrg((prevOrg) => ({ ...prevOrg, slug:e.target.value}))})}/>
              </div>
              <div>
                <Label htmlFor="name">Slogan</Label>
                <Textarea className="bg-inherit" placeholder="I'm Lovin' it!" value={org.description!} onChange={((e) => {setOrg((prevOrg) => ({...prevOrg, description: e.target.value}))})} rows={4} />  
              </div>
              </motion.div>
            {
              loading
              ? <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes
                </Button>
              : <Button type="submit">Save Changes</Button>
            }
          </div>
          </form>
        </>
    )
}