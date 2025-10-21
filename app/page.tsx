import { Page } from "@/components/base/page";
import SearchBar from "@/components/search";
import Applications from "@/components/origami/applications";
import Welcome from "@/components/welcome";
import Bookmarks from "@/components/origami/bookmarks";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

import db from "@/db";
import { user_preferences } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const userPreferences = await db.select().from(user_preferences).where(eq(user_preferences.user_id, 1));

  return (
    <Page>
      <Welcome />
      <SearchBar />

      <Applications
        fullSizeButtons={userPreferences?.[0]?.application_button_size === "full"}
       />
      <Bookmarks />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <Link href="/settings" className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="size-4" />
            Settings
          </Button>
        </Link>
      </div>

    </Page>
  );
}
