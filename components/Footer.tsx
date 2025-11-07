import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4A1E1E] text-white relative font-['Playfair_Display']">
      {/* Top description */}
      <div className="text-center text-sm text-gray-200 px-4 py-4 border-b border-[#5a2a2a]">
        At Europa Pizza, we draw inspiration from the Mediterranean's rich history and
        flavors. Our name comes from the <strong>legend of Europa</strong>, the Tyrian
        princess, whisked away by Zeus in the form of a white bull. Europa’s journey
        across the sea symbolizes adventure, culture, and connection.
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/assets/logo.png"
            alt="Europa Pizza Logo"
            width={90}
            height={90}
            className="mx-auto md:mx-0 mb-4"
          />
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-2 text-white">About</h3>
          <p className="text-gray-300 leading-relaxed">
            The Europa Pizza features a savory medley of flavors inspired by Europe’s
            diverse cuisine.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Contact</h3>
          <ul className="space-y-1 text-gray-300">
            <li>75 Dorcas St, South Melbourne, 3205</li>
            <li>
              <Phone className="inline h-4 w-4 mr-1 text-[#8B2635]" />
              1300 827 286
            </li>
            <li>
              <Mail className="inline h-4 w-4 mr-1 text-[#8B2635]" />
              info@europapizza.com.au
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Operating Hours</h3>
          <p className="text-gray-300">
            Monday: 7:00 AM – 3:00 PM <br />
            Tuesday–Sunday: 7:00 AM – 9:30 PM
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#5a2a2a] text-right text-gray-400 text-xs py-4 px-6">
        © {new Date().getFullYear()} All Rights Reserved Europa Pizza
      </div>
    </footer>
  );
}
