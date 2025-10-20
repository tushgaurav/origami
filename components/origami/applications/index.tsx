import { SimpleIcon } from "@/lib/simple-icons-loader";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db";
import { hlItems } from "@/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { getLocalUrl } from "@/lib/get-local-url";

const DESCRIPTION_DISPLAY = false;

export default async function Applications() {
    const applications = await db.select().from(hlItems);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">Applications</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((application: any) => (
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
                ))}
            </div>
        </section>
    );
}