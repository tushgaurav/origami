import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/base/page";
import SettingsSection from "./_components/settings-section";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { hlItems } from "@/db/schema";
import db from "@/db";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
    title: "Origami - Settings",
    description: "Settings for Origami",
};

export default async function SettingsPage() {
    const applications = await db.select().from(hlItems);

    return (
        <Page>
            <PageHeader heading="Settings" />

            <SettingsSection title="Theme" description="Change the theme of your application.">
                <ThemeToggle />
            </SettingsSection>

            <SettingsSection title="Applications">
                You have {applications.length} applications.


                <div className="flex gap-2 mt-2">
                    <Button variant="default">
                        <PlusIcon className="size-4" />
                        <span>Add Application</span>
                    </Button>

                    <Button variant="outline">
                        <TrashIcon className="size-4" />
                        <span>Delete All Applications</span>
                    </Button>
                </div>
            </SettingsSection>
        </Page>
    );
}   