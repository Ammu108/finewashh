import Image from "next/image";

const WHY_CARDS = [
  {
    text: "Our team of highly qualified and experienced doctors is dedicated to offering the best possible treatment.",
  },
  {
    text: "We leverage state-of-the-art medical equipment and technology to provide accurate diagnoses and effective treatments.",
  },
  {
    text: "From preventive care to specialized treatments, we cater to a wide range of medical needs.",
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-6xl px-4 mx-auto mt-28 gap-12 flex flex-col">
      {/* ── SECTION 1: About Us + Image ── */}
      <section className="flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-[42%] shrink-0">
            <Image
              src="/about_img.jpg"
              width={600}
              height={400}
              alt="Doctor consultation"
              className="w-full h-72 md:h-80 object-cover"
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col gap-7 flex-1">
            {/* About Us */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">About Us</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Welcome to Atom Hospital, where compassionate care meets medical excellence.
                Our mission is to provide top-quality healthcare services with a
                patient-centered approach, ensuring that every individual receives personalized
                and effective treatment.
              </p>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                At Atom Hospital, we are dedicated to delivering comprehensive healthcare with
                a commitment to innovation, excellence, and patient satisfaction. We strive to
                enhance the well-being of our community through accessible, affordable, and
                high-quality medical services. our vision to be a leading healthcare
                institution known for setting new standards in patient care, medical research,
                and professional excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Why Choose Us ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Why Choose Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CARDS.map(({ text }, i) => (
            <div key={i} className="bg-accent rounded-sm p-6 flex items-center min-h-55">
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Contact Us ── */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Contact Us</h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          If you have any questions or wish to learn more about our services, feel free to get
          in touch with us. Your health is our priority, and we are here to support you every
          step of the way. Thank you for choosing Atom hospital for your healthcare needs.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
