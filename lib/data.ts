export type Category = {
  slug: string;
  name: string;
  teluguName: string;
  icon: string;
  description: string;
};

export type Provider = {
  id: string;
  name: string;
  teluguName?: string;
  category: string;
  phone: string;
  area: string;
  experience: string;
  priceRange: string;
  rating: number;
  totalReviews: number;
  available: boolean;
  upiId?: string;
  description: string;
  approved: boolean;
};

export const CATEGORIES: Category[] = [
  { slug: "plumber", name: "Plumber", teluguName: "ప్లంబర్", icon: "🔧", description: "Pipe repairs, leaks, bathroom fitting" },
  { slug: "electrician", name: "Electrician", teluguName: "ఎలక్ట్రీషియన్", icon: "⚡", description: "Wiring, switches, fan/AC installation" },
  { slug: "auto", name: "Auto / Cab", teluguName: "ఆటో / క్యాబ్", icon: "🚗", description: "Local rides and outstation travel" },
  { slug: "purohit", name: "Purohit", teluguName: "పురోహితుడు", icon: "🪔", description: "Puja, marriage, housewarming rituals" },
  { slug: "caterer", name: "Caterer", teluguName: "క్యాటరర్", icon: "🍱", description: "Events, weddings, function food" },
  { slug: "photographer", name: "Photographer", teluguName: "ఫోటోగ్రాఫర్", icon: "📷", description: "Wedding, birthday, event photography" },
];

export const PROVIDERS: Provider[] = [
  {
    id: "1", name: "Ravi Kumar", teluguName: "రవి కుమార్", category: "plumber",
    phone: "9876543210", area: "Bhimavaram", experience: "8 years",
    priceRange: "₹200 - ₹800", rating: 4.5, totalReviews: 34,
    available: true, upiId: "ravi@upi", description: "Expert in all plumbing works. Available 24/7 for emergencies.",
    approved: true,
  },
  {
    id: "2", name: "Suresh Babu", teluguName: "సురేష్ బాబు", category: "electrician",
    phone: "9876543211", area: "Bhimavaram", experience: "10 years",
    priceRange: "₹300 - ₹1000", rating: 4.8, totalReviews: 52,
    available: true, upiId: "suresh@upi", description: "Licensed electrician for home and commercial wiring.",
    approved: true,
  },
  {
    id: "3", name: "Venkat Auto", teluguName: "వెంకట్ ఆటో", category: "auto",
    phone: "9876543212", area: "Bhimavaram", experience: "5 years",
    priceRange: "₹50 - ₹500", rating: 4.3, totalReviews: 89,
    available: true, description: "Local and outstation rides. AC cab available.",
    approved: true,
  },
  {
    id: "4", name: "Pandit Sharma", teluguName: "పండిత్ శర్మ", category: "purohit",
    phone: "9876543213", area: "Bhimavaram", experience: "20 years",
    priceRange: "₹500 - ₹5000", rating: 4.9, totalReviews: 120,
    available: true, description: "All puja, marriage and housewarming ceremonies.",
    approved: true,
  },
  {
    id: "5", name: "Sri Caterers", teluguName: "శ్రీ క్యాటరర్స్", category: "caterer",
    phone: "9876543214", area: "Bhimavaram", experience: "12 years",
    priceRange: "₹150/plate", rating: 4.6, totalReviews: 67,
    available: true, description: "Veg and non-veg catering for all events.",
    approved: true,
  },
  {
    id: "6", name: "Kiran Photography", teluguName: "కిరణ్ ఫోటోగ్రఫీ", category: "photographer",
    phone: "9876543215", area: "Bhimavaram", experience: "7 years",
    priceRange: "₹5000 - ₹25000", rating: 4.7, totalReviews: 45,
    available: true, description: "Wedding and event photography with drone.",
    approved: true,
  },
];
