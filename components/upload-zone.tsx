"use client"

import { useState, useCallback } from "react"
import { Upload, Loader2, Download, Copy, ImageIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SiteForm } from "./site-form"
import { generateHtmlCode } from "@/lib/favicon-generator"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FileSaver from "file-saver"

export default function UploadZone() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [siteInfo, setSiteInfo] = useState({
    name: "",
    shortName: "",
    themeColor: "#000000",
    backgroundColor: "#ffffff",
  })
  const [htmlCode, setHtmlCode] = useState<string>("")
  const [downloadUrl, setDownloadUrl] = useState<string>("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      try {
        setIsUploading(true)
        setUploadProgress(0)
        const file = acceptedFiles[0]

        // Set preview image
        setPreviewImage(URL.createObjectURL(file))

        const formData = new FormData()
        formData.append("file", file)
        formData.append("name", siteInfo.name)
        formData.append("shortName", siteInfo.shortName)
        formData.append("themeColor", siteInfo.themeColor)
        formData.append("backgroundColor", siteInfo.backgroundColor)

        const response = await fetch("/api/generate", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to generate favicons")
        }

        const data = await response.json()

        setHtmlCode(generateHtmlCode(siteInfo))
        setDownloadUrl(data.downloadUrl)
        toast.success("Favicons generated successfully!")
      } catch (error) {
        console.error("Error:", error)
        toast.error("Failed to generate favicons")
      } finally {
        setIsUploading(false)
        setUploadProgress(100)
      }
    },
    [siteInfo],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  const handleDownload = () => {
    if (downloadUrl) {
      FileSaver.saveAs(downloadUrl, "favicon-package.zip")
    }
  }

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlCode)
    toast.success("HTML code copied to clipboard")
  }

  return (
    <div className="grid gap-6">
      <SiteForm onChange={setSiteInfo} />

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted"
        }`}
      >
        <input {...getInputProps()} />
        <div className="max-w-sm mx-auto space-y-4">
          <h2 className="text-xl font-semibold">Drop your favicon image here</h2>
          {previewImage ? (
            <img src={previewImage || "/placeholder.svg"} alt="Preview" className="mx-auto w-32 h-32 object-contain" />
          ) : (
            <ImageIcon className="mx-auto w-32 h-32 text-muted-foreground" />
          )}
          <div className="flex gap-4 justify-center">
            <Button disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {isUploading && <Progress value={uploadProgress} className="w-full" />}

      {htmlCode && (
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="html" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Implementation Code</h3>
              <Button onClick={handleCopyHtml} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy HTML
              </Button>
            </div>
            <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
              <code>{htmlCode}</code>
            </pre>
          </TabsContent>
          <TabsContent value="preview" className="space-y-4">
            <h3 className="text-lg font-semibold">Favicon Preview</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <img src={previewImage || "/placeholder.svg"} alt="16x16" className="w-16 h-16 mx-auto" />
                <p className="mt-2">16x16</p>
              </div>
              <div className="text-center">
                <img src={previewImage || "/placeholder.svg"} alt="32x32" className="w-32 h-32 mx-auto" />
                <p className="mt-2">32x32</p>
              </div>
              <div className="text-center">
                <img src={previewImage || "/placeholder.svg"} alt="180x180" className="w-32 h-32 mx-auto" />
                <p className="mt-2">180x180</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {downloadUrl && (
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Favicon Package
        </Button>
      )}
    </div>
  )
}

