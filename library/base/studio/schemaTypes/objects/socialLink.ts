import { ShareIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const socialPlatforms = ["instagram", "facebook", "linkedin", "x", "youtube", "tiktok", "github", "discord", "dribbble", "behance", "pinterest", "threads", "whatsapp"];

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  icon: ShareIcon,
  fields: [
    defineField({ name: "platform", type: "string", options: { list: socialPlatforms }, validation: (rule) => rule.required() }),
    defineField({ name: "url", type: "url", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "platform", subtitle: "url" } },
});
