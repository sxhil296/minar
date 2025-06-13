import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Sunrise, Sunset, Moon, MapPin } from "lucide-react";
import axios from "axios";

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ElementType;
}

interface TimingsType {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Sunset: string;
}

interface DateType {
  gregorian: {
    date: string;
    day: string;
    month: {
      en: string;
    };
    year: string;
  };
  hijri: {
    date: string;
    day: string;
    month: {
      en: string;
    };
    year: string;
  };
}

const PrayerTimes: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [timeToNext, setTimeToNext] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [timings, setTimings] = useState<TimingsType | null>(null);
  const [date, setDate] = useState<DateType | null>(null);

  const calculateTimeToNext = (nextPrayerTime: string) => {
    const now = new Date();
    const [hours, minutes] = nextPrayerTime.split(":");
    const prayerDate = new Date();
    prayerDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    if (prayerDate <= now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }

    const diff = prayerDate.getTime() - now.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hoursLeft}h ${minutesLeft}m`;
  };

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
        setTimings(timings);
        setDate(data.date);

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
        setTimeToNext(calculateTimeToNext(nextPrayerTime.time));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(() => {
      if (nextPrayer) {
        setTimeToNext(calculateTimeToNext(nextPrayer.time));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  if (loading) {
    return (
      <div className="w-full max-w-md lg:max-w-lg mx-auto h-[520px] lg:h-[580px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center relative">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white/80 font-medium text-lg">
            Loading prayer times...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md lg:max-w-lg mx-auto relative">
      <motion.div
        initial={{ opacity: 0, x: -30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="absolute -top-16 -right-2 lg:-right-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl rounded-2xl border border-white/40 px-5 py-3 shadow-2xl z-20 min-w-[140px] lg:min-w-[180px]"
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="space-y-2">
          <p className="text-white font-bold text-base text-center">
            {date?.gregorian.day} {date?.gregorian.month.en}{" "}
            {date?.gregorian.year}
          </p>

          <div className="h-px bg-white/20 my-2"></div>
          <p className="text-white/80 text-sm text-center font-medium">
            {date?.hijri.day} {date?.hijri.month.en} {date?.hijri.year} AH
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="absolute -bottom-12 -left-14 lg:-left-18 bg-gradient-to-br from-yellow-500/35 to-pink-500/25 backdrop-blur-2xl rounded-2xl border border-yellow-300/50 px-5 py-4 shadow-2xl z-20"
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="flex items-center gap-4">
          <div>
            <p className="text-orange-100 font-semibold text-sm">Sunrise</p>
            <p className="text-white font-bold text-base">{timings?.Sunrise}</p>
          </div>
          <div>
            <p className="text-yellow-100 font-semibold text-sm">Sunset</p>
            <p className="text-white font-bold text-base">{timings?.Sunset}</p>
          </div>
        </div>
      </motion.div>

      {/* Main Prayer Times Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="relative h-[520px] lg:h-[580px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative z-10 px-8 lg:px-10 h-full flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mb-6 pt-6"
          >
            <div className="p-3 bg-white/15 rounded-2xl border border-white/20">
              <MapPin className="w-6 lg:w-7 h-6 lg:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                Prayer Times
              </h2>
              <p className="text-white/80 text-sm lg:text-base font-medium">
                New Delhi, India
              </p>
            </div>
          </motion.div>

          {/* Prayer Times List */}
          <div className="flex-1 space-y-3 lg:space-y-4">
            {prayerTimes.map((prayer, index) => (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.7 + index * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                className={`group flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-5 py-3  shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 ${
                  nextPrayer?.name === prayer.name
                    ? "ring-2 ring-yellow-400/60 bg-gradient-to-r from-yellow-500/20 to-pink-500/15 border-yellow-300/40"
                    : ""
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`p-3 rounded-2xl transition-all duration-300 bg-white/15 border border-white/25 group-hover:bg-white/20 `}
                  >
                    <prayer.icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        nextPrayer?.name === prayer.name
                          ? "text-yellow-200"
                          : "text-white/90 group-hover:text-white"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`font-bold text-xl transition-colors duration-300 ${
                        nextPrayer?.name === prayer.name
                          ? "text-yellow-100"
                          : "text-white group-hover:text-white"
                      }`}
                    >
                      {prayer.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      nextPrayer?.name === prayer.name
                        ? "text-yellow-200"
                        : "text-white group-hover:text-white"
                    }`}
                  >
                    {prayer.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrayerTimes;
