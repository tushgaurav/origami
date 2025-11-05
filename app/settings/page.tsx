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
import DefaultSearch from "./_components/general/default-search";
import { ShowWidgets } from "./_components/general/show-widgets";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Origami - Settings",
    description: "Settings for Origami",
};

export default async function SettingsPage() {
    const applications = await db.select().from(hlItems) as unknown as ApplicationItem[];
    const bookmarkItems = await db.select().from(bookmarksTable) as unknown as BookmarkItem[];

    const userPreferences = await db.select().from(user_preferences).limit(1);

    return (
        <Page>
            <div className="flex items-baseline justify-between">
                <PageHeader heading="Settings" />
                <div className="flex items-center gap-4">
                    <AnimatedThemeToggler />
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeftIcon className="size-4" />
                            <span>Back</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <SettingsSection title="General" description="Show or hide widgets on your dashboard.">
                <div className="space-y-6 mb-4">
                    <ShowWidgets userPreferences={userPreferences} />
                    <DefaultSearch defaultSearch={userPreferences?.[0]?.default_search} />
                </div>


            </SettingsSection>

            <SettingsSection title="Applications">
                <div className="space-y-6 mb-4">
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