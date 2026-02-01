"use server";

import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

const TenantSchema = z.object({
  slug: z.string().min(3).max(40).regex(/^[a-z0-9-]+$/i, "Use letters, numbers, dashes"),
  business_name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  address1: z.string().optional().or(z.literal("")),
  address2: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  zip: z.string().optional().or(z.literal("")),
});

export async function createTenant(formData: FormData) {
  const supabase = supabaseServer();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) throw new Error("Not authenticated");

  const parsed = TenantSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map(i => i.message).join(", ") };
  }

  // Insert tenant (as authenticated user, allowed by policy)
  const { data: tenant, error: tErr } = await supabase
    .from("tenants")
    .insert({
      slug: parsed.data.slug.toLowerCase(),
      business_name: parsed.data.business_name,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      website: parsed.data.website || null,
      address1: parsed.data.address1 || null,
      address2: parsed.data.address2 || null,
      city: parsed.data.city || null,
      state: parsed.data.state || null,
      zip: parsed.data.zip || null,
      brand_primary: "#273D95",
      brand_accent: "#EDB548",
      brand_text: "#111827",
    })
    .select("*")
    .single();

  if (tErr || !tenant) return { ok: false, error: tErr?.message || "Could not create tenant" };

  // Create membership with service role (reliable, bypasses RLS)
  const { error: mErr } = await supabaseAdmin.from("tenant_memberships").insert({
    tenant_id: tenant.id,
    user_id: auth.user.id,
    role: "admin",
  });

  if (mErr) return { ok: false, error: mErr.message };

  redirect(`/${tenant.slug}/settings/branding`);
}
