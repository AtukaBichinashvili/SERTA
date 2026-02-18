import { Product } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: 'serta-perfect-sleeper',
    name: { ka: 'Serta Perfect Sleeper', en: 'Serta Perfect Sleeper' },
    sizePrices: [
      { size: 90, price: 900 },
      { size: 120, price: 1050 },
      { size: 160, price: 1200 },
      { size: 180, price: 1350 },
      { size: 200, price: 1500 }
    ],
    type: { ka: 'ჰიბრიდული მატრასი', en: 'Hybrid Mattress' },
    firmness: 6,
    height: 30,
    warranty: 10,
    category: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    isBestSeller: true,
    description: { 
      ka: 'Perfect Sleeper შექმნილია ძილის ხუთი ყველაზე გავრცელებული პრობლემის გადასაჭრელად.', 
      en: 'The Perfect Sleeper is designed to solve the five most common sleep problems.' 
    },
    features: [
      { ka: 'წნევის შემცირება', en: 'Pressure relief' },
      { ka: 'ტემპერატურის კონტროლი', en: 'Temperature control' }
    ]
  },
  {
    id: 'serta-icomfort-eco',
    name: { ka: 'iComfort Eco', en: 'iComfort Eco' },
    sizePrices: [
      { size: 160, price: 1800 },
      { size: 180, price: 2000 },
      { size: 200, price: 2200 }
    ],
    type: { ka: 'მეხსიერების ქაფი', en: 'Memory Foam' },
    firmness: 4,
    height: 28,
    warranty: 12,
    category: 'Memory Foam',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop',
    description: { 
      ka: 'ეკოლოგიურად სუფთა მასალებით დამზადებული პრემიუმ მატრასი.', 
      en: 'Premium mattress made with eco-friendly materials.' 
    },
    features: [
      { ka: 'გრილი ძილი', en: 'Cooling technology' },
      { ka: 'მდგრადი მასალები', en: 'Sustainable materials' }
    ]
  },
  {
    id: 'serta-ortho-support',
    name: { ka: 'Ortho Support', en: 'Ortho Support' },
    sizePrices: [
      { size: 90, price: 750 },
      { size: 140, price: 850 },
      { size: 160, price: 950 }
    ],
    type: { ka: 'ორთოპედიული მატრასი', en: 'Orthopedic Mattress' },
    firmness: 9,
    height: 25,
    warranty: 5,
    category: 'Orthopedic',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop',
    description: { 
      ka: 'იდეალურია ზურგის ტკივილის მქონე ადამიანებისთვის.', 
      en: 'Ideal for people with back pain seeking maximum support.' 
    },
    features: [
      { ka: 'ხერხემლის მხარდაჭერა', en: 'Spine alignment' },
      { ka: 'მყარი ზედაპირი', en: 'Firm surface' }
    ]
  }
];

export const TRANSLATIONS = {
  ka: {
    nav: {
      shop: 'მაღაზია',
      about: 'ჩვენს შესახებ',
      warranty: 'გარანტია',
      blog: 'ბლოგი',
      comparison: 'შედარება',
      admin: 'ადმინ პანელი'
    },
    hero: {
      title: 'აღმოაჩინეთ იდეალური ძილი Serta-სთან ერთად',
      subtitle: 'ამერიკული ხარისხი და შეუდარებელი კომფორტი თქვენი საძინებლისთვის.',
      cta: 'იხილეთ კატალოგი'
    },
    home: {
      popular: 'პოპულარული',
      mattresses: 'მატრასები',
      beds: 'საწოლები',
      pillows: 'ორთოპედიული ბალიშები',
      blankets: 'პლედები',
      viewAll: 'ყველას ნახვა'
    },
    filter: {
      title: 'ფილტრები',
      size: 'ზომა (სმ)',
      type: 'ტიპი',
      firmness: 'სიმაგრე (1-10)',
      price: 'ფასი',
      clear: 'ფილტრების გასუფთავება',
      search: 'პროდუქტის ძებნა',
      sortBy: 'სორტირება:',
      bestSellers: 'პოპულარული',
      priceLow: 'ფასი: ზრდადი',
      priceHigh: 'ფასი: კლებადი'
    },
    product: {
      from: 'დან',
      addToCart: 'კალათაში დამატება',
      specifications: 'მახასიათებლები',
      height: 'სიმაღლე',
      warranty: 'გარანტია',
      years: 'წელი',
      bestSeller: 'ბესტსელერი',
      firmnessLabel: 'სიმაგრე',
      cm: 'სმ',
      verified: 'ვერიფიცირებული არჩევანი',
      delivery: 'მიწოდება',
      free: 'უფასო',
      care: 'მოვლის ინსტრუქცია',
      tech: 'ტექნოლოგია',
      back: 'უკან'
    },
    cart: {
      title: 'თქვენი კალათა',
      empty: 'კალათა ცარიელია',
      summary: 'შეკვეთის ჯამი',
      checkout: 'გაფორმება',
      remove: 'წაშლა',
      info: 'გადახდა ხორციელდება საბანკო გადარიცხვით შეკვეთის დადასტურების შემდეგ.',
      subtotal: 'ჯამი',
      total: 'სულ გადასახდელი',
      delivery: 'მიწოდება',
      returnToShop: 'მაღაზიაში დაბრუნება'
    },
    checkout: {
      title: 'შეკვეთის გაფორმება',
      details: 'საკონტაქტო ინფორმაცია',
      address: 'მიწოდების მისამართი',
      firstName: 'სახელი',
      lastName: 'გვარი',
      phone: 'ტელეფონი',
      email: 'ელ-ფოსტა',
      city: 'ქალაქი',
      street: 'მისამართი',
      paymentMethod: 'გადახდის მეთოდი',
      bankTransfer: 'საბანკო გადარიცხვა',
      submit: 'შეკვეთის განთავსება',
      confirmation: 'ჩვენი გუნდი დაგიკავშირდებათ შეკვეთისა და გადახდის დასადასტურებლად.',
      bankDetails: 'საბანკო რეკვიზიტები',
      receiver: 'მიმღები',
      orderRef: 'შეკვეთის ნომერი',
      thanks: 'მადლობა შეკვეთისთვის!',
      backHome: 'მთავარზე დაბრუნება'
    },
    comparison: {
      empty: 'შესადარებელი სია ცარიელია',
      addMore: 'დაამატეთ მოდელები',
      features: 'მახასიათებლები',
      keyFeatures: 'ძირითადი მახასიათებლები',
      viewDetails: 'დეტალურად'
    }
  },
  en: {
    nav: {
      shop: 'Shop',
      about: 'About Us',
      warranty: 'Warranty',
      blog: 'Blog',
      comparison: 'Comparison',
      admin: 'Admin Panel'
    },
    hero: {
      title: 'Discover the Perfect Sleep with Serta',
      subtitle: 'American quality and unparalleled comfort for your bedroom.',
      cta: 'Shop Now'
    },
    home: {
      popular: 'Popular Models',
      mattresses: 'Mattresses',
      beds: 'Beds',
      pillows: 'Orthopedic Pillows',
      blankets: 'Blankets',
      viewAll: 'View All'
    },
    filter: {
      title: 'Filters',
      size: 'Size (cm)',
      type: 'Type',
      firmness: 'Firmness (1-10)',
      price: 'Price',
      clear: 'Clear Filters',
      search: 'Search Products',
      sortBy: 'Sort By:',
      bestSellers: 'Best Sellers',
      priceLow: 'Price: Low to High',
      priceHigh: 'Price: High to Low'
    },
    product: {
      from: 'From',
      addToCart: 'Add to Cart',
      specifications: 'Specifications',
      height: 'Height',
      warranty: 'Warranty',
      years: 'years',
      bestSeller: 'Best Seller',
      firmnessLabel: 'Firmness',
      cm: 'cm',
      verified: 'Verified Choice',
      delivery: 'Delivery',
      free: 'Free',
      care: 'Care & Maintenance',
      tech: 'Technology',
      back: 'Back'
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      summary: 'Order Summary',
      checkout: 'Checkout',
      remove: 'Remove',
      info: 'Payment is made via bank transfer after order confirmation.',
      subtotal: 'Subtotal',
      total: 'Total Amount',
      delivery: 'Delivery',
      returnToShop: 'Return to Shop'
    },
    checkout: {
      title: 'Checkout',
      details: 'Contact Details',
      address: 'Delivery Address',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      email: 'Email',
      city: 'City',
      street: 'Street Address',
      paymentMethod: 'Payment Method',
      bankTransfer: 'Bank Transfer',
      submit: 'Place Order',
      confirmation: 'Our team will contact you to confirm your order and payment.',
      bankDetails: 'Bank Details',
      receiver: 'Receiver',
      orderRef: 'Order Reference',
      thanks: 'Thank you for your order!',
      backHome: 'Back to Home'
    },
    comparison: {
      empty: 'Comparison list is empty',
      addMore: 'Add models to compare',
      features: 'Features',
      keyFeatures: 'Key Features',
      viewDetails: 'View Details'
    }
  }
};
