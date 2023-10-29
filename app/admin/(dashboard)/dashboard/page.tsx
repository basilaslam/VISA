"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import {  useRouter } from "next/navigation"
import { PopulatedApplication, PopulatedApplicationApiResponse } from "@/types/application";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import SelectStatus from "@/components/SelectStatus";
import { Loader2 } from "lucide-react";
  
export enum StatusEnum {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
  }

const Dashboard = () => {

    const [applications, setApplications] = useState<PopulatedApplication[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    useEffect(()=>{        
        getApplications()
    },[])


    
    const getApplications = async() => {
        try {
            setIsLoading(true)
            let res = await axios.get<PopulatedApplicationApiResponse>('/api/admin/application')
            
            setApplications(res.data.data)
            
            setIsLoading(false)
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

           {/* {applications && <DataTable columns={columns} data={applications}/>} */}

                    {isLoading && <div className="w-full"><Loader2 className="mx-auto w-6 h-6 animate-spin"/> </div>}
                    {!isLoading && <Table>
            <TableCaption>A list of your recent Applications.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[150px]">Full Name</TableHead>
                <TableHead>Applied At</TableHead>
                <TableHead>Application type</TableHead>
                <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                 {applications?.map((el, index) => (
                     
                     <TableRow key={index} className="cursor-pointer" onClick={()=> router.push(`/admin/dashboard/application/${el._id}`)}>
                <TableCell className="font-medium">{el.fullname}</TableCell>
                <TableCell>{new Date(el.uploadedAt).toLocaleDateString()}</TableCell>
                <TableCell>Visa Apply</TableCell>
                <TableCell className="text-right float-right"><SelectStatus data={el.status} id={el._id}/></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
                }

        </div>
        </section>
    )

}

export default Dashboard