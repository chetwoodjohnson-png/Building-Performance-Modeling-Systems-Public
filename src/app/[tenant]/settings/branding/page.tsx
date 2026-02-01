import { supabaseServer } from "@/lib/supabase/server";
import { updateTenant, uploadLogo } from "./actions";

export default async function BrandingPage({ params }: { params: { tenant: string } }) {
  const supabase = supabaseServer();

  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", params.tenant)
    .single();

  if (!tenant) {
    return <div>Tenant not found</div>;
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Branding & Business Info</h1>
        <p className="text-sm text-gray-600 mt-1">
          This updates your tenant workspace header, colors, and future PDF templates.
        </p>
      </div>

      <section className="border rounded p-5">
        <h2 className="font-semibold">Upload Logo</h2>
        <form action={async (fd) => { "use server"; await uploadLogo(params.tenant, fd); }} className="mt-4 space-y-3">
          <input type="file" name="logo" accept="image/png,image/jpeg,image/svg+xml" />
          <button className="bg-[color:var(--brand-primary)] text-white rounded px-4 py-2">
            Upload logo
          </button>
        </form>
      </section>

      <section className="border rounded p-5">
        <h2 className="font-semibold">Business Information</h2>

        <form action={async (fd) => { "use server"; await updateTenant(params.tenant, fd); }} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Business name</label>
            <input name="business_name" defaultValue={tenant.business_name ?? ""} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" defaultValue={tenant.email ?? ""} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input name="phone" defaultValue={tenant.phone ?? ""} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Website</label>
            <input name="website" defaultValue={tenant.website ?? ""} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input name="address1" defaultValue={tenant.address1 ?? ""} className="w-full border rounded px-3 py-2" />
            <input name="address2" defaultValue={tenant.address2 ?? ""} className="w-full border rounded px-3 py-2 mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input name="city" defaultValue={tenant.city ?? ""} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input name="state" defaultValue={tenant.state ?? ""} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">ZIP</label>
              <input name="zip" defaultValue={tenant.zip ?? ""} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium">Primary</label>
              <input name="brand_primary" defaultValue={tenant.brand_primary ?? "#273D95"} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Accent</label>
              <input name="brand_accent" defaultValue={tenant.brand_accent ?? "#EDB548"} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <input name="brand_text" defaultValue={tenant.brand_text ?? "#111827"} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <button className="bg-[color:var(--brand-accent)] text-black rounded px-4 py-2">
            Save changes
          </button>
        </form>
      </section>

      <section className="border rounded p-5">
        <h2 className="font-semibold">Preview: Branded Banner Component</h2>
        <div className="mt-4 rounded p-4 bg-[color:var(--brand-primary)] text-white">
          <div className="text-sm opacity-90">Tenant-branded UI</div>
          <div className="text-xl font-semibold">{tenant.business_name}</div>
          <div className="mt-2 inline-block rounded bg-[color:var(--brand-accent)] px-3 py-1 text-black text-sm">
            Accent badge
          </div>
        </div>
      </section>
    </div>
  );
}
