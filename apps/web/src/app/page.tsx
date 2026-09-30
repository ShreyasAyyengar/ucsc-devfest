export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm sm:p-14">
        <p className="mb-4 font-semibold text-blue-600 text-sm uppercase tracking-[0.2em]">UCSC DevFest</p>
        <h1 className="font-bold text-4xl text-slate-950 tracking-tight sm:text-5xl">Your starter is ready.</h1>
        <p className="mt-5 max-w-xl text-lg text-slate-600 leading-8">
          Start building by editing <code className="rounded bg-slate-100 px-2 py-1 text-base text-slate-800">src/app/page.tsx</code>.
        </p>
      </section>
    </main>
  );
}
