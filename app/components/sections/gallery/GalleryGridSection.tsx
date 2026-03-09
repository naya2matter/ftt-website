'use client';

import SectionContainer from '@/app/components/layout/SectionContainer';
import GalleryGrid from '@/app/components/common/GalleryGrid';
import type { GalleryImage, GallerySection } from '@/lib/services/gallery.types';

interface GalleryGridSectionProps {
  data?: GallerySection | null;
}

const fallbackItems = [
  {
    title: "Our Modern Fleet",
    description: "State-of-the-art Amazon Prime branded cabs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArGndlKaqOTua2VbIS-lr1RwfjgT_P8MzM2ouPABqWfLDwwSgpBiibs0T2LOGy76tYnMCz_DZLNoyWEf7p-e8xDUvfLOBDtLIIJpLh1iv6_1h5G0K8TYwG-b0vSXOgv2cEJyJTIi2jGUQuVjueh5OQ7AjmH7qAzc9vbloaR6ubfU5z-XSzAzOSvfNAkHWWMlqrtzxnXrM3ZPIuYYyuD1xlSaWNFoUH5JI66tes6fr7NaD45EhDYa1stpYbrlHsyJS8RagG0TPjMhk",
  },
  {
    title: "Safety First",
    description: "Rigorous pre-trip inspection protocols.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcMXM-0eh0lIXzmoALiDoOkPUru2sK9O1DzFnnNcrojpShdFjo_99OPjm2TUS0sbrB4B07kTNpgtelEIYe1pXtvJDLEXFpD5IrhGaSqJpmus43Qpa1tg-75GA98FD9_lpsUMRCwhJ9GYfVD_7g7jFcaENK6WUbTWv2MBgmpBKl0fp3Xk_PDBwrgA7Vsb1G8__qVlABZZWLtuE3uidbtnukRSLxnkRPonT6z1_AwBz8JI8VhmiLx46UBiYP5IK2wU1ZZiatPPGkYYQ",
  },
  {
    title: "Indianapolis Hub",
    description: "Our world-class operations facility.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbviGochTrUp8JJW5HX5ekhI5E99SgS6Sn0y5LtolMCQFZMaPxLO8-RfTOEKDe_BPm9iYkXZW-h6aSNHEB_q7Jhes50mC4xGd9dK6esfQ38oM8gSRoqvFDcOc1yrb1sltpuy11I6Q_mCR550_IuWTnAwOBhxF_mIz75XeHSg6wk4-Opo3hyFlNr68jyPcT_WTtW2qNCXu2qIO4QK4_aj4-vrztFSjywdBe3SIOFOM4lMIJr_n7y5sDu9C_gVLs35L2xhyGbx6ezBU",
  },
  {
    title: "Expert Drivers",
    description: "Join a team of elite logistics professionals.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSzgQkdeJNFVzHjdPvRkA-I0bx3CS5wrAwJlCEEhM1jyBBPkgvXrJlho6JNa5O_FX8EIs97j6AIXtjJIn-FY8_0e5Pu-pSRAvhcf8thYetnRn2-iBUN0-0LOU3sysId5gSwM75YzbATjFG3faaq8lLKBttW5Ra2BI5-WIkMwcOP2j2DJMuGifPgi-qIjWW9qGRFKS31snfOC5frekGrlY1GobWQh4aKGCU0Rvu5fJpN51hhJK-rcZDaJJCxiBnYWlm_08Co3-wvfg",
  },
  {
    title: "Advanced Tech",
    description: "Cutting-edge navigation and safety systems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjt0O-dQeFzPYKcZsx1epCl1QSEa73p3HIxZTrNeVhQWmZj5w4uaKXSX0dAik4z0YHmDmqcLZehEQsWQOLSHTDUJUKjQ3cD1Y3iepXKhOb_7vxt-OYueWzrfRkUzi4Tn0pGeKSXYScrHOx8trZbSGux29wBCqCved9EJmRriYB66HUYLWvjJwsS8xKBlgeVX3tGHZoD4Sq3U0QP08gIzciGfRzVAmdteoBXojBHynbuVmbRTk1n3_8vkZMeUUo-QRiPXC08w-uRrU",
  },
  {
    title: "Ready to Launch",
    description: "Nightly dispatch from our central logistics hub.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6IODt1d61bCO3pFjokOa_v0K-ECd16_MGEW1_AxtkNO5cvHPKCzgePxfJam889uKhrIBQIoUcGiCb-9HV58gj9v1BfxlPFf6fzvpy4xGeo0Q1PEOiZq32wzHIdpqqonIpchC06WEivEPjChkOzKRYt1fYEgYVqrM7iw5kh0bSvZ9KtYw3lOQwAD2Wpi7je6E4nBrbk2SzIipjb7ZKwLGAMK8jqPEx6msLrXTSuFNvf3nesFr7ceFzc4fPUhmHUehqRvkfTp9r4Gw",
  },
  {
    title: "Team Collaboration",
    description: "A culture built on transparency and support.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJVrITUQyyCrHw_aMiDzbryQ7FfIKD5StH7vsQ-dXuEWHHZ2iRhFkFaSVkWNCSHZGUZ1FvyyfNOUsKkAsCVbWsPOHHmLm66SW1x8HF1a9-wrN7UBRgB6da-fuMpDEqSijFR9jMLGL67iyJ_dyTtBzFGFwA6VDsgjwT5IkGXm_opbM6PmomPYrZwZ2vf4jiMTBtRcGy7XhjgAJoINI5aJsW3uUx8Vu-FHTv_mnLll-KDyrUE3LP5PR8bpuKl4KoJjHaJOB728-QDlc",
  },
];

export default function GalleryGridSection({ data }: GalleryGridSectionProps) {
  const items: { title: string; description: string; image: string }[] =
    data?.images && data.images.length > 0
      ? data.images.map((img: GalleryImage) => ({
          title: img.title,
          description: img.description,
          image: img.image_url,
        }))
      : fallbackItems;

  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 py-12 md:py-16">
      <SectionContainer size="xl" noPaddingY>
      <GalleryGrid items={items} shuffle={true} />
      </SectionContainer>
    </section>
  );
}
