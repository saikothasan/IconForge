import { NextResponse } from "next/server"
import { generateManifest, generateBrowserConfigXml, FAVICON_SIZES } from "@/lib/favicon-generator"
import { storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import JSZip from "jszip"
import sharp from "sharp"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const name = formData.get("name") as string
    const shortName = formData.get("shortName") as string
    const themeColor = formData.get("themeColor") as string
    const backgroundColor = formData.get("backgroundColor") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read the file as a Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Create a zip file
    const zip = new JSZip()

    // Generate favicons using sharp
    for (const size of FAVICON_SIZES) {
      try {
        const resizedImage = await sharp(buffer)
          .resize(size.width, size.height, { fit: "contain", background: backgroundColor })
          .toBuffer()

        zip.file(`${size.name}.${size.format}`, resizedImage)
      } catch (error) {
        console.error(`Error generating favicon for size ${size.width}x${size.height}:`, error)
        throw new Error(`Failed to generate favicon for size ${size.width}x${size.height}`)
      }
    }

    // Generate and add manifest
    const manifest = generateManifest({ name, shortName, themeColor, backgroundColor })
    zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

    // Generate and add browserconfig.xml
    const browserConfig = generateBrowserConfigXml(backgroundColor)
    zip.file("browserconfig.xml", browserConfig)

    // Generate zip buffer
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" })

    // Upload zip to Firebase Storage
    const storageRef = ref(storage, `favicons/${name}/favicon-package.zip`)
    await uploadBytes(storageRef, zipBuffer)
    const downloadUrl = await getDownloadURL(storageRef)

    return NextResponse.json({
      success: true,
      downloadUrl,
    })
  } catch (error) {
    console.error("Error generating favicons:", error)
    return NextResponse.json(
      { error: "Failed to generate favicons", details: (error as Error).message },
      { status: 500 },
    )
  }
}

