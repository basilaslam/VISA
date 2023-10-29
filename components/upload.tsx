"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Cloud,File as FileIcon, Upload } from "lucide-react"
import Dropzone from "react-dropzone"
import { Progress } from "./ui/progress"
import axios from "axios";
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "./ui/use-toast"
import { fileToSave } from "@/types/fileToSave"
import { useRouter } from "next/navigation"


const UploadDropZone = ({setPdf, setIsOpen}: {setPdf: Dispatch<SetStateAction<{ url: string; name: string; } | undefined>>, setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
    const [isUploading, setIsUploading] = useState<boolean>(true)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const { toast } = useToast()
    const {startUpload} = useUploadThing("pdfUploader")
    const router = useRouter()
    const startStimulatedProgress = () =>{
        setUploadProgress(0)

        const interval = setInterval(() =>{
            setUploadProgress((prevProgress) => {
                if(prevProgress >= 95){
                    clearInterval(interval)
                    return prevProgress
                }else{
                    return prevProgress + 5
                }
            })
        }, 500)

        return interval
    }


        const saveFileDetails = async(details: fileToSave ) => {  
            
            
            try {
                const form = {
                     fileUrl: details.fileUrl 
                    }
                    
            
                 await axios.post('/pdf', form);
                
                 router.push(`/dashboard/${details.fileKey}`)
                
            } catch (error) {
                console.log(error);
            }
            
        }

    return <Dropzone multiple={false} onDrop={async (acceptedFile) => {
        setIsUploading(true)
        const progressInterval = startStimulatedProgress()


        //handle file uploading
        const res = await startUpload(acceptedFile)
        if(!res){
            setUploadProgress(0)
            return toast({
                title: 'Something went wrong',
                description: 'Please try again later',
                variant: "destructive"
            })
        }
        
        const [fileResponse] = res
        const key = fileResponse.key

        if(!key){
            setUploadProgress(0)
            return toast({
                title: 'Something went wrong',
                description: 'Please try again later',
                variant: "destructive"
            })
        }

        setPdf({url:res[0].url, name:res[0].name})
        setIsOpen(false)
        clearInterval(progressInterval)
        setUploadProgress(100)
    }}>
        {({getRootProps, getInputProps, acceptedFiles}) => (
            <div {...getRootProps()}
            className="border h-64 m-4 border-dashed border-red-600 rounded-lg">
                <div className="flex items-center justify-center h-full w-full">
                    <label htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                           <Cloud className="h-6 w-6 text-zinc-500 mb-2"/>
                           <p className="mb-2 text-sm text-zinc-700">
                            <span className="font-semibold">Click to upload</span>{' '} or drag and drop
                           </p>
                           <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
                        </div>

                        {acceptedFiles && acceptedFiles[0] ? (
                            <div className="mx-w-xs bg-white flex items-center rounded-md overflow-hidden outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                <div className="px-3 py-2 h-full grid place-items-center">
                                    <FileIcon className="h-4 w-4 text-red-600"/>
                                </div>
                                <div className="px-3 py-2 h-full text-sm truncate">
                                    {acceptedFiles[0].name}
                                </div>
                            </div>
                        ):null}


                        {isUploading ? (
                            <div className="w-full mt-4 max-w-xs mx-auto">
                                <Progress value={uploadProgress} className="h-1 w-full bg-zinc-200"/>
                            </div>
                        ):null}
                    </label>
                </div>
            </div>
        )}
    </Dropzone>
}
const UploadButton = ({setPdf}: {setPdf: Dispatch<SetStateAction<{ url: string; name: string; } | undefined>>}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return(
        <>
        <Dialog
        open={isOpen}
        onOpenChange={(v) => {
            if(!v){
                setIsOpen(v)
            }
        }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild >
            <Button variant={"primary"} className="my-auto flex gap-2">
            <Upload className="w-5 h-5"/>
            <span className="hidden sm:block">Upload PDF</span>
            </Button>
            </DialogTrigger>

            <DialogContent>
                <UploadDropZone setPdf={setPdf} setIsOpen={setIsOpen}/>
            </DialogContent>

        </Dialog>
        </>
    )
}

export default UploadButton