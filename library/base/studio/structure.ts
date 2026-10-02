import { CogIcon, DocumentsIcon, HomeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// Singletons: one fixed document each, no "create new"
export const singletonTypes = new Set(["siteSettings"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Home page").icon(HomeIcon).child(S.document().schemaType("page").documentId("home")),
      S.listItem()
        .title("Other pages")
        .icon(DocumentsIcon)
        .child(S.documentList().title("Other pages").schemaType("page").filter('_type == "page" && _id != "home" && _id != "drafts.home"')),
      S.divider(),
      S.listItem().title("Site settings").icon(CogIcon).child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
