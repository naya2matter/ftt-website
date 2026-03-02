export interface SiteMetadata {
  id?: number;
  name: string;
  description: string;
  keywords: string;
  logo: string;
  favicon: string;
  logo_alt_text?: string;
  logo_title?: string;
  favicon_alt_text?: string;
  favicon_title?: string;
}

export interface SiteMetadataResponse {
  success: boolean;
  message: string;
  data: {
    original: {
      success: boolean;
      message: string;
      data: {
        name: string;
        description: string;
        keywords: string;
        logo: string;
        favicon: string;
      };
    };
  };
}

export interface SiteMetadataUpdateResponse {
  success: boolean;
  message: string;
  data: any;
}
