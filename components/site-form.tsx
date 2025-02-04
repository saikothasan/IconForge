"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "./color-picker"

interface SiteFormProps {
  onChange: (values: { name: string; shortName: string; themeColor: string; backgroundColor: string }) => void
}

export function SiteForm({ onChange }: SiteFormProps) {
  const [values, setValues] = useState({
    name: "",
    shortName: "",
    themeColor: "#000000",
    backgroundColor: "#ffffff",
  })

  const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value }
    setValues(newValues)
    onChange(newValues)
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Site Name</Label>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="My Awesome Website"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="shortName">Short Name</Label>
        <Input
          id="shortName"
          value={values.shortName}
          onChange={(e) => handleChange("shortName", e.target.value)}
          placeholder="MyWeb"
        />
      </div>
      <ColorPicker
        label="Theme Color"
        value={values.themeColor}
        onChange={(color) => handleChange("themeColor", color)}
      />
      <ColorPicker
        label="Background Color"
        value={values.backgroundColor}
        onChange={(color) => handleChange("backgroundColor", color)}
      />
    </div>
  )
}

