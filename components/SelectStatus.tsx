import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios"
import { FC, useState } from "react"

enum STATUS {
    "PENDING",
    "ACCEPTED",
    "REJECTED"
}
interface props {
    data: string,
    id: string
} 
  
  const SelectStatus: FC<props> = ({data, id}) => {

    const [value, setValue] = useState<string>( data || "PENDING")
            const val = "hello"
        const handleChange = async (event: any) => {
            const _id = id
            const form = {
                _id,
                field: 'status',
                value:  event
            }

            let res = await axios.patch('/api/admin/application/edit', form)
            setValue(event)
        }
        
    return(
        <div className="my-auto">

        <Select
        value={val}
        onValueChange={handleChange}
        >
  <SelectTrigger className="w-[180px]">
    <h3>{value}</h3>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="PENDING">PENDING</SelectItem>
    <SelectItem value="APPROVED">APPROVED</SelectItem>
    <SelectItem value="REJECTED">REJECTED</SelectItem>
  </SelectContent>
</Select>
          </div>
    )
}

export default SelectStatus