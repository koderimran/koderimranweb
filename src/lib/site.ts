import photo from "@/assets/koder-imran.png.asset.json";
export const SITE = {
  name: "Imran Hasan",
  brand: "Koder Imran",
  url: "https://coderimranbd.com",
  role: "Google Ads, Web Analytics & E-commerce Web Specialist",
  email: "coderimranbd@gmail.com",
  phone: "+8801737919566",
  location: "Khilkhet, Dhaka, Bangladesh",
  portrait: photo.url,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/al-imran-56b2091b5/" },
    { label: "Facebook", href: "https://www.facebook.com/CoderImranBD" },
    { label: "Instagram", href: "https://www.instagram.com/coderimranpro" },
    { label: "X", href: "https://x.com/CoderImran" },
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  answer: string;
  outcomes: string[];
  deliverables: string[];
  tools: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "google-ads",
    title: "Google Ads Management",
    short: "Search, Shopping & Performance Max campaigns built to lower cost per acquisition.",
    answer:
      "I plan, build and optimise Google Ads campaigns — Search, Shopping, Performance Max and remarketing — with accurate conversion tracking so every dollar is measured against real sales or leads.",
    outcomes: ["Lower cost per lead / sale", "Clean account structure", "Weekly optimisation & reporting"],
    deliverables: [
      "Account audit & keyword research",
      "Search, Shopping & PMax campaign setup",
      "Google Merchant Center feed setup & fixes",
      "Ad copy, extensions & negative keyword lists",
      "Conversion tracking & enhanced conversions",
    ],
    tools: ["Google Ads", "Merchant Center", "Keyword Planner", "Looker Studio"],
  },
  {
    slug: "web-analytics",
    title: "Web Analytics & Tracking",
    short: "GA4, Google Tag Manager and server-side tracking you can actually trust.",
    answer:
      "I set up GA4, Google Tag Manager, Meta Pixel / Conversions API and e-commerce event tracking so you know exactly which channels, pages and campaigns drive revenue.",
    outcomes: ["Accurate conversion data", "Full e-commerce funnel visibility", "Decision-ready dashboards"],
    deliverables: [
      "GA4 property setup & audit",
      "Google Tag Manager container build",
      "E-commerce events (view_item → purchase)",
      "Meta Pixel & Conversions API",
      "Consent Mode v2 & Looker Studio dashboards",
    ],
    tools: ["GA4", "Google Tag Manager", "Meta CAPI", "Looker Studio", "Search Console"],
  },
  {
    slug: "shopify",
    title: "Shopify Store Development",
    short: "Fast, conversion-focused Shopify stores — from theme setup to custom sections.",
    answer:
      "I design and develop Shopify stores using premium or custom themes, optimised product pages, apps and payment setup — built to load fast and convert visitors into buyers.",
    outcomes: ["Launch-ready store", "Higher conversion rate", "Easy for you to manage"],
    deliverables: [
      "Store setup & premium theme customisation",
      "Custom sections with Liquid",
      "Product, collection & checkout optimisation",
      "App integration & payment gateways",
      "Speed and on-page SEO optimisation",
    ],
    tools: ["Shopify", "Liquid", "Shopify Apps", "Klaviyo"],
  },
  {
    slug: "wordpress-woocommerce",
    title: "WordPress & WooCommerce",
    short: "Business websites and WooCommerce stores built with Elementor Pro and clean code.",
    answer:
      "I build responsive WordPress business sites and WooCommerce stores with Elementor Pro, Astra, Divi, Avada or WoodMart — including payment gateways, speed optimisation and technical SEO.",
    outcomes: ["Professional brand presence", "Fully functional online store", "Fast, secure, SEO-ready"],
    deliverables: [
      "Custom design & theme customisation",
      "WooCommerce setup with any payment gateway",
      "Landing pages for ads & lead generation",
      "Speed optimisation (Core Web Vitals)",
      "Redesigns, fixes & ongoing maintenance",
    ],
    tools: ["WordPress", "WooCommerce", "Elementor Pro", "Astra", "Divi", "WoodMart"],
  },
];

export const WORKS = [
  { name: "Lulu Teaware", url: "http://luluteaware.com/", tag: "E-commerce", img: "https://coderimranbd.com/wp-content/uploads/2026/01/Lulu-Teaware-1024x615.png" },
  { name: "Dutch Giant", url: "http://dutchgiant.com/", tag: "Business website", img: "https://coderimranbd.com/wp-content/uploads/2026/01/Dutch-Giant-1024x615.png" },
  { name: "Furniture From Turkey", url: "http://furniturefromturkey.com/", tag: "E-commerce", img: "https://coderimranbd.com/wp-content/uploads/2026/01/FFT-1024x615.png" },
  { name: "Emi Code", url: "http://emicode.com/", tag: "Agency website", img: "https://coderimranbd.com/wp-content/uploads/2026/01/Am-I-Responsive-2-1024x615.png" },
  { name: "Theme Skills", url: "http://themeskills.com/", tag: "WordPress", img: "https://coderimranbd.com/wp-content/uploads/2026/01/Theme-Skills-1024x616.png" },
  { name: "Nova Module", url: "http://novamodule.com/", tag: "Corporate website", img: "https://coderimranbd.com/wp-content/uploads/2026/01/Nova-Module-1024x615.png" },
];

export const REVIEWS = [
  { name: "Ymuller1", country: "Germany", text: "Just incredible! Not just fast but efficient and delivers on his promise. Do not think twice — just engage him. Highly recommended." },
  { name: "Panito_kolpiup", country: "United Kingdom", text: "Imran was exceedingly professional and delivered an amazing product! I will definitely be coming back for additional website services." },
  { name: "Allison_99", country: "United States", text: "Amazing work! Will definitely get the job done. Excellent result! I am more than pleased and will use again." },
  { name: "Kelydoug", country: "Germany", text: "Amazing work! He did a great job and answered all my questions on time. I loved his work. Well done!" },
  { name: "Purnellw", country: "United States", text: "Very good experience. He helped me and gave me a really good service. Great communication and fast delivery." },
];

export const PROCESS = [
  { title: "Discovery call", text: "We discuss your goals, audience and numbers over chat, audio or video." },
  { title: "Strategy & plan", text: "A clear plan: site structure, tracking map or campaign structure — with timeline." },
  { title: "Build & test", text: "Clean development, tracking QA and campaign checks. You review, I refine." },
  { title: "Launch & grow", text: "Go live, monitor data and keep optimising. Ongoing support included." },
];

export const FAQS = [
  { q: "What services does Imran Hasan offer?", a: "Imran Hasan (Koder Imran) offers Google Ads management, GA4 and Google Tag Manager tracking, Shopify store development, and WordPress / WooCommerce website development for small businesses and e-commerce brands worldwide." },
  { q: "Can you set up GA4 e-commerce and conversion tracking?", a: "Yes. I set up GA4 with Google Tag Manager, full e-commerce events from view_item to purchase, Google Ads conversion tracking, enhanced conversions, Meta Pixel with Conversions API and Consent Mode v2." },
  { q: "Should I choose Shopify or WooCommerce?", a: "Shopify suits brands that want a hosted, low-maintenance store that is quick to launch. WooCommerce suits businesses that want full control, lower monthly fees and deep customisation on WordPress. I build on both and recommend based on your budget and goals." },
  { q: "Do you manage Google Shopping and Performance Max campaigns?", a: "Yes. I set up Google Merchant Center, fix feed and disapproval issues, and run Shopping and Performance Max campaigns optimised for return on ad spend." },
  { q: "How long does a website take?", a: "A landing page usually takes 3–5 days, a business website 1–2 weeks, and a full e-commerce store 2–4 weeks depending on products and features." },
  { q: "Do you work with international clients?", a: "Yes. I am based in Bangladesh and work remotely with clients in the United States, United Kingdom, Germany and other countries, with flexible hours for communication." },
];
