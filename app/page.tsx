import { Page } from "@/components/base/page";
import SearchBar from "@/components/search";
import Applications from "@/components/origami/applications";
import Welcome from "@/components/welcome";

export default function Home() {
  return (
    <Page>
      <Welcome />
      <SearchBar />

      <Applications />
    </Page>
  );
}
