export type FaviconSizes = {
  width: number
  height: number
  name: string
  format: "png" | "ico"
}

export const FAVICON_SIZES: FaviconSizes[] = [
  { width: 16, height: 16, name: "favicon-16x16", format: "png" },
  { width: 32, height: 32, name: "favicon-32x32", format: "png" },
  { width: 180, height: 180, name: "apple-touch-icon", format: "png" },
  { width: 192, height: 192, name: "android-chrome-192x192", format: "png" },
  { width: 512, height: 512, name: "android-chrome-512x512", format: "png" },
]

export function generateManifest(siteInfo: {
  name: string
  shortName: string
  themeColor: string
  backgroundColor: string
}) {
  return {
    name: siteInfo.name,
    short_name: siteInfo.shortName,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: siteInfo.themeColor,
    background_color: siteInfo.backgroundColor,
    display: "standalone",
  }
}

export function generateHtmlCode(siteInfo: { name: string; themeColor: string; backgroundColor: string }) {
  return `
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Web Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Browser Theme -->
<meta name="theme-color" content="${siteInfo.themeColor}">
<meta name="application-name" content="${siteInfo.name}">
<meta name="apple-mobile-web-app-title" content="${siteInfo.name}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
`
}

export function generateBrowserConfigXml(backgroundColor: string) {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>${backgroundColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`
}

