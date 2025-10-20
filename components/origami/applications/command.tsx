"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  PlusIcon,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { cn } from "@/lib/utils";
import { SimpleIcon } from "@/lib/simple-icons-loader";

function launchApp(url: string, target = "_blank") {
  window.open(url, target);
}

type Application = {
    id: number;
    title: string;
    url: string;
    description: string;
    icon: string;
    createdAt: string; // for sorting
    updatedAt: string;
}

type ApplicationDialogProps = {
    applications: Application[];
    className?: string;
}

export function ApplicationDialog({ applications, className }: ApplicationDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [currentSelection, setCurrentSelection] = React.useState<any>()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
  

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className={cn("text-muted-foreground text-sm", className)}>
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {applications.map((application) => (
              <CommandItem key={application.id} value={application.title} onSelect={() => {
                launchApp(application.url)
              }}>
                <SimpleIcon si={application.icon.split('si:')[1]} className="size-4" />
                <span>{application.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem value="create-application">
              <PlusIcon className="size-4" />
              <span>Create Application</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
