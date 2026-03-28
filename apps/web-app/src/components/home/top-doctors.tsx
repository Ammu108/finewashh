import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card";

const TopDoctors = () => {
  return (
    <section className="px-4">
      {/* ── Heading ── */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Top Doctors To Book
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Simply browse through our extensive list of trusted doctors, With just a few clicks,
          you can easily schedule your appointment on our hassle-free system
        </p>
      </div>
      {/* Doctor Cards */}
      <div>
        <Card className="relative mx-auto w-full max-w-xs pt-0">
          <div className="relative aspect-video">
            <Image src="/images/doc1.png" alt="Doctor" fill className="w-full object-cover" />
          </div>
          <CardHeader>
            <CardAction></CardAction>
            <CardTitle>Sophia Williams</CardTitle>
            <CardDescription>
              A practical talk on component APIs, accessibility, and shipping faster.A
              practical talk on component APIs, accessibility, and shipping faster.
            </CardDescription>
            <Button variant="primary" className="mt-4">
              Book Now
            </Button>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default TopDoctors;
