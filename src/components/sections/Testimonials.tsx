import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28 border-t border-stone-200/60">
      <Container>
        <SectionHeading
          badge="Client Testimonials"
          title="Endorsed by Jewellers & Discerning Patrons"
          subtitle="Real reviews from retail customers, astrological consultants, and wholesale jewellery partners."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-[#faf8f5] p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-400/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-current" />
                    ))}
                  </div>
                  <Quote size={20} className="text-amber-800/30" />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-stone-700 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-stone-200">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {item.author}
                </h4>
                <p className="text-xs text-amber-800 font-medium">
                  {item.role}
                </p>
                <p className="text-[11px] text-stone-500">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
