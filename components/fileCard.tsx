import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import form from '@/public/form.svg'

  const FormFile = ({url}:{url: string}) => {
    return(
            <Card className="hover:cursor-pointer hover:border-red-600" onClick={() => window.open(url)}>
            <CardContent className="p-0 pt-2">
                <Image className="mx-auto" src={form} width={100} height={100} alt=""/>
            </CardContent>
            <CardFooter className="py-3 px-0">
                <h4 className="my-auto mx-2 font-medium text-xs w-full text-center truncate">Visa Application</h4>
            </CardFooter>
        </Card>
    )
}

export default FormFile