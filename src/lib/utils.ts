import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const getCityFromGoogle = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  const cityComponent = data.results[0]?.address_components.find(
    (component: any) => component.types.includes("locality")
  );
  return cityComponent?.long_name;
};
