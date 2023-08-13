import { Database } from "@/lib/supabase-schemas";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabasePublicClient = createClientComponentClient<
  Database,
  "public",
  Database["public"]
>({
  options: {
    db: { schema: "public" },
  },
  isSingleton: true,
});
