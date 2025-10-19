import { SimpleIcon } from "@/lib/simple-icons-loader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db";
import { hlItems } from "@/db/schema";

export default async function Applications() {
    const applications = await db.select().from(hlItems);

    return (
        <section>
            <h1>Applications</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((application: any) => (
                    <Card key={application.id}>
                        <CardHeader>
                            <CardTitle>{application.title} <SimpleIcon si={application.icon.split(":")[1]} /></CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
}