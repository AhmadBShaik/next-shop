import { Database } from "@/lib/supabase-schemas";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseShopClient = createClientComponentClient<
  Database,
  "shop",
  Database["shop"]
>({
  options: {
    db: { schema: "shop" },
  },
  isSingleton: true,
});
