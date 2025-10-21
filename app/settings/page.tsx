import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/base/page";
import SettingsSection from "./_components/settings-section";
import { hlItems, bookmarks as bookmarksTable, user_preferences } from "@/db/schema";
import db from "@/db";
import { ThemeToggle } from "@/components/theme-toggle";
import { DeleteApplicationsDialog } from "./_components/applications/delete";
import { AddApplicationDialog } from "./_components/applications/add";
import { EditApplicationDialog } from "./_components/applications/edit";
import type { ApplicationItem } from "./_components/applications/types";
import { AddBookmarkDialog } from "./_components/bookmarks/add";
import { EditBookmarksDialog } from "./_components/bookmarks/edit";
import { DeleteBookmarksDialog } from "./_components/bookmarks/delete";
import type { BookmarkItem } from "./_components/bookmarks/types";
import { eq } from "drizzle-orm";
import { ApplicationButtonSize } from "./_components/applications/button-size";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Origami - Settings",
    description: "Settings for Origami",
};

export default async function SettingsPage() {
    const applications = await db.select().from(hlItems) as unknown as ApplicationItem[];
    const bookmarkItems = await db.select().from(bookmarksTable) as unknown as BookmarkItem[];

    const userPreferences = await db.select().from(user_preferences).where(eq(user_preferences.user_id, 1));

    return (
        <Page>
            <div className="flex items-baseline justify-between">
                <PageHeader heading="Settings" />
                <Link href="/">
                    <Button variant="outline">
                        <ArrowLeftIcon className="size-4" />
                        <span>Back</span>
                    </Button>
                </Link>
            </div>
            <SettingsSection title="Theme" description="Change the theme of your application.">
                <ThemeToggle />
            </SettingsSection>

            <SettingsSection title="Applications">
                <div className="space-y-2 mb-4">
                    <ApplicationButtonSize userPreferences={userPreferences} />
                </div>
                <div className="flex gap-2 mb-2">
                    <AddApplicationDialog />
                    <EditApplicationDialog applications={applications} />
                    <DeleteApplicationsDialog />
                </div>
            </SettingsSection>

            <SettingsSection title="Bookmarks">
                <div className="flex gap-2 mb-2">
                    <AddBookmarkDialog />
                    <EditBookmarksDialog bookmarks={bookmarkItems} />
                    <DeleteBookmarksDialog />
                </div>
            </SettingsSection>
        </Page>
    );
}   