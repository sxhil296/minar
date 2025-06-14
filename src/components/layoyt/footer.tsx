import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { name: "Facebook", icon: <Facebook />, href: "https://facebook.com" },
  { name: "Instagram", icon: <Instagram />, href: "https://instagram.com" },
  { name: "Twitter", icon: <Twitter />, href: "https://twitter.com" },
  { name: "Email", icon: <Mail />, href: "mailto:info@minar.app" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-emerald-600 to-emerald-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo & tagline */}
          <div>
            <p className="text-2xl font-bold text-yellow-300">Minar</p>
            <p className="text-gray-300 mt-2">
              Guiding you to the nearest place of prayer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">
              Connect With Us
            </h3>
            <ul className="flex space-x-4">
              {socialLinks.map(({ name, icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-300 transition-colors"
                    aria-label={name}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-10 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Minar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
