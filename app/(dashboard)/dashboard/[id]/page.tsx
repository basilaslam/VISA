"use client"
import { Document, Page } from 'react-pdf'
import PdfRender from '@/components/PdfRenderer'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import axios from '@/lib/axios'
import { PDF, SinglePdfApiResponse } from '@/types/pdf'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import pdfThumbnail from '@/public/thumbnail-pdf.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader2, Loader2Icon } from 'lucide-react'


const Editor = () => {
    const [pdf, setPdf] = useState<PDF>()
    const [selectedPages, setSelectedPages] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const params = useParams()
    const pdfId = params.id

    useEffect(()=>{
        getPdfDetails()
    },[])


    const getPdfDetails = async () =>{
        let res = await axios.get<SinglePdfApiResponse>(`/pdf/${pdfId}`)
        setPdf(res.data.pdfData)
    }

    const manageCreatePDF = async () => {
        setIsLoading(true)
        let form = {
            pages : selectedPages,
            url: pdf?.fileUrl,
        }

        let res = await axios.post('/pdf/edit', form)
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = res.data.url;
        a.download = `${pdf?.fileName}-edited.pdf`; // Set the desired filename

        // Append the link element to the DOM and trigger a click event
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the URL
        window.URL.revokeObjectURL(res.data.url);
        setIsLoading(false)
    }


    const addToSelected = (pageNumber: number) => {
        // Check if the page number is already in the selectedPages state
        const index = selectedPages ? selectedPages.indexOf(pageNumber) : -1;
      
        if (index !== -1) {
          // If the number is in the state, remove it
          const updatedSelection = selectedPages ? [...selectedPages] : [];
          updatedSelection.splice(index, 1);
          setSelectedPages(updatedSelection);
        } else {
          // If the number is not in the state, add it
          setSelectedPages((prevSelectedPages) => [...(prevSelectedPages || []), pageNumber]);
        }
      };
      
    return(

        <div className='flex-1 justify-between flex flex-col h-[calc(100vh-4rem)]'>
        <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
          {/* Left sidebar & main wrapper */}
          <div className='flex-1 xl:flex overflow-auto h-screen w-full'>
            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
              {/* Main area */}
              {pdf &&  <PdfRender selectedPages={selectedPages} addToSelected={addToSelected} pdfUrl={pdf?.fileUrl}/>}

            </div>
          </div>
  
          <div className='shrink-0 flex-[0.50] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 px-4 py-6'>
          <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col gap-2 rounded-lg'>
          <div className='flex justify-between items-center mx-3 my-2'>
          <h2 className='text-lg font-bold my-2'>Selected Pages</h2>
            {!isLoading && <Button className='my-auto' onClick={manageCreatePDF} variant={"destructive"} size={"sm"}>Create Pdf</Button>}
            {isLoading && <Loader2 className="my-auto mr-3 h-4 w-4 animate-spin text-primary-500" />}
          </div>
            <hr className=' border-dashed'/>
            <div className='grid grid-cols-4 gap-2 mx-3 mt-3 border-none'>
          {selectedPages.map((el, index)=>(
              <Card key={index} className="hover:cursor-pointer hover:border-red-600">
                <CardContent className="p-0 pt-2">
                    <Image className="mx-auto" src={pdfThumbnail} width={100} height={100} alt=""/>
                </CardContent>
                <CardFooter className="py-3 px-0">
                    <h4 className="my-auto mx-2 font-medium text-xs w-full text-center truncate">PageNo {el}</h4>
                </CardFooter>
            </Card>
            ))}

            
            </div>
    
            </div>
          </div>
        </div>
      </div>

    )
}

export default Editor