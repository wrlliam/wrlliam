import { Elysia } from "elysia";
import { getHtmlTemplate, schema } from "./utils/template";
import { getScreenshot } from "./utils/pptr";
import { getTotalStars, latestCommitData } from "./utils/gh";

export const app = new Elysia()
  .get("/", async ({ query, request }) => {
    const result = schema.safeParse(query);
    if (!result.success) {
      return new Response("INVALID_QUERY", { status: 400 });
    }

    const url = new URL(request.url);

    const html = await getHtmlTemplate(url.pathname);
    const file = await getScreenshot(html);
    return new Response(file, {
      headers: {
        "Content-Type": `image/png`,
        "Cache-Control": `public, immutable, no-transform, s-maxage=3600, max-age=3600`,
      },
    });
  })
  .listen(
    {
      hostname: "0.0.0.0",
      port: 7254,
    },
    () => {
      console.log(`Listening on port: 7254`);
    }
  );
