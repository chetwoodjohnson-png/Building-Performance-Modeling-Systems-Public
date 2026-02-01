"use server";

import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const UpdateSchema = z.object({
  business_name: z.string().min(2).max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  address1: z.string().optional().or(z.literal("")),
  address2: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  zip: z.string().optional().or(z.literal("")),
  brand_primary: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  brand_accent: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  brand_text: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
});

export async function updateTenant(tenantSlug: string, formData: FormData) {
  const supabase = supabaseServer();

  const parsed = UpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { ok: false, error: "Invalid form values" };

  // Find tenant id by slug
  const { data: tenant, error: tErr } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", tenantSlug)
    .single();

  if (tErr || !tenant) return { ok: false, error: "Tenant not found" };

  // Update (RLS requires admin membership)
  const { error: uErr } = await supabase
    .from("tenants")
    .update({
      business_name: parsed.data.business_name,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      website: parsed.data.website || null,
      address1: parsed.data.address1 || null,
      address2: parsed.data.address2 || null,
      city: parsed.data.city || null,
      state: parsed.data.state || null,
      zip: parsed.data.zip || null,
      brand_primary: parsed.data.brand_primary,
      brand_accent: parsed.data.brand_accent,
      brand_text: parsed.data.brand_text,
    })
    .eq("id", tenant.id);

  if (uErr) return { ok: false, error: uErr.message };
  return { ok: true };
}

export async function uploadLogo(tenantSlug: string, formData: FormData) {
  const supabase = supabaseServer();

  const file = formData.get("logo") as File | null;
  if (!file) return { ok: false, error: "No file uploaded" };
  if (file.size > 3_000_000) return { ok: false, error: "Logo must be <= 3MB" };

  const { data: tenant, error: tErr } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", tenantSlug)
    .single();

  if (tErr || !tenant) return { ok: false, error: "Tenant not found" };

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${tenant.id}/logo.${ext}`;

  // Upload to private bucket (RLS policy checks tenant folder by tenant.id)
  const { error: upErr } = await supabase.storage
    .from("tenant-logos")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (upErr) return { ok: false, error: upErr.message };

  // Save logo_path into tenant record
  const { error: uErr } = await supabase
    .from("tenants")
    .update({ logo_path: path })
    .eq("id", tenant.id);

  if (uErr) return { ok: false, error: uErr.message };

  return { ok: true };
}
