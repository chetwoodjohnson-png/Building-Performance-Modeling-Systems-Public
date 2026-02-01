export type PlanKey = "starter" | "pro" | "enterprise";

export type Entitlements = {
  plan: PlanKey;
  seatsIncluded: number | "unlimited";

  audit: boolean;
  thermal: boolean;
  photos: boolean;

  brandingLevel: "basic" | "full" | "whitelabel";
  auditLogs?: boolean;
};
