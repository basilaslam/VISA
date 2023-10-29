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

           {/* {applications && <DataTable columns={columns} data={applications}/>} */}

           <Table>
            <TableCaption>A list of your recent Applications.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Full Name</TableHead>
                <TableHead>Applied At</TableHead>
                <TableHead>Application type</TableHead>
                <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications?.map((el, index) => (
                    
                <TableRow className="cursor-pointer" onClick={()=> router.push(`/admin/dashboard/application/${el._id}`)}>
                <TableCell className="font-medium">{el.fullname}</TableCell>
                <TableCell>{new Date(el.uploadedAt).toLocaleDateString()}</TableCell>
                <TableCell>Visa Apply</TableCell>
                <TableCell className="text-right float-right"><SelectStatus data={el.status} id={el._id}/></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>

        </div>
        </section>
    )

}

export default Dashboard