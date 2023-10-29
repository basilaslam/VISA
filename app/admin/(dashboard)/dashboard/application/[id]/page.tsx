"use client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import UploadButton from "@/components/upload"
import { IApplication } from "@/models/application.model"
import { SingleApplicationApiResponse } from "@/types/application"
import axios from "axios"
import { File } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, FormEvent, useState, useEffect } from "react"
import FormFile from "@/components/fileCard"


interface pageProps {
  params: {
    id: string
  }
}

export const Application:FC<pageProps> = ({params}) =>{
    
    const [pdf, setPdf] = useState<{url: string, name: string}>()
    const [application, setApplication] = useState<IApplication>()
    
    const { toast } = useToast()
    const router = useRouter()
      useEffect(()=>{
        (()=>{
          getDetails()
        })()
      },[])

      

      const getDetails = async() => {
        try {
          
          const res = await axios.get<SingleApplicationApiResponse>(`/api/admin/application/${params.id}`)
          
          setApplication(res.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }

      
      const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        try {

            if(pdf?.url === undefined){
                return toast({
                    title: 'Document is note selected',
                    description: `application can't continue without file`,
                    variant:"destructive" 
                })
            }

            let form = {
                field: 'admin_pdf',
                value: pdf.url,
                id: application?._id
            }

            
            
            let res = await axios.patch('/api/admin/application/edit', form)
            
            if(res.status === 200){
                router.push("/dashboard")
            }
        } catch (error: any) {
          console.log(error);

            let message = error.message

            toast({
                title: 'Something went wrong',
                description: message.message,
                variant: "destructive"
            })
        }
        }


    return(
    <main
      className="flex items-center justify-center px-1 py-1 sm:px-1 lg:col-span-7 lg:px-16 lg:py-1 xl:col-span-6 h-full">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-gray-50 p-4 md:p-16 rounded-md h-fit w-full md:w-4/5">
            <h3 className="text-2xl underline">Application Form</h3>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="fill your name"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
              value={application?.fullname}
              disabled
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="dateofbirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of birth (dd-mm-yy)
            </label>

            <input
              type="text"
              id="dob"
              name="date_of_birth"
              placeholder="dd-mm-yy"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
              value={application?.date_of_birth}
              disabled
              
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="place_of_birth" className="block text-sm font-medium text-gray-700">
              Place of birth
            </label>

            <input
              type="text"
              id="place_of_birth"
              name="place_of_birth"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
              placeholder="Texas, US"
              value={application?.place_of_birth}
              disabled
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>

            <input
              type="text"
              id="nationality"
              name="nationality"
              placeholder="india"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md p-2"
              value={application?.nationality}
              disabled
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="document"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User's Document
            </label>
            <div className="flex justify-between">
           {<div className="flex text-primary-600 border-2 rounded-md bg-gray-200">
            <FormFile url={application?.user_pdf!}/>
            </div>}
            
            
            </div>
          </div>
         
         {application?.admin_pdf}
         
          {Boolean(application?.admin_pdf)&&<div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="document"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Approval
            </label>
            <div className="flex justify-between">
           <div className="flex text-primary-600 border-2 rounded-md bg-gray-200">
            <FormFile url={application?.admin_pdf!}/>
            </div>
            </div>
          </div>}




          {!application?.admin_pdf&&<div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="document"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              document
            </label>
            <div className="flex justify-between">
           <UploadButton setPdf={setPdf}/>

           {pdf&&
            <div className="flex text-primary-600 border-2 rounded-md bg-gray-200">
                <div className="bg-gray-200 px-2 text-sm my-auto border-r-2 border-gray-700">
                <File className=" h-5 w-5"/>
                </div>
                <h3 className="font-medium text-sm bg-gray-200 px-2 my-auto truncate">{pdf?.name}</h3>
            </div>}
            
            </div>
          </div>}


          <div className="w-full flex justify-center items-center mt-14">
            <Button disabled={application?.admin_pdf? true: false} variant={"primary"} className="mx-auto font-bold"><span>Update</span></Button>
          </div>

        </form>
      
    </main>
    )
} 

export default Application