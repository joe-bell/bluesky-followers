import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { config } from "../config";

export type Response = Awaited<ReturnType<typeof handler>>;

const handler = async (_: Request) => {
  const bluesky = await getCollection("bluesky");

  return {
    handle: config.bluesky,
    profile: `https://bsky.app/profile/${config.bluesky}`,
    history: bluesky.sort().map(({ data }) => data),
  };
};

export const GET: APIRoute = async ({ request }) => {
  const data = await handler(request);

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};
