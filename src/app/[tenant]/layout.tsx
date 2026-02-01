import { supabaseServer } from "@/lib/supabase/server";
import "./tenant.css";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const supabase = supabaseServer();

  const { data: tenantRow, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", params.tenant)
    .single();

  if (error || !tenantRow) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-semibold">Workspace not found</h1>
      </main>
    );
  }

  // Signed logo URL (private bucket) - optional
  let logoUrl: string | null = null;
  if (tenantRow.logo_path) {
    const { data } = await supabase.storage
      .from("tenant-logos")
      .createSignedUrl(tenantRow.logo_path, 60 * 60); // 1 hour
    logoUrl = data?.signedUrl ?? null;
  }

  // Inject brand variables onto a wrapping div
  const brandStyle: React.CSSProperties = {
    // @ts-expect-error CSS vars
    ["--brand-primary"]: tenantRow.brand_primary || "#273D95",
    ["--brand-accent"]: tenantRow.brand_accent || "#EDB548",
    ["--brand-text"]: tenantRow.brand_text || "#111827",
  };

  return (
    <div style={brandStyle} className="min-h-screen bg-white text-[color:var(--brand-text)]">
      <header className="border-b px-6 py-4 flex items-center gap-3">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
        ) : (
          <div className="h-10 w-10 rounded bg-[color:var(--brand-primary)]" />
        )}
        <div className="leading-tight">
          <div className="font-semibold">{tenantRow.business_name}</div>
          <div className="text-xs text-gray-500">{tenantRow.slug}</div>
        </div>

        <div className="ml-auto flex gap-2">
          <a
            className="text-sm underline"
            href={`/${tenantRow.slug}/settings/branding`}
          >
            Settings
          </a>
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
