import "lenis/dist/lenis.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import EyeBackground from "@/components/EyeBackground";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

// Extended metadata including Open Graph for better social previews
export const metadata = {
  title: "Sarthak Singh - Portfolio",
  description: "Full-stack developer portfolio for Sarthak Singh.",
  openGraph: {
    title: "Sarthak Singh — Full‑stack developer",
    description: "I build fast, expressive web products with Next.js, React, and Node.js.",
    url: "https://your-domain.com/",
    images: ["/og-image.png"],
  },
  // Base URL used to resolve Open Graph and Twitter image URLs during dev and build
  metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
          <a href="#content" className="skip-link">Skip to content</a>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('portfolio-theme')||((matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}" +
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('intro-pending');setTimeout(function(){d.classList.remove('intro-pending')},4000);}}catch(e){}",
          }}
        />
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll />
            <EyeBackground />
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
            <PageTransition />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
