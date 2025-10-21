import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { ApplicationItem } from "./types";

export function EditApplicationDialog({ applications }: { applications: ApplicationItem[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <EditIcon className="size-4" />
                    <span>Edit Applications</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-5xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Edit Applications</DialogTitle>
                    <DialogDescription>Edit your applications here.</DialogDescription>
                </DialogHeader>
                
                <DataTable columns={columns} data={applications} />
            </DialogContent>
        </Dialog>
    )
}       