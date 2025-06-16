"use client";

import { MapPin, Eye, Navigation, Users, Flower2 } from "lucide-react";

interface MasjidData {
  name: string;
  address: string;
  image: string;
  distance: string;
}

export default function MasjidCard({
  name,
  address,
  image,
  distance,
}: MasjidData) {
  const handleViewDetails = () => {
    console.log("View details clicked");
  };

  const handleGetDirections = () => {
    console.log("Get directions clicked");
  };

  return (
    <div className="relative w-full h-full bg-coffee-100/30 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-emerald-800 shadow-xl overflow-hidden">
      {/* Masjid Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Distance Badge */}
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
          <span className="text-black text-xs font-medium">{distance}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between h-52">
        <div>
          <h2 className="text-xl font-bold text-black mb-2 leading-tight">
            {name}
          </h2>

          <div className="flex items-start gap-2 mb-1">
            <MapPin className="w-4 h-4 text-black/70 mt-0.5 flex-shrink-0" />
            <p className="text-black/80 text-sm leading-relaxed">{address}</p>
          </div>
           <div className="flex items-start gap-2 mb-1">
            <Users className="w-4 h-4 text-black/70 mt-0.5 flex-shrink-0" />
            <p className="text-black/80 text-sm leading-relaxed">
              Jummah prayers at 1:30 PM
            </p>
          </div>

          <div className="flex items-start gap-2 mb-1">
            <Users className="w-4 h-4 text-black/70 mt-0.5 flex-shrink-0" />
            <p className="text-black/80 text-sm leading-relaxed">
              500 capacity
            </p>
          </div>
          <div className="flex items-start gap-2 mb-1">
            <Flower2 className="w-4 h-4 text-black/70 mt-0.5 flex-shrink-0" />
            <p className="text-black/80 text-sm leading-relaxed">
              Women's Section
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleViewDetails}
            className="flex-1   text-nowrap backdrop-blur-md border border-green-800 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 text-black"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>

          <button
            onClick={handleGetDirections}
            className="flex-1 bg-gradient-to-b from-emerald-800 to-emerald-600 hover:bg-white/35 backdrop-blur-md rounded-md px-4 py-2.5 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </button>
        </div>
      </div>
    </div>
  );
}
