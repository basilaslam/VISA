"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import UploadButton from "@/components/upload"
import axios from "@/lib/axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import pdfThumbnail from '@/public/thumbnail-pdf.svg'
import { PDF, PdfApiResponse } from "@/types/pdf"
import { redirect, useRouter } from "next/navigation"
const Dashboard = () => {

    const [files, setFiles] = useState<PDF[]>()
    const router = useRouter()
    useEffect(()=>{        
        getFiles()
    },[])

  

    
    const getFiles = async() => {
        try {
            let data = await axios.get<PdfApiResponse>('/pdf')
            
            setFiles(data.data.products)     
        } catch (error) {
            console.log(error);
        }
        
    }
// TODO: add tooltip with the name of the pdf
    
    return(
        <section className="mx-10 md:mx-16 pb-10">
           <div className="flex justify-between">
           <h1 className=" text-lg font-bold my-8">Your PDFs</h1>
           <UploadButton />
           </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 2xl:grid-cols-9 gap-10">
        {files&&files.map((el, index)=>(
                <Card key={index} onClick={() => router.push(`/dashboard/${el.fileKey}`)} className="hover:cursor-pointer hover:border-red-600">
                <CardContent className="p-0 pt-2">
                    
                    <Image className="mx-auto" src={pdfThumbnail} width={100} height={100} alt=""/>
                </CardContent>
                <CardFooter className="py-3 px-0">
                    <h4 className="my-auto mx-2 font-medium text-xs w-full text-center truncate">{el.fileName}</h4>
                </CardFooter>
            </Card>
            ))}
        </div>
        </section>
    )
}

export default Dashboard