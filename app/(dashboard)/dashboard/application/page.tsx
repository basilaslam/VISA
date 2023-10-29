"use client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import UploadButton from "@/components/upload"
import axios from "axios"
import { File } from "lucide-react"
import { useRouter } from "next/navigation"
import {  FormEvent, useState } from "react"

const  Application = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        date_of_birth: "",
        place_of_birth:"",
        nationality: "",
      });
    const [pdf, setPdf] = useState<{url: string, name: string}>()
    
    const { toast } = useToast()
    const router = useRouter()


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

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
                url: pdf.url,
                ...formData
            }

            
            
            let res = await axios.post('/api/application/new', form)
            
            if(res.status === 200){
                router.push("/dashboard")
            }
        } catch (error: any) {
console.log(error);

            let message = JSON.parse(error.request.response)

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
              value={formData.fullname}
              onChange={handleInputChange}
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
              value={formData.date_of_birth}
              onChange={handleInputChange}
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
              value={formData.place_of_birth}
              onChange={handleInputChange}
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
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="document"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              document
            </label>
            <div className="flex justify-between">
           <UploadButton setPdf={setPdf}/>
            {pdf&&<div className="flex text-primary-600 border-2 rounded-md bg-gray-200">
                <div className="bg-gray-200 px-2 my-auto border-r-2 border-gray-700">
                <File />
                </div>
                <h3 className="font-medium bg-gray-200 px-2 my-auto truncate">{pdf?.name}</h3>
            </div>}
            </div>
          </div>


          <div className="w-full flex justify-center items-center">
            <Button variant={"primary"} className="mx-auto font-bold"><span>Apply</span></Button>
          </div>

        </form>
      
    </main>
    )
} 

export default Application