import { Page, PageHeader } from "@/components/base/page";
import SearchBar from "@/components/search";
import { CommandDialogDemo } from "@/components/command";
import Applications from "@/components/origami/applications";

export default function Home() {
  return (
    <Page>
      <PageHeader heading="Welcome Tushar!" />
      <SearchBar />
      {/* <CommandDialogDemo /> */}

      <Applications />
    </Page>
  );
}
