import db from "@/db";
import { hlItems } from "@/db/schema";

export default async function Applications() {
    const applications = await db.select().from(hlItems);

    return (
        <div>
            <h1>Applications</h1>
            <ul>
                {applications.map((application: any) => (
                    <li key={application.id}>{application.title}</li>
                ))}
            </ul>
        </div>
    );
}