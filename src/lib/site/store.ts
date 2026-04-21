import "server-only";

import { defaultSiteContent } from "./default-content";
import type { SiteContent } from "./types";

export async function getSiteContent(): Promise<SiteContent> {
  return defaultSiteContent;
}
