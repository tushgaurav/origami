import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/base/page";
import SettingsSection from "./_components/settings-section";
import { hlItems, bookmarks as bookmarksTable } from "@/db/schema";
import db from "@/db";
import { ThemeToggle } from "@/components/theme-toggle";
import { DeleteApplicationsDialog } from "./_components/applications/delete";
import { AddApplicationDialog } from "./_components/applications/add";
import { EditApplicationDialog } from "./_components/applications/edit";
import { DataTable } from "./_components/applications/data-table";
import { columns } from "./_components/applications/columns";
import type { ApplicationItem } from "./_components/applications/types";
import { AddBookmarkDialog } from "./_components/bookmarks/add";
import { EditBookmarksDialog } from "./_components/bookmarks/edit";
import { DeleteBookmarksDialog } from "./_components/bookmarks/delete";
import type { BookmarkItem } from "./_components/bookmarks/types";

export const metadata: Metadata = {
    title: "Origami - Settings",
    description: "Settings for Origami",
};

export default async function SettingsPage() {
    const applications = await db.select().from(hlItems) as unknown as ApplicationItem[];
    const bookmarkItems = await db.select().from(bookmarksTable) as unknown as BookmarkItem[];

    return (
        <Page>
            <PageHeader heading="Settings" />

            <SettingsSection title="Theme" description="Change the theme of your application.">
                <ThemeToggle />
            </SettingsSection>

            <SettingsSection title="Applications">
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