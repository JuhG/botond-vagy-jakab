# Botond vagy Jakab

Production app locked down because of sensitive images.
But the code is open source.

## Technical details

Trying out a couple of technologies:
- Next app router
- React server components
- Drizzle
- Vercel's db and redis solutions
- uploadthing
- zod

## First impressions

As a time capsule I'll put my thoughts here.

### Services

I still think that making everything serverless makes no sense.
That forces us to use all these services for upload and database, because there's no running server.
Which kind of locks us inside these services forever, that could be potentially expensive and / or limiting in the long run.
But it makes a ton of sense for these tiny side projects.
This site won't get any traffic outside of this week probably.
So paying for a server forever is insane.
What we did in the old days is - for this reason - we put multiple of these small projects on a single VPS.
The current serverless approach is definitely simpler with better DX.
But if I would start my own startup I think I would put that on a real server.

### Server first

RSC is good.
I mean really good.
Best parts of the old Wordpress days with the best parts of modern frontend.
Having a single mental model for the whole app is awesome.
For these simple apps it completely eliminates API calls.
And you can't say it won't scale - you can just write your app you did before.
This is an additive change, nothing was removed.
Really, REALLY enjoyed writing database / redis code close to the React code.
Didn't feel strange at all.
Wouldn't do this in a real app, but love having the option.
