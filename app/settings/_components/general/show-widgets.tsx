"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { changeShowWidgets } from "./actions"
import { user_preferences } from "@/db/schema"

export function ShowWidgets({ userPreferences }: { userPreferences: typeof user_preferences.$inferSelect[] }) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="show-widgets">Show Widgets</Label>
      <Switch
        id="show-widgets"
        checked={userPreferences?.[0]?.show_widgets === 1}
        onCheckedChange={(checked) => changeShowWidgets(checked ? 1 : 0)}
      />
    </div>
  )
}