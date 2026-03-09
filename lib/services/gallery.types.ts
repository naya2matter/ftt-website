export interface GalleryImage {
  id: number;
  image_url: string;
  title: string;
  description: string;
}

export interface GallerySection {
  hook: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface GalleryData {
  gallery_section: GallerySection[];
}
