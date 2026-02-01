import Link from "next/link";

type Plan = {
  key: "starter" | "pro" | "enterprise";
  name: string;
  tagline: string;
  priceLabel: string; // e.g. "$99/mo" or "Custom"
  seatLabel: string;  // e.g. "1 seat" / "Up to 5 seats" / "Unlimited seats"
  features: string[];
  cta: { label: string; href: string };
  recommended?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    tagline: "For solo auditors and small firms getting started.",
    priceLabel: "$___/mo",
    seatLabel: "1 seat included",
    features: [
      "Audit Reports module",
      "Data capture + calculations",
      "Branded PDF reports",
      "Secure project storage",
      "Tenant workspace branding (basic)",
    ],
    cta: { label: "Start Starter", href: "/checkout?plan=starter" },
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For growing teams doing full diagnostic work.",
    priceLabel: "$___/mo",
    seatLabel: "Up to 5 seats included",
    features: [
      "Audit Reports",
      "Thermal Imaging (uploads + findings + PDFs)",
      "Photo Documentation (captions + markups)",
      "Team-based collaboration",
      "Tenant branding across reports (full)",
      "Priority support",
    ],
    cta: { label: "Start Pro", href: "/checkout?plan=pro" },
    recommended: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "For established firms operating at scale.",
    priceLabel: "Custom",
    seatLabel: "Unlimited seats",
    features: [
      "Audit Reports + Thermal + Photo Documentation",
      "Enhanced security + audit logging",
      "Dedicated onboarding",
      "Priority support + success",
      "Custom rollouts for large teams",
    ],
    cta: { label: "Talk to Sales", href: "/contact-sales" },
  },
];

function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Pricing built for auditors and contractors
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Choose the plan that matches your workflow today. Upgrade anytime as your team grows.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Drones and APIs are not included in any plan.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <section
            key={plan.key}
            className={classNames(
              "relative rounded-2xl border bg-white p-6 shadow-sm",
              plan.recommended && "border-slate-900 shadow-md md:scale-[1.02]"
            )}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-3xl font-semibold">{plan.priceLabel}</div>
              <div className="mt-1 text-sm text-slate-600">{plan.seatLabel}</div>
            </div>

            <ul className="mt-6 space-y-2 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-[2px] inline-block h-4 w-4 rounded-full border border-slate-300" />
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href={plan.cta.href}
                className={classNames(
                  "inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium",
                  plan.recommended
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                )}
              >
                {plan.cta.label}
              </Link>
            </div>

            {plan.recommended && (
              <p className="mt-3 text-center text-xs text-slate-500">
                Most popular for full diagnostics teams
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
