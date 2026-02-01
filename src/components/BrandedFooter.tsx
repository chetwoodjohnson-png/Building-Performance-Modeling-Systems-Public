export function BrandedFooter({ tenant }: { tenant: any }) {
  return (
    <footer className="mt-10 border-t pt-6 text-sm">
      <div className="font-semibold">{tenant.business_name}</div>
      <div className="text-gray-600">
        {tenant.phone ? <span>{tenant.phone} • </span> : null}
        {tenant.email ? <span>{tenant.email} • </span> : null}
        {tenant.website ? <span>{tenant.website}</span> : null}
      </div>

      <div className="mt-3">
        <span className="inline-block rounded px-3 py-1 bg-[color:var(--brand-primary)] text-white">
          Powered by BPMS Suite
        </span>
      </div>
    </footer>
  );
}
