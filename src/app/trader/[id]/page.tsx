import Hero from "@/components/trader/Hero";

export default async function TraderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="min-h-screen py-[129px]">
      <Hero userId={id} />
    </main>
  );
}
