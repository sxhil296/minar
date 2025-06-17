"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Clock,
  Users,
  Navigation,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data - in real app this would come from props or API
const masjidData = {
  id: "1",
  name: "Masjid Al-Noor",
  address: "123 Main Street, Downtown District, City, State 12345",
  contactNumber: "+1 (555) 123-4567",
  womenSection: true,
  denomination: "sunni",
  prayerTimings: {
    fajr: "05:30",
    dhuhr: "12:45",
    asr: "15:30",
    maghrib: "18:15",
    isha: "19:45",
    jummah: "13:15",
  },
  images: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5",
  ],
  rating: 4.8,
  totalReviews: 124,
  description:
    "A beautiful and peaceful masjid serving the local Muslim community with daily prayers, Friday sermons, and various Islamic programs.",
};

export default function MasjidDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % masjidData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + masjidData.images.length) % masjidData.images.length
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const prayerNames = {
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    jummah: "Jummah",
  };

  return (
    <div className="w-full   p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[minmax(50px,auto)]">
        <Card className="md:col-span-4   overflow-hidden p-0 rounded">
          <div className="relative h-full rounded">
            <div className="h-full overflow-hidden rounded">
              <img
                src={masjidData.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${masjidData.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {masjidData.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {currentImageIndex + 1} / {masjidData.images.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="md:col-span-2 rounded p-0">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="space-y-3 flex-1">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold leading-tight">
                  {masjidData.name}
                </h1>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant={
                    masjidData.denomination === "sunni"
                      ? "default"
                      : "secondary"
                  }
                >
                  {masjidData.denomination.charAt(0).toUpperCase() +
                    masjidData.denomination.slice(1)}
                </Badge>
                {masjidData.womenSection && (
                  <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    Women Section
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p className="text-base ">{masjidData.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4  flex-shrink-0" />
                  <p className="text-base ">{masjidData.contactNumber}</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {masjidData.description}
              </p>

              {/* Small Image Grid */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Gallery Preview</p>
                <div className="grid grid-cols-4 md:grid-cols-2  gap-2">
                  {masjidData.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-md overflow-hidden border transition-all hover:scale-105 ${
                        currentImageIndex === index
                          ? "border-primary ring-1 ring-primary/30"
                          : "border-muted hover:border-muted-foreground/30"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prayer Timings */}
        <Card className="col-span-6 rounded">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Prayer Timings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(masjidData.prayerTimings).map(
                ([prayer, time]) => (
                  <div
                    key={prayer}
                    className="text-center p-3 rounded bg-emerald-800 transition-colors"
                  >
                    <p className="font-semibold text-sm uppercase tracking-wide text-yellow-300 mb-1">
                      {prayerNames[prayer as keyof typeof prayerNames]}
                    </p>
                    <p className="text-lg font-bold text-white">
                      {formatTime(time)}
                    </p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-2 rounded">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full gap-2 text-sm rounded bg-emerald-800 hover:bg-emerald-700">
              <Navigation className="h-4 w-4" />
              Get Directions
            </Button>
            <Button variant="outline" className="w-full gap-2 text-sm rounded">
              <Phone className="h-4 w-4" />
              Call Masjid
            </Button>
            <Button variant="outline" className="w-full gap-2 text-sm rounded">
              <Share2 className="h-4 w-4" />
              Share Location
            </Button>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="col-span-1 md:col-span-2 rounded">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Interactive map</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <Card className="col-span-2  rounded">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Facilities & Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Denomination</span>
                <Badge variant="outline">
                  {masjidData.denomination.charAt(0).toUpperCase() +
                    masjidData.denomination.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Women Section</span>
                <Badge
                  className={cn(
                    masjidData.womenSection
                      ? "bg-emerald-800 text-yellow-300"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {masjidData.womenSection ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Parking</span>
                <Badge
                  className={cn(
                    masjidData.womenSection
                      ? "bg-emerald-800 text-yellow-300"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {masjidData.womenSection ? "Available" : "Not Available"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
