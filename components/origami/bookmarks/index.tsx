import { SimpleIcon } from "@/lib/simple-icons-loader"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/db"
import { bookmarks } from "@/db/schema"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { getLocalUrl } from "@/lib/get-local-url"
import { EmptyBookmarks } from "@/components/origami/bookmarks/empty"

const DESCRIPTION_DISPLAY = false

export default async function Bookmarks() {
    const rows = await db.select().from(bookmarks)

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rows.map((bookmark: any) => (
                    <Card key={bookmark.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                                <SimpleIcon si={bookmark.icon.split('si:')[1]} className="size-10" />
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-medium">{bookmark.title}</h2>
                                    <Link href={bookmark.url} target="_blank" className="flex items-center gap-1">
                                        <ArrowUpRightIcon className="size-4" />
                                        {getLocalUrl(bookmark.url)}
                                    </Link>
                                </div>
                            </CardTitle>
                            {bookmark.description && DESCRIPTION_DISPLAY && (
                                <CardDescription>{bookmark.description}</CardDescription>
                            )}
                        </CardHeader>
                    </Card>
                ))}

            </div>
            
            {rows.length === 0 && (
                <EmptyBookmarks />
            )}
            
        </section>
    )
}
