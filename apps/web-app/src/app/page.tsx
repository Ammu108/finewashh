import Categories from "@/components/home/categories";
import HeroSection from "@/components/home/hero-section";
import TopDoctors from "@/components/home/top-doctors";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <Categories />
        <TopDoctors />
      </div>
    </main>
  );
}
