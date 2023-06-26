> Original challenge text is here [./challenge.md](./challenge.md)



## Tech stack
- nextjs
- tailwind
- prisma
- pnpm https://pnpm.io/installation
- docker
- postgres

### Why nextjs?
I decided to pick nextjs as a primary tool for this app because of two reasons. First, I wanted to start as soon as possible.
And second, I wanted to keep my frontend and backend in a single app,
but I can't spend a whole day setting it up with the tools I usually prefer.

In my opinion, the [nextjs API Route Handler](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
is not super great foundation for a real app. It lacks lots of features, and it's too basic. But for something relatively simple, it fits perfectly.

In a real app, I prefer to take something like nestjs. I can't imagine building an API without a proper dependency injection mechanism.

### Why tailwind?
It just saves lots of time.

### Why postgres
From the data sample provided in the task it's clear that this app potentially may have lots of relations between data models.
Since there are no specific requirements in the task, postgres is a good fit as a general purpose relational database.

### Why prisma?
It's my favourite ORM 😄


## About the app
Let me navigate you through the codebase.
This app contains three pages:
- Main page [src/pages/index.tsx](./src/pages/index.tsx), which shows a tracking list of the current user
- Auth page [src/pages/auth.tsx](./src/pages/auth.tsx), where user can be "authenticated" by email
- Tracking item page [src/pages/tracking/\[trackingNumber\].tsx](./src/pages/tracking/[trackingNumber].tsx), where user can see more detailed
view of tracking item.


Two very simple services here [prisma/services/tracking.ts](./prisma/services/tracking.ts)


And two endpoints:
- one for fetching the tracking list [src/app/api/tracking/\[email\]/route.ts](./src/app/api/tracking/[email]/route.ts)
- second for fetching the more detailed data of tracking item [src/app/api/tracking/item/\[trackingNumber\]/route.ts](./src/app/api/tracking/item/[trackingNumber]/route.ts)


These files export everything you may need: parameters and query, return type, etc. So, you can use these definitions on frontend side.
Endpoints are created by this helper function [src/core/route-handler.ts](./src/core/route-handler.ts). It makes the creation of endpoints more convenient. It ensures
that the endpoint will never return stacktrace to a client. And also it applies validation schemas to requests. It may look a bit overengineered, but I just wanted to
show you that I know how generics work 😄


### "Authentication"
Here is how authentication works. Here you can find the implementation [src/guards/AuthGuard.tsx](./src/guards/AuthGuard.tsx).
The app is wrapped in context, which stores the current session data (for this case, it is just the email, if the email is set, then it means the user is authenticated). To make
things a little friendlier, after successful authentication, it navigates users to the URL from which they came. If you open
the `/tracking/123`, it redirects you to the `/auth` page first, and after successful authentication, it will navigate you
back to `/tracking/123`.
The email is stored in memory. If you reload the page, the user session will be wiped out.



## What I would add if I had more time
It took more than four hours to solve, but I tried not to overtime on this. Most features are missing just because lack of time.


- Auth. There is no authentication/authorization.
It just prompts you once to enter an email and stores this data in memory until session is over (or page reloaded).
- Pagination. There is no any kind of pagination. It just shows you the list of first few items.
- Error handling. In case of an error, the API will return just a string. No domain specific error codes, translation constants,
etc. Just a raw error string.
- Logging system. Tracelogs, etc. (to comply with https://12factor.net/ 😄)
- Tests. It took more time than I expected to set things up.


## How to run the app
This app requires postgres database. I already created a simple `docker-compose` file, ([you can find it here](./docker-compose.dev.yml)).
But you could also use yours. In that case, you need to set connection strings for dev environment in [./env](./.env) file, you can find it in the root of this repository.
Two databases is required to make prisma migrations work, you can find more about it here https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database


You may notice that I'm running two postgres instances in docker-compose file. Sorry, I was too lazy to set up one instead of two properly

Here is a step-by-step instruction:
1) change your current working dir to the root of the repository
2) install the `node_modules` via PNPM
```shell
pnpm i
```
3) make sure docker is up and running and ports `3000` `5432` `5433` are available on your local machine
4) run database services via `docker-compose`
```shell
docker-compose -f ./docker-compose.dev.yml up -d
```
5) apply database migrations and seed the database by running 
```shell
pnpm db:reset
```
6) run the app
```shell
pnpm dev
``` 
