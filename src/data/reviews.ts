export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productType: string;
  comment: string;
  verified: boolean;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Rajesh Agarwal',
    location: 'Brajarajnagar, Jharsuguda',
    rating: 5,
    date: 'February 2026',
    productType: '10/5 UK Pearl Coated Wedding Cards (800 pcs)',
    comment: 'Exceptional print quality and on-time delivery for my daughter’s wedding! The pearl finish cards with gold foil stamping looked extremely grand. Everyone in our family loved it.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Pradip Kumar Sahu',
    location: 'Jharsuguda Main Market',
    rating: 5,
    date: 'January 2026',
    productType: 'Royal Farman Velvet Scroll Cards (300 pcs)',
    comment: 'Chhabilal Cards is the most trusted wedding card shop in Jharsuguda district. Very respectful staff, great pricing, and fast Odia/Hindi printing proofing.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Sister Mary Joseph (Principal)',
    location: 'St. Thomas Convent School, Sambalpur',
    rating: 5,
    date: 'March 2026',
    productType: 'School Bags, ID Cards & Annual Exercise Copies',
    comment: 'We have been ordering annual school stationery, PVC identity cards, and printed bags from Chhabilal Cards for 4 consecutive years. Unbeatable durability and bulk rates.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Alok Mishra (Advocate)',
    location: 'District Court, Jharsuguda',
    rating: 5,
    date: 'February 2026',
    productType: 'Heavy Duty Lever Arch Box Files & Cobra Files',
    comment: 'Best quality legal record files and cobra clips in western Odisha. Metal shoe edges prevent wear and tear. Highly recommended for law firms and commercial offices.',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Sunita & Deepak Sharma',
    location: 'Rourkela',
    rating: 5,
    date: 'December 2025',
    productType: '3D Mandap Pop-Up Cards (450 pcs)',
    comment: 'The 3D pop up wedding card was the talk of our wedding celebration! Guests kept admiring the craftsmanship. Chhabilal Cards delivered safely packaged to Rourkela.',
    verified: true,
  }
];

export const BUSINESS_INFO = {
  name: 'Chhabilal Cards',
  subtitle: 'The Premier Wedding Cards Designer & Stationery Hub',
  address: 'Rajpur, Baghrachaka, Brajarajnagar, Jharsuguda, Odisha - 768216, India',
  landmark: 'Near Rajpur Chowk, Brajarajnagar',
  phone1: '+91 9348341358',
  phone2: '+91 8047797897',
  email: 'chhabilalcards@gmail.com',
  website: 'https://www.chhabilalcards.co.in/',
  whatsapp: '919348341358',
  hours: 'Monday – Sunday: 8:30 AM to 9:00 PM',
  gstNumber: '21XXXXX1234Z1',
  gstRegisteredSince: '2017',
  rating: 4.8,
  totalReviewsCount: 45,
  districtsServed: ['Jharsuguda', 'Sambalpur', 'Sundargarh', 'Rourkela', 'Bargarh', 'Bhubaneswar', 'All Odisha & Pan India'],
};
