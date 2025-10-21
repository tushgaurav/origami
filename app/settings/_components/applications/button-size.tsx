"use client"

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { changeButtonSize } from "./actions";
import { user_preferences } from "@/db/schema";

export function ApplicationButtonSize({ userPreferences }: { userPreferences: typeof user_preferences.$inferSelect[] }) {
    return (
        <div className="flex items-center gap-2">
            <Label htmlFor="application-button-size">Display Full Size Buttons</Label>
            <Switch id="application-button-size"
                checked={userPreferences?.[0]?.application_button_size === "full"}
                onCheckedChange={(checked) => changeButtonSize(checked ? "full" : "small", "application")}
            />
        </div>
    )
}