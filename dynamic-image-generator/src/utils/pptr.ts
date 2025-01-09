import { env } from "bun";
import pptr, { type Page } from "puppeteer-core";
import type { TypeEnum } from "./template";

// let _p: Page | null;
export async function getPage() {
  // if (_p) {
  //   return _p;
  // }
  const browser = await pptr.connect({
    browserWSEndpoint: env.BROWERLESS_URL!,
  });

  // _p = await browser.newPage();
  // return _p;
  return await browser.newPage()
}

export async function getScreenshot(html: string, type: TypeEnum = "png") {
  const p = await getPage();
  await p.setViewport({ width: 1920 / 2, height: 1080 / 2 });
  await p.setContent(html);
  await p.waitForNetworkIdle();

  return await p.screenshot({
    type: type,
  });
}
