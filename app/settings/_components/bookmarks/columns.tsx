"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SimpleIcon } from "@/lib/simple-icons-loader"
import type { BookmarkItem } from "./types"

export const columns: ColumnDef<BookmarkItem>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const allSelected = table.getIsAllPageRowsSelected()
      const someSelected = table.getIsSomePageRowsSelected()
      return (
        <input
          type="checkbox"
          aria-label="Select all"
          checked={allSelected || (someSelected ? ("indeterminate" as unknown as boolean) : false)}
          onChange={e => table.toggleAllPageRowsSelected(e.target.checked)}
        />
      )
    },
    cell: ({ row }) => (
      <input
        type="checkbox"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={e => row.toggleSelected(e.target.checked)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 36,
  },
  {
    accessorKey: "icon",
    header: "",
    cell: ({ row }) => {
      const value = row.getValue("icon") as string
      const slug = value.startsWith("si:") ? value.slice(3) : value
      return <SimpleIcon si={slug} className="size-5" />
    },
    enableSorting: false,
    enableHiding: false,
    size: 36,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Title
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("url") as string
      return (
        <Link href={url} target="_blank" className="underline underline-offset-2">
          {url}
        </Link>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Created
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(String(row.getValue("createdAt"))).toLocaleString(),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Updated
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(String(row.getValue("updatedAt"))).toLocaleString(),
  },
]


