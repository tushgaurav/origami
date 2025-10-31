import type { Metadata } from "next";
import { GalleryVerticalEnd } from "lucide-react"

import Setup from "@/components/origami/setup"
import Image from "next/image";
import Link from "next/link";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect, RedirectType } from "next/navigation";

export const metadata: Metadata = {
  title: "Setup your Origami",
  description: "Setup your Origami",
};

export default async function SetupPage() {
  const userData = await db.select().from(user);

  if (userData.length > 0) {
    redirect("/", RedirectType.replace);
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Origami
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Setup />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/setup-graphic.png"
          alt="Setup your Origami"
          width={1000}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute bottom-8 right-8 text-white text-sm">
          <p>
            Homelab of&nbsp;
            <span className="font-bold">pcHome</span>&nbsp;via&nbsp;
            <Link href="https://forum.45homelab.com/t/my-hl-15-within-my-homelab/649" target="_blank" className="underline">
              45HomeLab
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
