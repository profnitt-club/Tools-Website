Vercel Deployment Checklist

Required environment variables (set these in Vercel project settings):

- NEON_DATABASE_URL: Neon connection string (e.g. postgresql://...pooler.../yourdb?sslmode=require)
- JWT_SECRET: secret for signing JWTs
- PORT: optional (Vercel sets its own port)
- NEWS_API_URL, INSIGHTS_API_URL, INDICES_API_URL: optional external APIs for fetcher

Notes and recommendations:

- Ensure the Neon role/user in `NEON_DATABASE_URL` has permission to SELECT/INSERT/UPDATE. Avoid granting unnecessary CREATE TABLE rights in production; run migrations once locally or via a migration job.
 - Ensure the Neon role/user in `NEON_DATABASE_URL` has permission to SELECT/INSERT/UPDATE. Avoid granting unnecessary CREATE TABLE rights in production; run migrations once locally or via a migration job. Use the included one-shot initializer:

	 ```bash
	 node scripts/init-db.js
	 ```

	 Only run this where you have permission to create tables.

Cron / scheduled refresh

- To run scheduled external-data refreshes (news/insights/indices) on Vercel, create a Vercel Cron Job that sends a `POST` request to `/api/refresh`.
- Set `REFRESH_SECRET` in Vercel and configure the Cron Job to include the header `x-refresh-secret: <REFRESH_SECRET>`.

Example using Vercel Cron (set method POST and the custom header):

```
POST https://<your-deployment>/api/refresh
Header: x-refresh-secret: <REFRESH_SECRET>
```
- `server.js` exports the Express `app` when `process.env.VERCEL` is set. Vercel will use `vercel.json` which routes requests to `server.js`.
- We set `engines.node` to `24.x` in `package.json` to ensure matching Node runtime.
- The app uses `@neondatabase/serverless` and expects `NEON_DATABASE_URL` present.
- For scheduled fetches, use Vercel Cron (create a scheduled function that hits `/api/refresh` or similar) — serverless instances are not suitable for in-process cron jobs.

Deployment steps:

1. Commit and push your changes to the repo.
2. In Vercel dashboard, create a new Project and link the repository.
3. Add environment variables listed above in the project's Settings > Environment Variables.
4. Deploy — Vercel will install dependencies and run the server as a serverless function.

Optional: Run initial migrations/seeders before switching production traffic:

- Run locally with `node utils/seedProjects.js` and `node utils/seedAdmin.js` (they use `NEON_DATABASE_URL` from env).

If anything fails during build on Vercel, check the deployment logs for `npm install` or runtime errors and ensure env vars are set correctly.
