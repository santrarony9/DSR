import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Lock } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Settings from "@/lib/models/Settings";

export default async function Footer() {
  // Fetch real contact data from MongoDB
  let phone = "+91 9830556659";
  let email = "dsrevent06@gmail.com";
  let address = "104A/22V Karunamoyee Ghat Road, Kolkata, West Bengal 700082";

  try {
    await connectToDatabase();
    const settings = await Settings.findOne();
    if (settings) {
      if (settings.phone) phone = settings.phone;
      if (settings.email) email = settings.email;
      if (settings.address) address = settings.address;
    }
  } catch (error) {
    console.log("Database connection failed, using fallback contact data");
  }

  return (
    <footer className="bg-[var(--color-primary)] text-[#FAFAF5] pt-12 pb-6 border-t-4 border-[#C8A96E]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block bg-white/90 p-2 rounded">
              <Image
                src="/images/logo/dsr-logo.png"
                alt="DSR Event Planner Logo"
                width={110}
                height={36}
                className="object-contain"
              />
            </Link>
            <p className="opacity-90 leading-relaxed text-sm">
              DSR Event Planner is your premier partner for creating unforgettable events in Kolkata. We bring your vision to life with elegance and precision.
            </p>
            <div className="flex space-x-4 font-bold text-sm">
              <a href="#" className="hover:text-[#C8A96E] transition-colors">IG</a>
              <a href="#" className="hover:text-[#C8A96E] transition-colors">FB</a>
              <a href="#" className="hover:text-[#C8A96E] transition-colors">YT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-bricolage mb-4 text-[#C8A96E]">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["Home", "About", "Services", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold font-bricolage mb-4 text-[#C8A96E]">Our Services</h4>
            <ul className="space-y-3 text-sm">
              {["Wedding Planning", "Corporate Events", "Social Gatherings"].map((service) => (
                <li key={service} className="opacity-90">{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold font-bricolage mb-4 text-[#C8A96E]">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-3 shrink-0 mt-0.5 text-[#C8A96E]" size={16} />
                <span className="opacity-90">{address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 shrink-0 text-[#C8A96E]" size={16} />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  {phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 shrink-0 text-[#C8A96E]" size={16} />
                <a href={`mailto:${email}`} className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  {email}
                </a>
              </li>
              <li className="flex items-center pt-2 mt-2 border-t border-white/10">
                <Lock className="mr-3 shrink-0 text-[#C8A96E]" size={16} />
                <Link href="/admin/login" className="hover:text-[#C8A96E] transition-colors opacity-90 hover:opacity-100">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs opacity-70 space-y-3 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} DSR Event Planner. All rights reserved.</p>
          <div className="flex items-center gap-4 pr-0 md:pr-24">
            <p>
              Developed and Maintain by - <a href="#" className="font-semibold hover:text-[#C8A96E] transition-colors">Dreamline Production</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
