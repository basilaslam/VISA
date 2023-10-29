"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios";
import Image from "next/image"
import { useEffect, useState } from "react"
import { Circle } from "lucide-react";
import form from '@/public/form.svg'
import {  useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { IApplication } from "@/models/application.model";
import { ApplicationApiResponse } from "@/types/application";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
export enum StatusEnum {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
  }
const Dashboard = () => {

    const [applications, setApplications] = useState<IApplication[]>()
    const router = useRouter()
    useEffect(()=>{        
        getApplications()
    },[])

  

    
    const getApplications = async() => {
        try {
            let res = await axios.get<ApplicationApiResponse>('/api/application')
            
            setApplications(res.data.data)
            
        } catch (error) {
            console.log(error);
        }
        
    }
// TODO: add tooltip with the name of the pdf
    
    return(
        <section className="mx-10 md:mx-16 pb-10">
           <div className="flex justify-between">
           <h1 className=" text-lg font-bold my-8">Your Applications</h1>
           <Button onClick={()=> router.push("/dashboard/application")} variant={"primary"} className="my-auto">Apply Now</Button>
           </div>
           
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 2xl:grid-cols-9 gap-10">
        {applications&&applications.map((el, index)=>(
                <Card key={index} className="hover:cursor-pointer hover:border-red-600">
                <CardContent className="p-0 pt-2">
                    <Image className="mx-auto" src={form} width={100} height={100} alt=""/>
                </CardContent>
                <CardFooter className="py-3 px-0">
                    <h4 className="my-auto mx-2 font-medium text-xs w-full text-center truncate">Visa Application</h4>
                </CardFooter>
                <CardFooter>
                <div className="flex justify-between w-full">
                        <h4 className="text-sm">Status:</h4>
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <Circle className={`my-auto w-2.5 h-2.5 rounded-full ${el.status === StatusEnum.PENDING? 'text-gray-500 bg-gray-500': el.status === StatusEnum.APPROVED? ' text-green-700 bg-green-700': el.status === StatusEnum.REJECTED?'text-red-700 bg-red-700': 'bg-yellow-400 text-yellow-400'}`}/>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{el.status}</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>

                    </div>
                </CardFooter>
            </Card>
            ))}
        </div>
        </section>
    )

}

export default Dashboard