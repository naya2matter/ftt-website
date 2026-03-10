export interface HomeMediaItem {
  url: string;
}

export interface HomeSiteMetadata {
  name: string;
  description: string;
  keywords: string;
  logo: string;
  favicon: string;
}

export interface HomeFooterContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface HomeFooterSocialLink {
  platform: string;
  url: string;
  is_active: number;
}

export interface HomeFooter {
  contact_info: HomeFooterContactInfo;
  social_links: HomeFooterSocialLink[];
}

export interface HomeHeroSection {
  subheader: string;
  title: string;
  description_html: string;
  button1_text: string;
  button1_link: string;
  button2_text: string;
  button2_link: string;
  media: HomeMediaItem[];
}

export interface HomeTestimonial {
  text: string;
  name: string;
  position: string;
  duration_seconds: number;
  sort_order: number;
  is_active: number;
  video_media_id: number;
  video: {
    url: string;
  };
}

export interface HomeTestimonialsSection {
  hook: string;
  title: string;
  description: string;
  testimonials: HomeTestimonial[];
}

export interface HomeCTA {
  id: number;
  title: string;
  description: string;
  button1_text: string;
  button1_link: string;
  button2_text: string | null;
  button2_link: string | null;
}

export interface HomeWhyUsItem {
  name: string;
  icon: string;
}

export interface HomeWhyUsSection {
  items: HomeWhyUsItem[];
}

export interface HomeRequirement {
  text: string;
}

export interface HomeOfferSection {
  hook: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  image: string;
  requirements: HomeRequirement[];
}

export interface HomeTemptationSection {
  hook: string;
  title: string;
  description: string;
  button1_text: string;
  button1_link: string;
  button2_text: string;
  button2_link: string;
  image: string;
  requirements: HomeRequirement[];
}

export interface HomeBenefitsSection {
  title: string;
  hook: string;
  items: { text: string }[];
}

export interface HomeNeedsSection {
  title: string;
  hook: string;
  items: { text: string }[];
}

export interface HomeFounderSection {
  hook_text: string;
  title: string;
  description: string;
  video_media_id: number;
  video: {
    url: string;
  };
}

export interface HomeData {
  site_metadata: HomeSiteMetadata;
  footer: HomeFooter;
  hero_section: HomeHeroSection;
  testimonials_section: HomeTestimonialsSection;
  ctas: HomeCTA[];
  why_us_section: HomeWhyUsSection;
  offer_section: HomeOfferSection;
  temptation_section: HomeTemptationSection;
  benefits_section: HomeBenefitsSection;
  needs_section: HomeNeedsSection;
  founder_section: HomeFounderSection;
}
