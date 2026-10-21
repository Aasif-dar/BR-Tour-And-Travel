import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ivory">
      <div className="container-x flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="display mt-4 max-w-xl text-5xl sm:text-6xl">This path doesn’t lead anywhere.</h1>
        <p className="prose-body mt-5 max-w-md">The page may have moved. Let us take you back to where the journey begins.</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Link href="/" className="btn btn-ink">
            Return home
          </Link>
          <Link href="/umrah" className="btn btn-outline">
            View packages
          </Link>
        </div>
      </div>
    </section>
  );
}
