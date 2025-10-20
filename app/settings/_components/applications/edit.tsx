import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";

export function EditApplicationDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <EditIcon className="size-4" />
                    <span>Edit Application</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Application</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}       