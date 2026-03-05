export interface HeroMedia {
  id: number;
  url: string;
  type: "image" | "video";
  mime_type?: string;
  alt_text?: string;
  title?: string;
  sort_order?: number;
}

export interface HeroSection {
  id?: number;
  subheader: string;
  title: string;
  description_html: string;
  button1_text: string;
  button1_link: string;
  button2_text: string;
  button2_link: string;
  media: HeroMedia[];
}

export interface HeroResponse {
  success: boolean;
  message: string;
  data: {
    original: {
      success: boolean;
      message: string;
      data: HeroSection[] | HeroSection;
    };
  };
}

export interface HeroUpdateResponse {
  success: boolean;
  message: string;
  data: {
    original: {
      success: boolean;
      message: string;
      data: HeroSection;
    };
  } | {
    headers: Record<string, any>;
    original: {
      success: boolean;
      message: string;
      data: HeroSection;
    };
    exception: null;
  };
}
