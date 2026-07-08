import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
              "try{var t=localStorage.getItem('portfolio-theme')||((matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}",
          }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
