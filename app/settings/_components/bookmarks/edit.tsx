import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EditIcon } from "lucide-react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import type { BookmarkItem } from "./types"

export function EditBookmarksDialog({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <EditIcon className="size-4" />
          <span>Edit Bookmarks</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-5xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Bookmarks</DialogTitle>
          <DialogDescription>Edit your bookmarks here.</DialogDescription>
        </DialogHeader>
        <DataTable columns={columns} data={bookmarks} />
      </DialogContent>
    </Dialog>
  )
}


