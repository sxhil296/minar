"use client";
import { Clock, MapPin, Search } from "lucide-react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrayerTimes from "../timings";
import Header from "../layoyt/header";
import { getCityFromGoogle } from "@/lib/utils";

export default function HeroSection() {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const city = await getCityFromGoogle(latitude, longitude);
        setCity(city);
        console.log("Detected city:", city);
      });
    }
  }, []);

  return (
    <section className=" pb-10 min-h-[100vh] bg-gradient-to-b from-emerald-800 to-emerald-600 relative overflow-hidden">
      <Header />
      <div className="absolute inset-0 bg-[url('/cover.jpg')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pt-16 md:pt-24">
          <motion.div
            className="md:w-1/2 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Guiding you to the nearest &nbsp;
              <span className="text-yellow-300">place of prayer.</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-emerald-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover prayer times, facilities, and directions to masjids in{" "}
              <br />
              your area.
            </motion.p>

            <motion.div
              className="bg-white p-2 rounded-xl shadow-neomorphic flex items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1 flex items-center gap-2 px-4">
                <MapPin className="text-emerald-600 h-5 w-5" />
                <input type="text" placeholder="Search masjids by location" />
              </div>
              <motion.button
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
                Search
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-end "
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-fit min-w-md md:min-w-lg mr-0 md:mr-12">
              <PrayerTimes city={city || "New Delhi"} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,128L80,133.3C160,139,320,149,480,144C640,139,800,117,960,101.3C1120,85,1280,75,1360,69.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
