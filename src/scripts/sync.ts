import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { config } from "../config";

const BlueskySchema = z.union([
  z.object({
    did: z.string(),
    handle: z.string(),
    followersCount: z.number(),
    followsCount: z.number(),
    error: z.never().optional(),
    message: z.never().optional(),
  }),
  z.object({
    did: z.never().optional(),
    handle: z.never().optional(),
    followersCount: z.never().optional(),
    followsCount: z.never().optional(),
    error: z.string(),
    message: z.string(),
  }),
]);

async function syncBlueskyFollowers() {
  const res = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${config.bluesky}`
  ).then((res) => res.json());

  const data = BlueskySchema.parse(res);

  if ("error" in data) {
    throw Error(`${data.error}: ${data.message}`);
  }

  const { followersCount, followsCount } = data;

  const now = new Date().toISOString();

  const dir = path.join(`./src/data/bluesky`);
  const filePath = path.join(dir, `${now}.json`);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    filePath,
    JSON.stringify({ date: now, followersCount, followsCount }, null, 2),
    "utf-8"
  );

  console.log(`New entry added: ${filePath}`);
}

syncBlueskyFollowers();
