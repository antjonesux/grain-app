/// <reference path="../deno.d.ts" />
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  console.log("delete-account: method", req.method);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  console.log("delete-account: start");

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  if (!serviceKey) return json(500, { error: "Missing SUPABASE_SERVICE_ROLE_KEY" });

  const authHeader = req.headers.get("Authorization") ?? "";

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    console.log("delete-account: unauthorized");
    return json(401, { error: "Unauthorized" });
  }

  const userId = userData.user.id;

  const adminClient = createClient(supabaseUrl, serviceKey);

  const { error: purgeErr } = await adminClient.rpc("delete_account_data", {
    p_user_id: userId,
  });
  if (purgeErr) return json(500, { error: "Failed to delete user data", details: purgeErr.message });

  const { error: authDeleteErr } = await adminClient.auth.admin.deleteUser(userId);
  if (authDeleteErr) return json(500, { error: "Failed to delete auth user", details: authDeleteErr.message });

  console.log("delete-account: ok");
  return json(200, { ok: true });
});