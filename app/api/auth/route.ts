import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/clients/server-clients/supabase-server-client";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
