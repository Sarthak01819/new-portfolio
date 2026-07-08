import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { socials } from "@/lib/data";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

export default function Footer() {
  return (
    <footer className="page-shell page-grid min-h-0 py-12">
      <div className="section-band">
        <div className="section-inner flex flex-col gap-8 border-t pt-8" style={{ borderColor: "var(--line)" }}>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl uppercase">Sarthak Singh</p>
              <p className="mt-2 text-sm muted-copy">Full-stack developer based in India.</p>
            </div>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border transition-transform hover:-translate-y-1"
                    style={{ borderColor: "var(--line)", background: "var(--surface)" }}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 text-sm muted-copy sm:flex-row">
            <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
            <span>
              Created and designed by{" "}
              <Link href="/" className="underline underline-offset-4">
                Sarthak Singh
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
