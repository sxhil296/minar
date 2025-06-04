"use client";
import { Calendar, Clock } from "lucide-react";
import Container from "../layoyt/container";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = [
    { name: "Fajr", time: "5:30 AM", status: "completed" },
    { name: "Dhuhr", time: "12:45 PM", status: "completed" },
    { name: "Asr", time: "4:20 PM", status: "current" },
    { name: "Maghrib", time: "6:55 PM", status: "upcoming" },
    { name: "Isha", time: "8:30 PM", status: "upcoming" },
  ];

  const nextPrayer = prayerTimes.find(
    (prayer) => prayer.status === "current" || prayer.status === "upcoming"
  );
  return (
    <section className="w-full min-h-screen my-background">
      <Container className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* left */}
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-left text-coffee-100">
            Guiding you to the <br /> nearest place of prayer.
          </h1>
        </div>
        {/* right */}
        <div className="w-full">
          <Card className="bg-[#093028]/40 border-[#093028] backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-600/20 text-green-400 border-green-600/30"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="text-white font-semibold">
                    Today's Prayer Times
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Current Time</p>
                  <p className="text-white font-mono text-lg">
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={prayer.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-main/30"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        prayer.status === "completed"
                          ? "bg-green-500"
                          : prayer.status === "current"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    <span className="text-white font-medium">
                      {prayer.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 font-mono">
                      {prayer.time}
                    </span>
                    {prayer.status === "current" && (
                      <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs">
                        Next
                      </Badge>
                    )}
                    {prayer.status === "completed" && (
                      <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
