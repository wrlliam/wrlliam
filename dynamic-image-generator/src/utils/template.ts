import { z } from "zod";
import { getTotalStars, latestCommitData } from "./gh";

export type TypeEnum = "png" | "webp" | "jpeg" | undefined;
export const schema = z.object({
  type: z.enum(["png", "webp", "jpeg"]).default("png").nullable(),
});

export let formatKeys = {
  stylesheet: (html: string, styles: string) => `<style>${styles}</style>`,
  star_count: async (html: string, styles: string) => {
    return (await getTotalStars()).toString();
  },
  commit_count: async (html: string, styles: string) => {
    return (await latestCommitData())[1].toString();
  },
  commit_name: async (html: string, styles: string) => {
    return (await latestCommitData())[0].toString();
  },
};

export const formatTemplate = async (html: string, styles: string) => {
  let htmlC = html;
  const keys = Object.keys(formatKeys);
  for (let k of keys) {
    htmlC = htmlC.replaceAll(
      new RegExp(`{{${k}}}`, "igm"),
      await formatKeys[k as keyof typeof formatKeys](html, styles)
    );
  }
  return htmlC;
};

export async function getHtmlTemplate(route?: string) {
  let r = !route || route.length < 2 ? "/root" : route;
  let p = `${process.cwd()}/src/content${r}`;
  const fileContent = await (await Bun.file(`${p}/index.html`)).text();
  const styleSheet = await (await Bun.file(`${p}/out.css`)).text();

  const formatted = await formatTemplate(fileContent, styleSheet);
  return formatted;
}
