import { CheckCircle } from "lucide-react"

const features = [
  {
    title: "Multiple Sizes & Formats",
    description: "Generate favicons in various sizes and formats, including ICO, PNG, and SVG.",
  },
  {
    title: "Cross-Platform Support",
    description: "Create icons for all major platforms: Windows, macOS, iOS, Android, and more.",
  },
  {
    title: "SVG Favicon Support",
    description: "Generate scalable vector graphics favicons for modern browsers.",
  },
  {
    title: "Apple Touch Icons",
    description: "Create Apple Touch icons for iOS devices and Safari pinned tabs.",
  },
  {
    title: "Android Adaptive Icons",
    description: "Generate Android adaptive icons for a consistent look across devices.",
  },
  {
    title: "Microsoft Tile Icons",
    description: "Create Windows 10 and 11 tile icons for pinned sites.",
  },
  {
    title: "Web App Manifest",
    description: "Automatically generate a web app manifest for Progressive Web Apps.",
  },
  {
    title: "Browser Config",
    description: "Generate browserconfig.xml for Internet Explorer and Microsoft Edge.",
  },
  {
    title: "HTML Code Generation",
    description: "Get ready-to-use HTML code for easy implementation of your favicons.",
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Powerful Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

