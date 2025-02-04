import type { Metadata } from "next"
import { Chrome, Firefox, Safari, Opera, Edge, Apple, Windows, Android } from "@/components/browser-icons"
import UploadZone from "@/components/upload-zone"
import Features from "@/components/features"
import FAQ from "@/components/faq"

export const metadata: Metadata = {
  title: "IconForge - Professional Favicon Generator for All Devices",
  description:
    "Create perfect favicons with IconForge. Generate high-quality icons for all browsers and devices, including SVG favicons, Apple Touch icons, and Android icons.",
  keywords: "favicon generator, icon generator, web icons, app icons, SVG favicon, Apple Touch icon, Android icon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-favicon-generator-url.com",
    title: "Professional Favicon Generator",
    description: "Create perfect favicons for all devices and platforms",
    images: [
      {
        url: "https://your-favicon-generator-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Favicon Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Favicon Generator",
    description: "Create perfect favicons for all devices and platforms",
    images: ["https://your-favicon-generator-url.com/twitter-image.jpg"],
    creator: "@yourtwitterhandle",
  },
}

export default function FaviconGenerator() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">IconForge: Craft Perfect Favicons</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Forge perfect favicons for all devices and platforms. Create SVG favicons, Apple Touch icons, Android
              icons, and more. Get your professional favicon package in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Supported Browsers</h2>
                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <Chrome className="w-12 h-12" />
                  <Firefox className="w-12 h-12" />
                  <Safari className="w-12 h-12" />
                  <Opera className="w-12 h-12" />
                  <Edge className="w-12 h-12" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Supported Platforms</h2>
                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <Apple className="w-12 h-12" />
                  <Windows className="w-12 h-12" />
                  <Android className="w-12 h-12" />
                  <Chrome className="w-12 h-12" />
                </div>
              </div>
            </div>

            <UploadZone />
          </div>
        </div>
      </section>

      <Features />
      <FAQ />
    </div>
  )
}

