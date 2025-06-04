import Link from "next/link";
import Container from "./container";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="w-full my-background text-white py-4 border-b border-[#093028] sticky top-0 z-20">
      <Container className="flex w-full justify-between items-center">
        <Link href="/" className="text-coffee-100 text-2xl font-semibold">
          Minar
        </Link>
        <Button className="bg-coffee-100 text-main">Add Masjid</Button>
      </Container>
    </header>
  );
}
