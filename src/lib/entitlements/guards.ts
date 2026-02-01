import { Entitlements } from "./types";

export function requireFeature(ent: Entitlements, feature: keyof Pick<Entitlements, "audit" | "thermal" | "photos">) {
  if (!ent[feature]) {
    const msg = `This feature requires an upgraded plan. Missing entitlement: ${feature}`;
    const err = new Error(msg);
    (err as any).code = "ENTITLEMENT_REQUIRED";
    throw err;
  }
}

export function seatsAllowed(ent: Entitlements): number | null {
  return ent.seatsIncluded === "unlimited" ? null : ent.seatsIncluded;
}
