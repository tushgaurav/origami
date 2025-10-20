"use client"

import { useActionState, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { IconSearch } from "./icon-search"
import { createApplication } from "./actions"

export function AddApplicationDialog() {
  const [icon, setIcon] = useState<string>("")
  const [state, formAction, isPending] = useActionState(createApplication, { ok: false })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="size-4" />
          <span>Add Application</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Add a new application to Origami.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" name="title" placeholder="e.g. Proxmox" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <Input id="url" name="url" placeholder="http://10.1.1.2:8006" inputMode="url" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" name="description" placeholder="e.g. Proxmox VE is a open source virtualization platform for managing virtual machines and containers." className="resize-none" />
                <FieldDescription>Optional description of the application.</FieldDescription>
              </Field>
              <Field>
                <input type="hidden" name="icon" value={icon} />
                <IconSearch value={icon} onChange={setIcon} />
              </Field>
            </FieldGroup>
          </FieldSet>
          {state?.error && <FieldError>{state.error}</FieldError>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !icon}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
