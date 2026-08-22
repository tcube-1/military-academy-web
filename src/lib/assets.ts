import Std1 from '../../public/stdimages/Std_1.jpg';
import Std2 from '../../public/stdimages/Std_2.jpg';
import Std3 from '../../public/stdimages/Std_3.jpg';
import Std4 from '../../public/stdimages/Std_4.jpg';
import Std5 from '../../public/stdimages/Std_5.jpg';
import Std6 from '../../public/stdimages/Std_6.jpg';
import Std7 from '../../public/stdimages/Std_7.jpg';
import Std8 from '../../public/stdimages/Std_8.jpg';

import type { StaticImageData } from 'next/image';

export interface StudentImageItem {
  id: string;
  name: string;
  image: StaticImageData;
}
export interface defencelogo {
  name: string;
  href: string;
  link: string;
}
export const DefenceLogos = [
  {
    name: 'army',
    href: '/logos/army_logo.png',
    link: '',
  },
  {
    name: 'navy',
    href: '/logos/navy_logo.png',
    link: '',
  },
  {
    name: 'airforce',
    href: '/logos/airforce_logo.png',
    link: '',
  },
  {
    name: 'WhatsApp',
    href: '/logos/',
    link: '',
  },
  {
    name: 'YouTube',
    href: '/logos/',
    link: '',
  },
];
export const studentImages: StudentImageItem[] = [
  { id: 'std-1', name: 'Student 1', image: Std1 },
  { id: 'std-2', name: 'Student 2', image: Std2 },
  { id: 'std-3', name: 'Student 3', image: Std3 },
  { id: 'std-4', name: 'Student 4', image: Std4 },
  { id: 'std-5', name: 'Student 5', image: Std5 },
  { id: 'std-6', name: 'Student 6', image: Std6 },
  { id: 'std-7', name: 'Student 7', image: Std7 },
  { id: 'std-8', name: 'Student 8', image: Std8 },
];

export const socialIcons = [
  {
    name: 'Facebook',
    href: '/icons/facebook.webp',
    link: 'https://facebook.com',
  },
  {
    name: 'Instagram',
    href: '/icons/instagram.webp',
    link: 'https://instagram.com',
  },
  {
    name: 'Twitter',
    href: '/icons/twitter.webp',
    link: 'https://twitter.com',
  },
  {
    name: 'WhatsApp',
    href: '/icons/whatsapp.webp',
    link: 'https://wa.me/919876543210',
  },
  {
    name: 'YouTube',
    href: '/icons/youtube.webp',
    link: 'https://youtube.com',
  },
];

{
  /**
   * _______________________ students images _______________________
   * >>comment
   */
}
// src/lib/assets.ts

{
  /**
   * _______________________ images _______________________
   * >>comment
   */
}
export interface ImageAssetItem {
  name: string;
  href: string;
}

// 1. Exact numbers range type definition (1 to 48)
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

// 2. Pad single digits to 2 digits ('01' | '02' ... | '48')
type ZeroPaddedNumber = `0${IntRange<1, 10>}` | `${IntRange<10, 49>}`;

// 3. Exact Key Union: 'Img_01' | 'Img_02' | ... | 'Img_48'
export type ImageKey = `Img_${ZeroPaddedNumber}`;

const TOTAL_IMAGES: number = 48;

// 4. Record<ImageKey, ImageAssetItem> ivvadam valla anni keys suggestion lo kanipistayi
export const imageAssets = Array.from(
  { length: TOTAL_IMAGES },
  (_, index: number) => {
    const id = index + 1;
    const formattedId = id.toString().padStart(2, '0');
    const name = `Img_${formattedId}` as ImageKey;
    const extension = id === 48 ? 'avif' : 'png';
    const href = `/images/${name}.${extension}`;
    return { name, href };
  },
).reduce<Record<ImageKey, ImageAssetItem>>(
  (acc, item) => {
    acc[item.name] = item;
    return acc;
  },
  {} as Record<ImageKey, ImageAssetItem>,
);

export const ribbonMessages = [
  'Admissions Open for NDA 2026 Batch – Secure Your Seat Today and Begin Your Journey Towards Serving the Nation with Confidence.',
  'Over 1,000+ Cadets Successfully Trained with Outstanding Results in NDA, CDS, AFCAT, and SSB Selection Processes.',
  'Learn from Experienced Defence Officers and Expert Faculty with Comprehensive Classroom Training and SSB Interview Mentorship.',
  'Book Your Free Defence Career Counseling Session and Get Personalized Guidance to Choose the Right Entry Path into the Armed Forces.',
  "Join India's Premier Defence Academy with World-Class Training, Modern Infrastructure, and a Proven Track Record of Success.",
  'Complete Preparation for NDA, CDS, AFCAT, CAPF, Agniveer, and SSB Interviews Under One Trusted Defence Training Institute.',
  'Build Leadership, Discipline, Confidence, and Physical Excellence Through Structured Defence-Oriented Training Programs.',
  'Daily Mock Tests, Physical Fitness Sessions, Personality Development, and One-to-One Performance Analysis for Every Aspirant.',
  "Your Dream of Wearing the Uniform Begins Here – Train with India's Most Trusted Defence Mentors and Achieve Your Goal.",
  'Limited Seats Available for the Upcoming NDA 2026 Foundation & Target Batch – Register Now Before Admissions Close.',
];

export const contactInfo = [
  {
    label: 'Phone',
    value: '+91 98765 43210',
  },
  {
    label: 'Email',
    value: 'info@defenceacademy.com',
  },
];

export const clipPaths = {
  arrow: {
    clipPath: 'polygon(24.5% 25%, 67.8% 50%, 67.8% 50%, 24.5% 75%)',
  },
  ribbon: {
    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
  },
  arrowGradient: {
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  },
};

export const navLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Career In Defence',
    href: '/career-in-defence',
  },
  {
    label: 'Our Courses',
    href: '#',
    children: [
      {
        label: 'Intermediate',
        href: '/courses/intermidte',
      },
      {
        label: 'Degree',
        href: '/courses/degree',
      },
      {
        label: 'NDA',
        href: '/courses/nda',
      },
      {
        label: 'Indian Army',
        href: '/courses/army',
      },
      {
        label: 'Indian Navy',
        href: '/courses/navy',
      },
      {
        label: 'Indian Air Force',
        href: '/courses/airforce',
      },
      {
        label: 'Indian Coast Guard',
        href: '/courses/coastguard',
      },
      {
        label: 'IIT',
        href: '/courses/iit',
      },
      {
        label: 'NEET',
        href: '/courses/neet',
      },
    ],
  },
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
];

export const polygon = {
  // Ribbon height 24px (h-6) kabatti 24px offset vaadam
  'right-slant-left-flat':
    '[clip-path:polygon(4%_0%,100%_0%,100%_100%,0%_100%)]',

  // Navbar height 56px (h-14) kabatti 56px offset vaadam
  'right-nav': '[clip-path:polygon(0%_0%,calc(100%-30px)_0%,100%_100%,0_100%)]',

  'landingPage-xl-1':
    '[clip-path:polygon(35%_0%,100%_18%,100%_100%,0%_100%,0%_10%)]',

  'landingPage-xl-2':
    '[clip-path:polygon(0%_0%,100%_0%,98%_100%,0%_100%,0%_20%)]',
};
