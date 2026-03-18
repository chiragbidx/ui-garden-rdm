// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ─── Sponsors ───────────────────────────────────────────────────────────────
export type SponsorItem = { icon: string; name: string };
export type SponsorsContent = {
  heading: string;
  items: SponsorItem[];
};

// ─── Benefits ───────────────────────────────────────────────────────────────
export type BenefitItem = { icon: string; title: string; description: string };
export type BenefitsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  items: BenefitItem[];
};

// ─── Feature Grid ───────────────────────────────────────────────────────────
export type FeatureItem = { icon: string; title: string; description: string };
export type FeaturesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: FeatureItem[];
};

// ─── Services ───────────────────────────────────────────────────────────────
export type ServiceItem = { title: string; description: string; pro: boolean };
export type ServicesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: ServiceItem[];
};

// ─── Testimonials ───────────────────────────────────────────────────────────
export type TestimonialItem = {
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
};
export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
  reviews: TestimonialItem[];
};

// ─── Team ───────────────────────────────────────────────────────────────────
export type SocialLink = { name: string; url: string };
export type TeamMember = {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialLink[];
};
export type TeamContent = {
  eyebrow: string;
  heading: string;
  members: TeamMember[];
};

// ─── Pricing ────────────────────────────────────────────────────────────────
export type PricingPlan = {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefits: string[];
};
export type PricingContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  priceSuffix: string;
  plans: PricingPlan[];
};

// ─── Contact ────────────────────────────────────────────────────────────────
export type ContactInfoBlock = { label: string; value: string | string[] };
export type ContactContent = {
  eyebrow: string;
  heading: string;
  description: string;
  mailtoAddress: string;
  info: {
    address: ContactInfoBlock;
    phone: ContactInfoBlock;
    email: ContactInfoBlock;
    hours: ContactInfoBlock;
  };
  formSubjects: string[];
  formSubmitLabel: string;
};

// ─── FAQ ────────────────────────────────────────────────────────────────────
export type FaqItem = { question: string; answer: string };
export type FaqContent = {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
};

// ─── Footer ─────────────────────────────────────────────────────────────────
export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };
export type FooterContent = {
  brandName: string;
  columns: FooterColumn[];
  copyright: string;
  attribution: { label: string; href: string };
};

// ─── Navbar ─────────────────────────────────────────────────────────────────
export type NavRoute = { href: string; label: string };
export type NavFeature = { title: string; description: string };
export type NavbarContent = {
  brandName: string;
  routes: NavRoute[];
  featureDropdownLabel: string;
  featureImage: { src: string; alt: string };
  features: NavFeature[];
  signInLabel: string;
  signUpLabel: string;
  dashboardLabel: string;
  githubLink: { href: string; ariaLabel: string };
};

// ─── Root ───────────────────────────────────────────────────────────────────
export type HomeContent = {
  hero: HeroContent;
  sponsors: SponsorsContent;
  benefits: BenefitsContent;
  features: FeaturesContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  team: TeamContent;
  pricing: PricingContent;
  contact: ContactContent;
  faq: FaqContent;
  footer: FooterContent;
  navbar: NavbarContent;
};

// ─── Defaults ───────────────────────────────────────────────────────────────

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "New",
    badgeOuter: "Welcome to StreamNest",
    titleBefore: "Stream the best of",
    titleHighlight: "TV & Movies",
    titleAfter: "on any device.",
    subtitle:
      "Unlimited shows, movies, originals, and more—personalized for you. Build your own streaming experience with StreamNest.",
    primaryCta: { label: "Start Watching", href: "/auth#signup" },
    secondaryCta: { label: "Explore Catalog", href: "#features" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "StreamNest streaming preview",
  },

  // ── Sponsors ─────────────────────────────────────────────────────────────
  sponsors: {
    heading: "Powered by cutting-edge tech",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Drama", name: "Sentry" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Puzzle", name: "Supabase" },
      { icon: "Cookie", name: "Resend" },
      { icon: "Squirrel", name: "Railway" },
    ],
  },

  // ── Benefits ─────────────────────────────────────────────────────────────
  benefits: {
    eyebrow: "Why StreamNest",
    heading: "A complete streaming platform starter",
    description:
      "Built for streaming startups and studios that want a Netflix-quality app with production-grade code and total control.",
    items: [
      {
        icon: "PlaySquare",
        title: "Your Own Netflix",
        description: "Launch with user auth, personalized content, watchlists, and save months of engineering.",
      },
      {
        icon: "MonitorPlay",
        title: "Seamless Playback",
        description: "Lightning-fast streaming with modern UI patterns that users already love.",
      },
      {
        icon: "UserCheck",
        title: "Multi-Profile & Parental Controls",
        description: "Let your family, friends, or housemates stream on custom profiles. Block content with parental controls.",
      },
      {
        icon: "Sparkle",
        title: "Beautiful Everywhere",
        description: "Responsive on any device with polished cards, slick tile grids, and cinematic layouts. Dark mode included.",
      },
    ],
  },

  // ── Features ─────────────────────────────────────────────────────────────
  features: {
    eyebrow: "Platform Features",
    heading: "Everything you need for streaming",
    subtitle:
      "StreamNest is equipped for on-demand video, catalog browsing, and user-driven features—ready for your content library.",
    items: [
      { icon: "Video", title: "HD & 4K Streaming", description: "Crystal-clear playback with adaptive quality." },
      { icon: "ListVideo", title: "My List", description: "Easily save movies and shows for later." },
      { icon: "Users", title: "Multiple Profiles", description: "Everyone gets recommendations and history tailored for them." },
      { icon: "Play", title: "Continue Watching", description: "Pick up where you left off, across any device." },
      { icon: "KeySquare", title: "Secure Auth", description: "Email/password login, password resets, and robust account controls." },
      { icon: "Heart", title: "Personalized Recommendations", description: "Algorithms highlight trending picks just for you." },
    ],
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Streaming Core",
    heading: "What's built-in with StreamNest",
    subtitle:
      "A fast, pragmatic baseline to demo, ship, or scale your streaming startup.",
    items: [
      { title: "User Profiles", description: "Separate preferences, lists, and playback for each household member.", pro: false },
      { title: "Saved & Favorites", description: "Users can bookmark content, rate movies, and manage collections.", pro: false },
      { title: "Watch History & Resume", description: "Never lose your spot. Resume on any device.", pro: false },
      { title: "Streaming-Ready Stack", description: "Next.js, Drizzle ORM, PostgreSQL, and polished UI patterns.", pro: true },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: "What Our Early Users Say",
    heading: "Audience streaming with StreamNest",
    reviews: [
      { image: "/demo-img.jpg", name: "Aarav Shah", role: "Founder, IndieFlicks", comment: "StreamNest let us launch our indie service in days. The landing and dashboard feel world-class.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Maya Patel", role: "Product Lead, FramePlay", comment: "Onboarding and account flows saved us months. Our team could focus on content, not plumbing!", rating: 4.9 },
      { image: "/demo-img.jpg", name: "Daniel Kim", role: "CTO, WatchZone", comment: "Getting started was almost too easy. The Netflix feel is there, but the code is ours.", rating: 4.8 },
      { image: "/demo-img.jpg", name: "Emma Brooks", role: "Growth Lead, Kinetix Movies", comment: "We used StreamNest as a base and our churn went DOWN on launch. Users love the playback UX.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Nikhil Rao", role: "Engineer, ClipHouse", comment: "Docs were clear, features worked, and feedback cycle was fast. Highly recommend.", rating: 4.9 },
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────
  team: {
    eyebrow: "The Creators",
    heading: "Built for streamers, by streamers",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Lead Engineer"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
          { name: "Github", url: "https://github.com/leoMirandaa" },
          { name: "X", url: "https://x.com/leo_mirand4" },
        ],
      },
      {
        imageUrl: "/team2.jpg",
        firstName: "Elizabeth",
        lastName: "Moore",
        positions: ["Product Designer"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
          { name: "X", url: "https://x.com/leo_mirand4" },
        ],
      },
      {
        imageUrl: "/team3.jpg",
        firstName: "David",
        lastName: "Diaz",
        positions: ["Platform Engineer", "Streaming Services"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
          { name: "Github", url: "https://github.com/leoMirandaa" },
        ],
      },
      {
        imageUrl: "/team1.jpg",
        firstName: "Sarah",
        lastName: "Robinson",
        positions: ["Cloud Engineer", "Media Pipelines"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
          { name: "Github", url: "https://github.com/leoMirandaa" },
          { name: "X", url: "https://x.com/leo_mirand4" },
        ],
      },
      {
        imageUrl: "/team2.jpg",
        firstName: "Michael",
        lastName: "Holland",
        positions: ["DevOps Engineer", "CI/CD"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
        ],
      },
      {
        imageUrl: "/team3.jpg",
        firstName: "Zoe",
        lastName: "Garcia",
        positions: ["Frontend Engineer", "Design Systems"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
          { name: "Github", url: "https://github.com/leoMirandaa" },
        ],
      },
      {
        imageUrl: "/team1.jpg",
        firstName: "Evan",
        lastName: "James",
        positions: ["Backend Engineer"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
          { name: "Github", url: "https://github.com/leoMirandaa" },
          { name: "X", url: "https://x.com/leo_mirand4" },
        ],
      },
      {
        imageUrl: "/team2.jpg",
        firstName: "Pam",
        lastName: "Taylor",
        positions: ["Fullstack Engineer", "UX & Playback"],
        socialNetworks: [
          { name: "X", url: "https://x.com/leo_mirand4" },
        ],
      },
    ],
  },

  // ── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    eyebrow: "Plans",
    heading: "Flexible pricing for every streamer",
    subtitle: "Try StreamNest for free or unlock the full power of your own branded streaming app.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Basic",
        popular: false,
        price: 0,
        description: "Perfect for demos, prototypes, and side projects.",
        buttonText: "Start for free",
        benefits: ["1 user profile", "Stream up to 10 hours", "Demo catalog", "Landing & dashboard", "Community support"],
      },
      {
        title: "Pro",
        popular: true,
        price: 29,
        description: "Best for content startups and new streaming brands.",
        buttonText: "Start trial",
        benefits: ["Unlimited profiles", "Full catalog integration", "Favorites & recommendations", "Playback analytics", "Priority support"],
      },
      {
        title: "Studio",
        popular: false,
        price: 129,
        description: "For established studios with custom needs.",
        buttonText: "Contact us",
        benefits: ["SSO/SAML", "Team management", "Advanced analytics", "Dedicated engineer hours", "Custom features"],
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    heading: "Talk to the StreamNest team",
    description:
      "Need advice, help customizing, or a quote for your own streaming vision? We’re here for you.",
    mailtoAddress: "chirag@bidx.ai",
    info: {
      address: { label: "Find us", value: "Remote-first • San Francisco, CA" },
      phone: { label: "Call us", value: "" },
      email: { label: "Email us", value: "chirag@bidx.ai" },
      hours: { label: "Hours", value: ["Monday - Friday", "9AM - 6PM PT"] },
    },
    formSubjects: ["Demo Request", "Feature Inquiry", "Design Review", "Studio Plan", "Custom Integration"],
    formSubmitLabel: "Send inquiry",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      { question: "Can I use StreamNest for my own Netflix clone?", answer: "Yes! StreamNest is designed as a foundation for personal and commercial streaming platforms." },
      { question: "Is there a database or backend included?", answer: "Yes. Drizzle ORM and PostgreSQL are included with production patterns and migrations." },
      { question: "Does the template handle authentication and account management?", answer: "Yes. Email/password auth, sign up, password reset, and admin-ready controls are included." },
      { question: "How customizable is the UI/branding?", answer: "StreamNest is fully open-source—branding, layouts, and components are easy to adapt for your needs." },
      { question: "How do I get started?", answer: "Sign up, explore the dashboard, and begin adding your own video catalog and user flows." },
    ],
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    brandName: "StreamNest",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "chirag@bidx.ai", href: "mailto:chirag@bidx.ai" },
          { label: "Github", href: "#" },
          { label: "Discord", href: "https://discord.com" },
          { label: "Twitter", href: "https://x.com" },
        ],
      },
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact Us", href: "#contact" },
          { label: "FAQ", href: "#faq" },
          { label: "Docs", href: "https://nextjs.org/docs" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "GitHub", href: "https://github.com" },
          { label: "Discord", href: "https://discord.com" },
          { label: "X", href: "https://x.com" },
        ],
      },
    ],
    copyright: "\u00a9 2026 StreamNest. All rights reserved.",
    attribution: { label: "Built on Next.js", href: "https://nextjs.org" },
  },

  // ── Navbar ───────────────────────────────────────────────────────────────
  navbar: {
    brandName: "StreamNest",
    routes: [
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Team" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "Features",
    featureImage: { src: "/demo-img.jpg", alt: "StreamNest preview" },
    features: [
      { title: "User Profiles", description: "Create multiple profiles for your household or team." },
      { title: "Favorites & Recommendations", description: "AI-powered personalization and classic watchlists." },
      { title: "Live & On Demand", description: "Stream anywhere, any time—your way." },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Sign up",
    dashboardLabel: "Dashboard",
    githubLink: { href: "https://github.com", ariaLabel: "View on GitHub" },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}