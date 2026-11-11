import photo from "@/assets/koder-imran.png.asset.json";
import photoLight from "@/assets/koder-imran-light.png.asset.json";
export const SITE = {
  name: "Imran",
  brand: "Koder Imran",
  url: "https://koderimran.com",
  role: "Google Ads, Web Analytics & E-commerce Web Specialist",
  email: "koderimran@gmail.com",
  phone: "+8801737919566",
  location: "Khilkhet, Dhaka, Bangladesh",
  portrait: photo.url,
  portraitLight: photoLight.url,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/koderimran/" },
    { label: "Facebook", href: "https://www.facebook.com/koderimran" },
    { label: "Instagram", href: "https://www.instagram.com/koderimran" },
    { label: "X", href: "https://x.com/koderimran" },
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
    slug: "web-analytics",
    title: "Web Analytics & Conversion Tracking",
    short: "Reliable GA4, GTM and conversion tracking that turns customer actions into clear, usable data.",
    answer:
      "I build dependable measurement systems with GA4, Google Tag Manager and platform pixels, tracking the customer journey from first visit to lead or purchase. You get cleaner data, clearer attribution and reporting you can use to make better decisions.",
    outcomes: ["More reliable conversion data", "Clearer customer journey insights", "Reporting built around business goals"],
    deliverables: [
      "GA4 setup, audit and configuration",
      "Google Tag Manager setup and event implementation",
      "E-commerce and lead-generation conversion tracking",
      "Google Ads conversion tracking and enhanced conversions",
      "Meta Pixel, Conversions API and Consent Mode support",
      "Looker Studio dashboards and tracking QA",
    ],
    tools: ["GA4", "Google Tag Manager", "Google Ads", "Meta CAPI", "Looker Studio"],
  },
  {
    slug: "google-ads",
    title: "Google Ads Management & Optimization",
    short: "Strategic Search, Shopping and Performance Max campaigns focused on qualified leads and profitable sales.",
    answer:
      "I plan, launch and continuously optimise Google Ads campaigns around your offer, audience and commercial goals. From account structure and keyword strategy to Shopping feeds, conversion measurement and ongoing optimisation, every decision is guided by performance data.",
    outcomes: ["Better-qualified traffic", "More efficient campaign spend", "Ongoing performance improvements"],
    deliverables: [
      "Google Ads account audit and campaign strategy",
      "Search, Shopping and Performance Max campaign setup",
      "Keyword research, ad copy and audience strategy",
      "Google Merchant Center feed setup and issue resolution",
      "Conversion tracking and enhanced conversions",
      "Search-term reviews, optimisation and performance reporting",
    ],
    tools: ["Google Ads", "Merchant Center", "Keyword Planner", "GA4", "Looker Studio"],
  },
  {
    slug: "shopify",
    title: "Shopify Store Design, Tracking & Growth",
    short: "A polished Shopify storefront supported by accurate tracking and a stronger customer journey.",
    answer:
      "I create and improve Shopify stores with thoughtful storefront design, conversion-focused product and collection pages, useful integrations and reliable analytics. From theme customisation to tracking and performance improvements, the store is built to support sustainable growth.",
    outcomes: ["A clearer shopping experience", "Better visibility into store performance", "A flexible store built to grow"],
    deliverables: [
      "Shopify store setup and theme customisation",
      "Custom sections and storefront improvements",
      "Product, collection and landing-page optimisation",
      "GA4, GTM and e-commerce event tracking",
      "Marketing app and pixel integrations",
      "Store speed, usability and on-page SEO improvements",
    ],
    tools: ["Shopify", "Liquid", "GA4", "Google Tag Manager", "Klaviyo"],
  },
  {
    slug: "wordpress-woocommerce",
    title: "WordPress Website Design, Tracking & Growth",
    short: "Professional WordPress websites and WooCommerce stores designed for usability, visibility and measurable results.",
    answer:
      "I design and develop WordPress business websites and WooCommerce stores, then strengthen them with analytics, conversion tracking and practical optimisation. Whether you need a new website, an online store or improvements to an existing build, the focus stays on performance and a smooth user experience.",
    outcomes: ["A professional, responsive website", "A smoother path from visit to enquiry or purchase", "Clearer insight into website performance"],
    deliverables: [
      "WordPress website and WooCommerce store design",
      "Theme customisation and tailored page layouts",
      "Landing pages, product pages and checkout improvements",
      "GA4, GTM and conversion tracking implementation",
      "Plugin, payment and marketing integrations",
      "Technical SEO, speed and ongoing improvements",
    ],
    tools: ["WordPress", "WooCommerce", "Elementor Pro", "GA4", "Google Tag Manager"],
  },
];

export const WORKS = [
  { name: "Lulu Teaware", url: "http://luluteaware.com/", tag: "E-commerce", img: "https://koderimran.com/wp-content/uploads/2026/01/Lulu-Teaware-1024x615.png" },
  { name: "Dutch Giant", url: "http://dutchgiant.com/", tag: "Business website", img: "https://koderimran.com/wp-content/uploads/2026/01/Dutch-Giant-1024x615.png" },
  { name: "Furniture From Turkey", url: "http://furniturefromturkey.com/", tag: "E-commerce", img: "https://koderimran.com/wp-content/uploads/2026/01/FFT-1024x615.png" },
  { name: "Emi Code", url: "http://emicode.com/", tag: "Agency website", img: "https://koderimran.com/wp-content/uploads/2026/01/Am-I-Responsive-2-1024x615.png" },
  { name: "Theme Skills", url: "http://themeskills.com/", tag: "WordPress", img: "https://koderimran.com/wp-content/uploads/2026/01/Theme-Skills-1024x616.png" },
  { name: "Nova Module", url: "http://novamodule.com/", tag: "Corporate website", img: "https://koderimran.com/wp-content/uploads/2026/01/Nova-Module-1024x615.png" },
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
  { q: "What services does Imran offer?", a: "Imran (Koder Imran) offers Google Ads management, GA4 and Google Tag Manager tracking, Shopify store development, and WordPress / WooCommerce website development for small businesses and e-commerce brands worldwide." },
  { q: "Can you set up GA4 e-commerce and conversion tracking?", a: "Yes. I set up GA4 with Google Tag Manager, full e-commerce events from view_item to purchase, Google Ads conversion tracking, enhanced conversions, Meta Pixel with Conversions API and Consent Mode v2." },
  { q: "Should I choose Shopify or WooCommerce?", a: "Shopify suits brands that want a hosted, low-maintenance store that is quick to launch. WooCommerce suits businesses that want full control, lower monthly fees and deep customisation on WordPress. I build on both and recommend based on your budget and goals." },
  { q: "Do you manage Google Shopping and Performance Max campaigns?", a: "Yes. I set up Google Merchant Center, fix feed and disapproval issues, and run Shopping and Performance Max campaigns optimised for return on ad spend." },
  { q: "How long does a website take?", a: "A landing page usually takes 3–5 days, a business website 1–2 weeks, and a full e-commerce store 2–4 weeks depending on products and features." },
  { q: "Do you work with international clients?", a: "Yes. I am based in Bangladesh and work remotely with clients in the United States, United Kingdom, Germany and other countries, with flexible hours for communication." },
];
