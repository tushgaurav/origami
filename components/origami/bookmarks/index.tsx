import db from "@/db"
import { bookmark_categories, bookmarks } from "@/db/schema"
import Link from "next/link"

export default async function Bookmarks() {
    const categories = await db.select().from(bookmark_categories).orderBy(bookmark_categories.name);
    const bookmarks_rows = await db.select().from(bookmarks).orderBy(bookmarks.title);

    const data = categories.map((category) => ({
        ...category,
        bookmarks: bookmarks_rows.filter((bookmark) => bookmark.category_id === category.id)
    }));

    if (data.length === 0) {
        return null;
    }

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((category) => (
                    <div key={category.id} className="mt-2">
                        <h2 className="text-lg font-bold mb-4">{category.name}</h2>
                        <div className="flex flex-col gap-2">
                            {category.bookmarks.map((bookmark) => (
                                <Link href={bookmark.url} target="_blank" className="hover:text-primary transition-colors">
                                    {bookmark.title}
                                </Link>
                            ))}

                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}
