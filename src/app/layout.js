import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Analytics from "@/components/Analytics";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://whysbr.com"),
  title: {
    default: "WHYS | Creative Design Digital Studio",
    template: "%s | WHYS",
  },
  description:
    "Estúdio digital focado em criar experiências imersivas. Design meticuloso, pixel-perfect, com tecnologias de alta performance. Branding, UX/UI, Web Design e muito mais.",
  keywords: [
    "web design",
    "agência digital",
    "branding",
    "UX/UI",
    "Next.js",
    "design studio",
    "Porto Velho",
    "Brasil",
    "WHYS",
  ],
  authors: [{ name: "WHYS Studio", url: "https://whysbr.com" }],
  creator: "WHYS Studio",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://whysbr.com",
    siteName: "WHYS Studio",
    title: "WHYS | Creative Design Digital Studio",
    description:
      "Estúdio digital focado em criar experiências imersivas e marcas que impressionam.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WHYS Creative Design Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHYS | Creative Design Digital Studio",
    description:
      "Estúdio digital focado em criar experiências imersivas e marcas que impressionam.",
    images: ["/og-image.png"],
    creator: "@whysstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://whysbr.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo-simbolo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#f4f4f0" />
        <meta property="og:url" content="https://whysbr.com" />
        {/* —— JSON-LD Structured Data —— */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans min-h-screen overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
