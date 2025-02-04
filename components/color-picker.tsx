"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
}

const predefinedColors = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#800080",
  "#008080",
  "#000080",
]

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <div className="w-4 h-4 rounded-sm mr-2 border" style={{ backgroundColor: value }} />
            {value}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-sm border ${color === value ? "ring-2 ring-primary" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onChange(color)
                    setIsOpen(false)
                  }}
                />
              ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="custom-color">Custom color</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-color"
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full"
                />
                <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

