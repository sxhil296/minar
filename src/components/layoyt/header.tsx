import Link from "next/link";

import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="w-full bg-emerald-800  py-4  sticky top-0 z-20">
      <div className="container mx-auto  px-4 flex w-full justify-between items-center">
        <Link href="/" className="text-yellow-300 text-3xl font-bold">
          Minar
        </Link>
        <Button
          className="bg-yellow-300 text-black hover:bg-yellow-300/90 rounded"
          asChild
        >
          <Link href="/add-masjid">Add Masjid</Link>
        </Button>
      </div>
    </header>
  );
}
