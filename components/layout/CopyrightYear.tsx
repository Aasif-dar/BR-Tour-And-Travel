import { cacheLife } from "next/cache";

/** Cached so the footer can stay in the static shell; refreshes daily. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
