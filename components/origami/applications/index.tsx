import { SimpleIcon } from "@/lib/simple-icons-loader";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db";
import { hlItems } from "@/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { getLocalUrl } from "@/lib/get-local-url";
import { ApplicationDialog } from "./command";
import { EmptyApplications } from "./empty";
import { cn } from "@/lib/utils";

const DESCRIPTION_DISPLAY = false;

export default async function Applications({ fullSizeButtons }: { fullSizeButtons: boolean }) {
    const applications = await db.select().from(hlItems);

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-4">Applications</h1>
                <ApplicationDialog
                    applications={applications}
                />
            </div>

            <div className={cn("gap-4", fullSizeButtons ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-wrap")}>
                {applications.map((application: any) => (
                    fullSizeButtons ? (
                        <Card key={application.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-4">
                                    <SimpleIcon si={application.icon.split('si:')[1]} className="size-10" />
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-lg font-medium">{application.title}</h2>
                                        <Link href={application.url} target="_blank" className="flex items-center gap-1">
                                            <ArrowUpRightIcon className="size-4" />
                                            {getLocalUrl(application.url)}
                                        </Link>
                                    </div>
                                </CardTitle>
                                {
                                    application.description && DESCRIPTION_DISPLAY && (
                                        <CardDescription>{application.description}</CardDescription>
                                    )
                                }
                            </CardHeader>
                        </Card>
                    ) : (
                        <Link href={application.url} target="_blank">
                            <Button key={application.id} variant="ghost" className="bg-card border p-4 flex items-center justify-center w-full h-full">
                                <SimpleIcon si={application.icon.split('si:')[1]} className="size-10" />
                            </Button>
                        </Link>
                    )
                ))}

            </div>

            {applications.length === 0 && (
                <EmptyApplications />
            )}

        </section>
    );
}
