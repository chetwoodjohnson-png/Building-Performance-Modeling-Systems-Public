import { createTenant } from "./actions";

export default function OnboardingPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Create your BPMS Workspace</h1>
      <p className="text-sm text-gray-600 mt-2">
        Enter your business info. You can upload a logo and set brand colors next.
      </p>

      <form action={createTenant} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Workspace slug</label>
          <input name="slug" placeholder="nyenergyaudits" className="w-full border rounded px-3 py-2" />
          <p className="text-xs text-gray-500 mt-1">Used in your URL: /{"{slug}"}/...</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Business name</label>
          <input name="business_name" className="w-full border rounded px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Website</label>
          <input name="website" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input name="address1" placeholder="Street address" className="w-full border rounded px-3 py-2" />
          <input name="address2" placeholder="Unit / Suite (optional)" className="w-full border rounded px-3 py-2 mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input name="state" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">ZIP</label>
            <input name="zip" className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <button className="bg-black text-white rounded px-4 py-2">
          Create workspace
        </button>
      </form>
    </main>
  );
}
