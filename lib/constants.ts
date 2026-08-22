export const siteConfig = {
  name: "DSR Event Planner",
  tagline: "Best Event Planner in Kolkata",
  description:
    "DSR Event Planner — 25 years of creating unforgettable weddings, corporate events, and celebrations in Kolkata and beyond. Premium event planning, decor, and destination weddings.",
  url: "https://dsreventplanner.com",
  ogImage: "/images/logo/dsr-events-badge.png",
  founded: 2000,
  yearsOfService: new Date().getFullYear() - 2000,
};

export const contactInfo = {
  phone: ["9830556659", "6289380112"],
  email: "dsrevent06@gmail.com",
  whatsapp: "916289380112",
  address: {
    line1: "Manjushree Apartment, 104A/22V",
    line2: "Karunamoyee Ghat Road",
    city: "Kolkata",
    state: "West Bengal",
    pin: "700082",
    country: "India",
  },
  fullAddress:
    "104A/22V Karunamoyee Ghat Road, Kolkata, India, West Bengal",
  googleMapsUrl: "https://maps.app.goo.gl/BxWzGh7NUvKWkPYW6",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.8!2d88.34!3d22.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI5JzI0LjAiTiA4OMKwMjAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1",
  hours: "Monday – Sunday: 10:00 AM – 9:00 PM",
};

export const socialLinks = {
  instagram: "https://www.instagram.com/dsrevent/",
  facebook:
    "https://www.facebook.com/people/DSR-EVENT/100083355936435/",
  youtube: "https://www.youtube.com/@dsrevent4147",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServices = [
  "Wedding Planning & Destination Weddings",
  "Corporate, Cultural & Social Events",
  "Decor, Theme & Custom Designs",
] as const;
