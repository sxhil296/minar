import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Sun, Sunrise, Sunset, Moon } from "lucide-react";
import axios from "axios";

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ElementType;
}

const PrayerTimes: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          "https://api.aladhan.com/v1/timingsByCity",
          {
            params: {
              city: "New Delhi",
              country: "India",
              method: 4,
            },
          }
        );

        const { data } = response.data;
        const timings = data.timings;

        const prayers: PrayerTime[] = [
          { name: "Fajr", time: timings.Fajr, icon: Sunrise },
          { name: "Dhuhr", time: timings.Dhuhr, icon: Sun },
          { name: "Asr", time: timings.Asr, icon: Sun },
          { name: "Maghrib", time: timings.Maghrib, icon: Sunset },
          { name: "Isha", time: timings.Isha, icon: Moon },
        ];

        setPrayerTimes(prayers);

        // Find next prayer
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const nextPrayerTime =
          prayers.find((prayer) => {
            const [hours, minutes] = prayer.time.split(":");
            const prayerMinutes = parseInt(hours) * 60 + parseInt(minutes);
            return prayerMinutes > currentTime;
          }) || prayers[0];

        setNextPrayer(nextPrayerTime);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

//   if (loading) {
//     return (
//       <div className="w-full h-[400px] bg-red-500/50 backdrop-blur-lg rounded-2xl p-6 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//         >
//           <Clock className="w-8 h-8 text-emerald-600" />
//         </motion.div>
//       </div>
//     );
//   }

  return (
    <div className="w-full h-[400px] bg-white/80 backdrop-blur-lg rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10" />

      <div className="relative z-10">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-emerald-900 mb-2">
            Prayer Times
          </h3>
          <p className="text-emerald-700">New Delhi, India</p>
        </div>
        {/* 
        {nextPrayer && (
          <motion.div 
            className="bg-white/50 backdrop-blur rounded-xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-emerald-700 mb-1">Next Prayer</p>
            <div className="flex items-center gap-3">
              <nextPrayer.icon className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="text-xl font-bold text-emerald-900">{nextPrayer.name}</h4>
                <p className="text-emerald-700">{nextPrayer.time}</p>
              </div>
            </div>
          </motion.div>
        )} */}

        <div className="grid grid-cols-2 gap-4">
          {prayerTimes.map((prayer, index) => (
            <motion.div
              key={prayer.name}
              className="flex items-center gap-3 bg-white/30 backdrop-blur rounded-lg p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <prayer.icon className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-emerald-900">
                  {prayer.name}
                </p>
                <p className="text-emerald-700">{prayer.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
