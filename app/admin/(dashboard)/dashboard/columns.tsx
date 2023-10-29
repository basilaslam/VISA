"use client"

import { PopulatedApplication } from "@/types/application"
import { ColumnDef } from "@tanstack/react-table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"
import axios from "axios"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PopulatedApplication>[] = [
    {
      accessorKey: "fullname",
      header: "Full Name",
    },
    {
        accessorKey: "uploadedAt",
        header: "Applied At",
        cell: ({row}) => {
            const uploadedAt = row.getValue('uploadedAt') as string
                const date = new Date(uploadedAt).toLocaleDateString()
            return date
        }
    },
    {
        header: "Application type",
        cell: "Visa Application"
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {

        const [value, setValue] = useState<string>(row.getValue('status') || "PENDING")
            const val = "hello"
        const handleChange = async (event: any) => {
            const {_id} = row.original
            const form = {
                _id,
                field: 'status',
                value:  event
            }

            let res = await axios.patch('/api/admin/application/edit', form)
            setValue(event)
        }
        return (
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
        )
      }
    },
]
