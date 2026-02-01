import type Stripe from "stripe";
import { Entitlements, PlanKey } from "./types";

function metaBool(v: string | null | undefined) {
  return String(v).toLowerCase() === "true";
}

function metaSeats(v: string | null | undefined): number | "unlimited" {
  const s = (v ?? "").toLowerCase();
  if (s === "unlimited") return "unlimited";
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function metaPlan(v: string | null | undefined): PlanKey {
  const p = (v ?? "").toLowerCase();
  if (p === "starter" || p === "pro" || p === "enterprise") return p;
  return "starter";
}

export function entitlementsFromPrice(price: Stripe.Price): Entitlements {
  const m = price.metadata || {};

  return {
    plan: metaPlan(m.bpms_plan),
    seatsIncluded: metaSeats(m.seats_included),

    audit: metaBool(m.ent_audit),
    thermal: metaBool(m.ent_thermal),
    photos: metaBool(m.ent_photos),

    brandingLevel: (m.ent_branding_level as any) || "basic",
    auditLogs: metaBool(m.ent_audit_logs),
  };
}
