"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X, Clock, MapPin, Phone, Camera } from "lucide-react";
import InputField from "./inputField";

export default function AddMasjidForm() {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    womenSection: false,
    denomination: "sunni",
    prayerTimings: {
      fajr: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
      jummah: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - images.length;
    const newImages = files.slice(0, remainingSlots);
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrayerTimeChange = (prayer: string, time: string) => {
    setFormData((prev) => ({
      ...prev,
      prayerTimings: {
        ...prev.prayerTimings,
        [prayer]: time,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, images });
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6 space-y-8 text-emerald-800">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold leading-none">
          Add New Masjid
        </h1>
        <p className="text-muted-foreground">
          Fill in the details to add a new masjid to our directory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField
              label="Masjid Name"
              isRequired={true}
              id="name"
              name="name"
              placeholder="Enter masjid name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <InputField
              label="Address"
              isRequired={true}
              id="address"
              name="address"
              placeholder="Enter complete address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />

            <InputField
              label="Contact Number"
              isRequired={true}
              id="contact"
              name="contact"
              placeholder="+91 7070707070"
              value={formData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              type="tel"
            />
          </CardContent>
        </Card>

        {/* Prayer Timings */}
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Prayer Timings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(formData.prayerTimings).map(([prayer, time]) => (
                <InputField
                  key={prayer}
                  label={prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                  isRequired={true}
                  id={prayer}
                  name={prayer}
                  type="time"
                  value={time}
                  onChange={(e) =>
                    handlePrayerTimeChange(prayer, e.target.value)
                  }
                  placeholder={`Enter ${prayer} time`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card className="rounded">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-emerald-800">Women Section</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="women-section"
                  checked={formData.womenSection}
                  onCheckedChange={(checked) =>
                    handleInputChange("womenSection", checked as boolean)
                  }
                  className="accent-emerald-600 rounded w-5 h-5"
                />
                <Label htmlFor="women-section" className="text-sm font-normal">
                  This masjid has a dedicated women's section
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-emerald-800">Denomination</Label>
              <RadioGroup
                value={formData.denomination}
                onValueChange={(value) =>
                  handleInputChange("denomination", value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sunni" id="sunni" className="accent:emerald-800" />
                  <Label htmlFor="sunni">Sunni</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shia" id="shia" />
                  <Label htmlFor="shia">Shia</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Images (Maximum 5)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0  transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {images.length < 5 && (
                <div className="aspect-square">
                  <Label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 text-center">
                      Upload Image
                    </span>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Label>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              {images.length}/5 images uploaded. Supported formats: JPG, PNG,
              WebP
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-start space-x-4">
          <Button type="button" variant="outline" className="rounded px-8 cursor-pointer  text-gray-800">
            Cancel
          </Button>
          <Button type="submit" className="px-8 rounded cursor-pointer bg-emerald-800 hover:bg-emerald-700 text-white">
            Add Masjid
          </Button>
        </div>
      </form>
    </div>
  );
}
