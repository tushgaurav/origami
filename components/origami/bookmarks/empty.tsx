import { BookmarkIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyBookmarks() {
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookmarkIcon />
        </EmptyMedia>
        <EmptyTitle>No Bookmarks Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any bookmarks yet. Get started by adding your first bookmark.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
      </EmptyContent>
    </Empty>
  )
}
