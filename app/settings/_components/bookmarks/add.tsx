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
import { IconSearch } from "../applications/icon-search"
import { createBookmark } from "./actions"

export function AddBookmarkDialog() {
  const [icon, setIcon] = useState<string>("")
  const [state, formAction, isPending] = useActionState(createBookmark, { ok: false })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="size-4" />
          <span>Add Bookmark</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>
            Add a new bookmark to Origami.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" name="title" placeholder="e.g. Awesome Article" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <Input id="url" name="url" placeholder="https://example.com/article" inputMode="url" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" name="description" placeholder="Optional description for the bookmark." className="resize-none" />
                <FieldDescription>Optional description of the bookmark.</FieldDescription>
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


