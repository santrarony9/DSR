export const heroImages = [
  { src: "/images/hero/w4.webp", alt: "Wedding decoration by DSR Event Planner" },
  { src: "/images/hero/w25.webp", alt: "Grand wedding setup" },
  { src: "/images/hero/w6.webp", alt: "Elegant wedding venue decor" },
  { src: "/images/hero/h2-img.webp", alt: "Haldi ceremony decoration" },
  { src: "/images/hero/h4-img.webp", alt: "Beautiful haldi setup" },
  { src: "/images/hero/h11.webp", alt: "Event lighting setup" },
  { src: "/images/hero/w15.webp", alt: "Wedding stage design" },
  { src: "/images/hero/w16.webp", alt: "Reception decoration" },
];

export const features = [
  {
    icon: "DollarSign" as const,
    title: "Affordable Prices",
    description:
      "Enjoy high-quality service without breaking the bank—our affordable prices make excellence accessible to everyone.",
  },
  {
    icon: "Users" as const,
    title: "Expert Team",
    description:
      "Our skilled and experienced team delivers results you can trust.",
  },
  {
    icon: "Recycle" as const,
    title: "Sustainable Practices",
    description:
      "Committed to eco-friendly choices that protect our planet for future generations.",
  },
  {
    icon: "Heart" as const,
    title: "Customer Focus",
    description:
      "Putting your needs at the heart of everything we do.",
  },
];

export const aboutPreview = {
  heading: "Welcome to DSR Event Planner",
  paragraphs: [
    "Founded in the year 2000 by Dipankar Ganguly and Subhadeep Chatterjee, DSR Event Planner was established with a vision to elevate celebrations through passion, creativity, and attention to detail. Their leadership and commitment have guided the company's growth for a quarter-century.",
    "Now, as DSR Event Planner marks its 25th year of dedicated service, we proudly reflect on thousands of events curated with excellence, innovation, and trust. For twenty-five years, our team has transformed occasions into memorable experiences—earning the confidence of clients and setting new standards for event planning in Kolkata and beyond.",
  ],
  images: {
    main: "/images/about/wedding-bg.jpg",
    secondary: "/images/about/founders-office.jpg",
  },
};

export const services = [
  {
    icon: "/images/misc/wedding-icon.png",
    title: "Wedding Planning & Destination Weddings",
    description:
      "We specialize in creating unforgettable weddings and breathtaking destination celebrations that truly reflect your love story. From the initial concept and venue selection to décor, entertainment, and guest experiences, every detail is thoughtfully planned and flawlessly executed. We create seamless, unforgettable weddings.",
    image: "/images/services/s1.webp",
  },
  {
    icon: "/images/misc/event-icon.png",
    title: "Corporate, Cultural & Social Events",
    description:
      "We plan and execute corporate, cultural, and social events with precision, creativity, and style. From professional conferences and product launches to cultural festivals and private celebrations, our team ensures every detail is flawlessly managed—creating memorable experiences that leave a lasting impression on your guests.",
    image: "/images/services/s2.webp",
  },
  {
    icon: "/images/misc/paint-icon.png",
    title: "Decor, Theme & Custom Designs",
    description:
      "We bring your vision to life with exceptional décor, creative themes, and custom designs. From floral arrangements and lighting to table settings and stage setups, every detail is carefully crafted to reflect your style and create an unforgettable atmosphere for weddings, corporate events, and cultural celebrations alike.",
    image: "/images/services/s3.webp",
  },
];

export const whyChooseUs = [
  {
    title: "Expertise & Experience",
    description:
      "With years of industry experience, our skilled team brings unparalleled knowledge and creativity to every project.",
  },
  {
    title: "Customized Solutions",
    description:
      "We tailor our services to meet your unique needs and vision, ensuring each outdoor space reflects your personal style.",
  },
  {
    title: "Sustainable Practices",
    description:
      "We prioritize eco-friendly methods and materials, fostering beautiful landscapes that respect the environment.",
  },
];

export const galleryCategories = [
  {
    id: "birthday",
    label: "Birthday & Rituals",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/gallery/birthday/b${i + 1}.webp`,
      alt: `Birthday & ritual event decoration ${i + 1}`,
    })),
  },
  {
    id: "government",
    label: "Central & State Government",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/gallery/government/g${i + 1}.webp`,
      alt: `Government event setup ${i + 1}`,
    })),
  },
  {
    id: "cultural",
    label: "Cultural & Corporate",
    images: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/gallery/cultural/c${i + 1}.webp`,
      alt: `Cultural and corporate event ${i + 1}`,
    })),
  },
  {
    id: "wedding",
    label: "Wedding",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/gallery/wedding/w${i + 1}.webp`,
      alt: `Wedding decoration ${i + 1}`,
    })),
  },
  {
    id: "haldi",
    label: "Haldi & Mehendi",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/gallery/haldi/h${i + 1}.webp`,
      alt: `Haldi and mehendi ceremony ${i + 1}`,
    })),
  },
];

export const testimonials = [
  {
    name: "Priyanka & Abhishek",
    role: "Kolkata",
    rating: 5,
    text: "DSR handled my wedding like a dream. From the mandap design to the music, everything was perfect.",
  },
  {
    name: "Ritesh Jha",
    role: "Brand Manager",
    rating: 5,
    text: "We hired them for our corporate product launch, and it was a flawless experience from start to finish.",
  },
  {
    name: "Ananya & Sourav",
    role: "Kolkata",
    rating: 5,
    text: "From our engagement to the reception, DSR Event Planner made every moment magical. Truly the best in Kolkata!",
  },
];

export const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "2000+", label: "Events Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Venues Covered" },
];

export const aboutPageContent = {
  heading: "About DSR Event Planner",
  subheading: "25 Years of Creating Unforgettable Moments",
  story: [
    "Founded in the year 2000 by Dipankar Ganguly and Subhadeep Chatterjee, DSR Event Planner was established with a vision to elevate celebrations through passion, creativity, and attention to detail.",
    "Based in Tollygunge, Kolkata, we've grown from a small event management firm to one of the most trusted names in event planning across West Bengal. Our expertise spans across personal celebrations, corporate gatherings, and destination events.",
    "Now, as DSR Event Planner marks its 25th year of dedicated service, we proudly reflect on thousands of events curated with excellence, innovation, and trust. For twenty-five years, our team has transformed occasions into memorable experiences.",
    "From intimate birthday parties to grand destination weddings, from corporate seminars to cultural festivals — we bring the same level of dedication, creativity, and professionalism to every event we manage.",
  ],
  values: [
    {
      title: "Passion for Perfection",
      description: "Every detail matters. We obsess over the small things so you don't have to.",
    },
    {
      title: "Client-Centric Approach",
      description: "Your vision is our blueprint. We listen, understand, and deliver beyond expectations.",
    },
    {
      title: "Innovation & Creativity",
      description: "We stay ahead of trends, bringing fresh ideas and unique concepts to every event.",
    },
    {
      title: "Reliability & Trust",
      description: "25 years of consistent service has built a reputation you can count on.",
    },
  ],
};

export const servicesPageContent = {
  heading: "Our Services",
  subheading: "Comprehensive solutions designed to meet your every need",
  detailed: [
    {
      title: "Wedding Planning & Destination Weddings",
      description: "We specialize in creating unforgettable weddings and breathtaking destination celebrations that truly reflect your love story. From the initial concept and venue selection to décor, entertainment, and guest experiences, every detail is thoughtfully planned and flawlessly executed.",
      features: [
        "Complete wedding coordination & timeline management",
        "Venue selection and vendor coordination",
        "Custom mandap and stage design",
        "Destination wedding logistics (Mandarmani, Siliguri & more)",
        "Bridal entry and ceremony choreography",
        "Guest hospitality management",
      ],
      image: "/images/services/s1.webp",
    },
    {
      title: "Corporate, Cultural & Social Events",
      description: "We plan and execute corporate, cultural, and social events with precision, creativity, and style. From professional conferences and product launches to cultural festivals and private celebrations, our team ensures every detail is flawlessly managed.",
      features: [
        "Corporate seminars and conferences",
        "Product launches and brand activations",
        "Cultural festivals and ceremonies",
        "Birthday parties and anniversary celebrations",
        "Award ceremonies and galas",
        "Government and institutional events",
      ],
      image: "/images/services/s2.webp",
    },
    {
      title: "Decor, Theme & Custom Designs",
      description: "We bring your vision to life with exceptional décor, creative themes, and custom designs. From floral arrangements and lighting to table settings and stage setups, every detail is carefully crafted to reflect your style.",
      features: [
        "Thematic floral arrangements and backdrops",
        "Ambient and architectural lighting design",
        "Custom stage and entrance gate design",
        "Table settings and centerpiece design",
        "Photo booth and stall setups",
        "Mehndi art and bangle counter coordination",
      ],
      image: "/images/services/s3.webp",
    },
    {
      title: "Sound, Lighting & Entertainment",
      description: "Create the perfect ambiance with our professional sound and lighting setups. From DJ services to live orchestras, we ensure your event has the right energy and atmosphere.",
      features: [
        "Professional sound system setup",
        "DJ services and music curation",
        "Live orchestra and musical bands",
        "Artist and performer booking",
        "Welcome dance and hostess services",
        "LED screens and projection",
      ],
      image: "/images/hero/h11.webp",
    },
    {
      title: "Photography & Videography",
      description: "Capture every precious moment with our network of professional photographers and videographers who specialize in event documentation.",
      features: [
        "Pre-wedding photography shoots",
        "Cinematic wedding films",
        "Traditional photo coverage",
        "Corporate event documentation",
        "Drone aerial photography",
        "Same-day edit highlights",
      ],
      image: "/images/hero/w25.webp",
    },
    {
      title: "Catering & Hospitality",
      description: "Delight your guests with exquisite culinary experiences. We coordinate with top caterers to provide multi-cuisine menus tailored to your preferences.",
      features: [
        "Multi-cuisine banquet menus",
        "Custom specialty food counters",
        "Live food and chaat stalls",
        "Welcome drink and hospitality setup",
        "Dietary accommodation planning",
        "Bar and beverage management",
      ],
      image: "/images/hero/w4.webp",
    },
  ],
};

export const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Social Gathering",
  "Destination Wedding",
  "Other"
];
