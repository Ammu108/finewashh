import Image from "next/image";
import { SPECIALITIES } from "@/lib/constant";

const Categories = () => {
  return (
    <section className="px-4">
      {/* ── Heading ── */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Find By Speciality
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Simply browse through our extensive list of trusted doctors, With just a few clicks,
          you can easily <br className="hidden sm:block" />
          schedule your appointment on our hassle-free system
        </p>
      </div>

      {/* ── Speciality Grid ── */}
      <div className="max-w-5xl flex no-scrollbar flex-nowrap overflow-x-auto -mx-4 px-4 md:mx-auto md:flex md:flex-wrap md:overflow-visible md:justify-center gap-8 sm:gap-12">
        {SPECIALITIES.map(({ label, image }) => (
          <button
            type="button"
            key={label}
            className="flex flex-col items-center gap-3 group cursor-pointer focus:outline-none"
          >
            {/* Circle image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 transition-all duration-300">
              <Image src={image} alt={label} className="w-full h-full object-cover" />
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-card-foreground">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
