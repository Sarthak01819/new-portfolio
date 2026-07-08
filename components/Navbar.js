"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/ss-logo.png" : "/ss-logo2.png";

  return (
    <nav className="fixed left-0 top-5 z-50 w-full px-4 sm:px-6">
      <div className="nav-shell mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-3 backdrop-blur-2xl sm:px-5">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span
            className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border"
            style={{ borderColor: "var(--line)", background: "var(--surface-strong)" }}
          >
              <Image src={logoSrc} alt="Sarthak Singh logo" width={44} height={44} priority className="h-full w-full object-cover" />
          </span>
          <span className="hidden font-display text-sm uppercase sm:block">Sarthak Singh</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase transition-colors"
                style={{
                  background: isActive ? "var(--text)" : "transparent",
                  color: isActive ? "var(--bg)" : "var(--muted)",
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border md:hidden"
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="absolute left-4 right-4 top-[4.8rem] overflow-hidden rounded-[8px] border p-2 shadow-2xl md:hidden"
              style={{ borderColor: "var(--line)", background: "var(--nav)" }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-[6px] px-4 py-3 font-display text-sm uppercase transition-colors"
                  style={{
                    background: pathname === link.href ? "var(--text)" : "transparent",
                    color: pathname === link.href ? "var(--bg)" : "var(--text)",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
