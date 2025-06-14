import Link from "next/link";
import MasjidCard from "./masjidCard";

export const mockMasjidData = [
  {
    name: "Jama Masjid",
    address: "Chandni Chowk, Delhi, India",
    image: "https://picsum.photos/200/300",
    distance: "1.2 km",
  },
  {
    name: "Mecca Masjid",
    address: "Charminar Road, Hyderabad, Telangana",
    image: "https://picsum.photos/200/300",
    distance: "3.4 km",
  },
  {
    name: "Haji Ali Dargah",
    address: "Worli, Mumbai, Maharashtra",
    image: "https://picsum.photos/200/300",
    distance: "2.7 km",
  },
  {
    name: "Tipu Sultan Mosque",
    address: "Esplanade, Kolkata, West Bengal",
    image: "https://picsum.photos/200/300",
    distance: "1.9 km",
  },
  {
    name: "Cheraman Juma Masjid",
    address: "Kodungallur, Kerala",
    image: "https://picsum.photos/200/300",
    distance: "5.2 km",
  },
  {
    name: "Nakhoda Masjid",
    address: "Rabindra Sarani, Kolkata, West Bengal",
    image: "https://picsum.photos/200/300",
    distance: "2.1 km",
  },
  {
    name: "Masjid-e-Azam",
    address: "Triplicane, Chennai, Tamil Nadu",
    image: "https://picsum.photos/200/300",
    distance: "4.0 km",
  },
  {
    name: "Masjid Al-Ameen",
    address: "Shivaji Nagar, Bangalore, Karnataka",
    image: "https://picsum.photos/200/300",
    distance: "0.8 km",
  },
  {
    name: "Hazratbal Shrine",
    address: "Srinagar, Jammu and Kashmir",
    image: "https://picsum.photos/200/300",
    distance: "6.5 km",
  },
  {
    name: "Sidi Saiyyed Mosque",
    address: "Lal Darwaja, Ahmedabad, Gujarat",
    image: "https://picsum.photos/200/300",
    distance: "2.3 km",
  },
];

export default function MasjidGrid() {
  return (
    <div className="w-full container mx-auto px-4 py-16">
      <div className="w-full justify-between items-center flex mb-3">
        <p className="text-xl font-semibold text-emerald-800">
          Masjids Near You
        </p>
        <Link
          href="#"
          className="pb-[2px] border-b  border-emerald-800 text-emerald-800 leading-none"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mockMasjidData.map((masjid, index) => (
          <MasjidCard
            key={index}
            address={masjid.address}
            distance={masjid.distance}
            image={masjid.image}
            name={masjid.name}
          />
        ))}
      </div>
    </div>
  );
}
