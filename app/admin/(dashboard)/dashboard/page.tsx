"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios";
import Image from "next/image"
import { useEffect, useState } from "react"
import { Circle } from "lucide-react";
import { useReactTable } from '@tanstack/react-table'
import form from '@/public/form.svg'
import {  useRouter } from "next/navigation"
import { PopulatedApplication, PopulatedApplicationApiResponse } from "@/types/application";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { DataTable } from "./data-table";
import { columns } from "./columns";
  
export enum StatusEnum {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
  }

const Dashboard = () => {

    const [applications, setApplications] = useState<PopulatedApplication[]>()
    const router = useRouter()
    useEffect(()=>{        
        getApplications()
    },[])


    
    const getApplications = async() => {
        try {
            let res = await axios.get<PopulatedApplicationApiResponse>('/api/admin/application')
            
            setApplications(res.data.data)
            
        } catch (error) {
            console.log(error);
        }
        
    }
// TODO: add tooltip with the name of the pdf
    
    return(
        <section className="mx-10 md:mx-16 pb-10">
           <div className="flex justify-between">
           <h1 className=" text-lg font-bold my-8">All Applications</h1>
           </div>
           
        <div className="w-full ">

           {applications && <DataTable columns={columns} data={applications}/>}
        </div>
        </section>
    )

}

export default Dashboard