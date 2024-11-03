# Bluesky Followers

Statically self-hosted historical followers data for Bluesky 🦋

## Demo

[bluesky-followers.joebell.studio](https://bluesky-followers.joebell.studio/)

## Overview

[Bluesky's API](https://docs.bsky.app/docs/api/app-bsky-actor-get-profile) offers public access to a user's `followersCount` and `followsCount` without authentication; however, there's no way to track these values over time.

This project is a tiny static [Astro](https://astro.build) app that stores values in a [Content Collection](https://docs.astro.build/en/guides/content-collections/) to track over time and is kept up to date with a scheduled GitHub Action.

## Getting Started

1. Click "Use this template" → "Create a new repository" to duplicate this repository to your account
2. Create a new [GitHub "Personal Access Token" (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with the following scopes:
   - `repo`
   - `workflows`
3. Within your duplicate repository's settings, [create a new secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) with the following configuration:
   - Name: `REPO_TOKEN`
   - Secret: `<INSERT_YOUR_PAT_HERE>`
4. Replace `src/config.ts`'s `bluesky` value with your own handle
5. Adjust the `cron` schedule in [`workflows/sync.yml`](./.github/workflows/sync.yml) if necessary

   _By default, it runs at 03:00 on the first day of every month (avoiding 00:00 traffic of other cron-based actions)_

6. Deploy to your preferred service!

### Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                              |
| :--------------------- | :-------------------------------------------------- |
| `pnpm install`         | Installs dependencies                               |
| `pnpm dev`             | Starts local dev server at `localhost:4321`         |
| `pnpm build`           | Build your production site to `./dist/`             |
| `pnpm preview`         | Preview your build locally, before deploying        |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check`    |
| `pnpm astro -- --help` | Get help using the Astro CLI                        |
| `pnpm sync:bluesky`    | Add a `src/data/bluesky` entry for the current time |
