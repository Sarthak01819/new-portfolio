import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const contactItems = [
  { icon: Mail, label: "Email", value: "sarthaksingh.9344@gmail.com", href: "mailto:sarthaksingh.9344@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91-8429172126", href: "tel:+918429172126" },
  { icon: MapPin, label: "Location", value: "Kanpur, Uttar Pradesh, India" },
];

export default function ContactPage() {
  return (
    <PageShell className="pb-24 sm:pb-32">
      <section className="section-band">
        <SectionHeader eyebrow="Contact" title="Let us build">
          Send a brief, a role, or a project idea. I will get back with the clearest next step.
        </SectionHeader>

        <div className="section-inner grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="contact-card flex items-start gap-4 p-5">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border"
                    style={{ borderColor: "var(--line)", background: "var(--surface-strong)" }}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-sm uppercase">{item.label}</span>
                    <span className="mt-1 block break-words text-sm muted-copy">{item.value}</span>
                  </span>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </Reveal>

          <Reveal delay={0.08}>
            <form action="https://formspree.io/f/mjkaqnyb" method="POST" className="contact-card grid gap-4 p-5 sm:p-8" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="sr-only">Contact form</h2>
              <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sr-only" htmlFor="first">First name</label>
                <input id="first" className="field-control" type="text" name="first" placeholder="First name" autoComplete="given-name" />

                <label className="sr-only" htmlFor="last">Last name</label>
                <input id="last" className="field-control" type="text" name="last" placeholder="Last name" autoComplete="family-name" />
              </div>

              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" className="field-control" type="email" name="email" placeholder="Email" autoComplete="email" required aria-required="true" />

              <label className="sr-only" htmlFor="message">Message</label>
              <textarea id="message" className="field-control min-h-40 resize-none" name="message" placeholder="Message" required aria-required="true" />

              <button type="submit" className="primary-action mt-2 w-full">
                Send message <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
