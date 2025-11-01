import { Page } from "@/components/base/page";
import SearchBar from "@/components/search";
import Applications from "@/components/origami/applications";
import Welcome from "@/components/welcome";
import Bookmarks from "@/components/origami/bookmarks";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Widgets from "@/components/origami/widgets";

import db from "@/db";
import { user, user_preferences } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
  const userData = await db.select().from(user);

  if (userData.length === 0) {
    redirect("/setup", RedirectType.replace);
  }

  const userPreferences = await db.select().from(user_preferences).where(eq(user_preferences.user_id, 1));

  return (
    <Page>
      <Welcome userName={userData?.[0]?.name.split(" ")[0]} />
      <SearchBar />

      <Widgets/>

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
