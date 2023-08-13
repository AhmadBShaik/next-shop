This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Supabase
### Schemas

You can have glance of schemas [here](https://dbdiagram.io/d/64d8fe8a02bd1c4a5eb3e22b)

### Create New Schema

Navigate to SQL Editor to the supabase dashboard to write some queries.

```sql
CREATE SCHEMA shop;

```

### Exposing Custom Schema (Shop Schema)
```sql
-- -- Step - 1: Provide usage and privileges

GRANT USAGE 
ON SCHEMA Shop 
TO postgres, anon, authenticated, service_role, dashboard_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA shop
GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role, dashboard_user;


-- -- Step - 2
-- add Shop schema to exposed schemas in Supabase. Settings -> API -> Exposed Schemas -> Add shop from drop down 


-- Step - 3: Make all tables in shop schema accessible

GRANT SELECT
ON ALL TABLES IN SCHEMA shop 
TO postgres, authenticated, service_role, dashboard_user, anon;

GRANT USAGE, SELECT 
ON ALL SEQUENCES IN SCHEMA shop 
TO postgres, authenticated, service_role, dashboard_user, anon;

```

### Generating types from supabase

You can find schemas for this application to create db tables [here](https://dbdiagram.io/d/64d8fe8a02bd1c4a5eb3e22b)

Create the tables with the fields as in dbdiagram schemas and import the schemas using below commands

npx supabase gen types typescript --project-id "Your-Project-Reference-Id" --schema public > lib/supabase-schemas/public.ts

npx supabase gen types typescript --project-id "Your-Project-Reference-Id" --schema shop > lib/supabase-schemas/shop.ts

Project Reference id is found in Your-project-name -> Settings -> General -> General Settings


### Row Level Security (RLS) Policies

Policy Name | Target Roles | Policy | Schema | Table
------------|--------------|------------|--------------|------------|
Insert profile data by shop | INSERT | (user_id = auth.uid()) | shop | profile|
Insert profile data by user | INSERT | (user_id = auth.uid()) | public | profile|

### RPC Functions

```sql
-- Check Profile Already Exists/ Shop exists with the registration email
CREATE OR REPLACE FUNCTION check_user_exists(email_to_check text) RETURNS TABLE(user_exists boolean, profile_exists boolean) security definer
 AS
$$
DECLARE
    user_exists_status integer;
    profile_exists_status integer;
BEGIN
    SELECT COUNT(*) INTO user_exists_status
    FROM auth.users AS users
    LEFT JOIN public.profile AS profile ON profile.user_id = users.id
    WHERE users.email = email_to_check and profile.user_id = users.id;

    SELECT COUNT(*) INTO profile_exists_status
    FROM auth.users AS users
    LEFT JOIN public.profile AS profile ON profile.user_id = users.id
    WHERE users.email = email_to_check;

    RETURN query select user_exists_status > 0 as user_exists, profile_exists_status > 0 as profile_exists;
END;
$$
LANGUAGE plpgsql;

```

```sql
-- Check Shop Already Exists/ Profile exists with the registration email
CREATE OR REPLACE FUNCTION check_shop_exists(email_to_check text) RETURNS TABLE(shop_exists boolean, profile_exists boolean) security definer
 AS
$$
DECLARE
    shop_exists_status integer;
    profile_exists_status integer;
BEGIN
    SELECT COUNT(*) INTO shop_exists_status
    FROM auth.users AS users
    LEFT JOIN shop.profile AS profile ON profile.user_id = users.id
    WHERE users.email = email_to_check and profile.user_id = users.id;

    SELECT COUNT(*) INTO profile_exists_status
    FROM auth.users AS users
    LEFT JOIN shop.profile AS profile ON profile.user_id = users.id
    WHERE users.email = email_to_check;

    RETURN query select shop_exists_status > 0 as shop_exists, profile_exists_status > 0 as profile_exists;

END;
$$
LANGUAGE plpgsql;

```



## Getting Started

First, install necessary packages:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
