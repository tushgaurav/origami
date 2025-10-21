
import { FolderCodeIcon, RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyApplications() {
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCodeIcon />
        </EmptyMedia>
        <EmptyTitle>No Applications Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any applications yet. Get started by creating
          your first application.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
      </EmptyContent>
    </Empty>
  )
}
