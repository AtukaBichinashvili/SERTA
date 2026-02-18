
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'serta-perfect-sleeper',
    name: { ka: 'Serta Perfect Sleeper®', en: 'Serta Perfect Sleeper®' },
    sizePrices: [
      { size: 90, price: 1200 },
      { size: 120, price: 1550 },
      { size: 160, price: 1890 },
      { size: 180, price: 2150 },
      { size: 200, price: 2400 }
    ],
    type: { ka: 'პრემიუმ ჰიბრიდული მატრასი', en: 'Premium Hybrid Mattress' },
    firmness: 6,
    height: 32,
    warranty: 10,
    category: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    isBestSeller: true,
    description: { 
      ka: 'Perfect Sleeper® არის Serta-ს ლეგენდარული მოდელი, რომელიც შექმნილია ძილის 5 ძირითადი პრობლემის მოსაგვარებლად: წრიალი, მხარდაჭერის ნაკლებობა, ტემპერატურის დისკომფორტი, პარტნიორის მოძრაობა და კიდეების ჩავარდნა.', 
      en: 'The Perfect Sleeper® is Serta\'s legendary model, specifically engineered to solve the 5 most common sleep problems: tossing and turning, lack of support, sleeping too hot, partner disturbance, and mattress sagging.' 
    },
    features: [
      { ka: 'HexCloud™ გრილი გელი', en: 'HexCloud™ Gel Memory Foam' },
      { ka: '1000+ ინდივიდუალური ზამბარა', en: '1000+ Individual Pocket Coils' },
      { ka: 'ანტიბაქტერიული ზედაპირი', en: 'Anti-Microbial Protection' },
      { ka: 'კიდეების გაძლიერებული მხარდაჭერა', en: 'BestEdge® Foam Encasement' }
    ]
  },
  {
    id: 'serta-icomfort-eco',
    name: { ka: 'iComfort Eco™', en: 'iComfort Eco™' },
    sizePrices: [
      { size: 160, price: 2800 },
      { size: 180, price: 3100 },
      { size: 200, price: 3450 }
    ],
    type: { ka: 'ეკო-მეხსიერების ქაფი', en: 'Eco-Memory Foam' },
    firmness: 4,
    height: 30,
    warranty: 12,
    category: 'Memory Foam',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop',
    description: { 
      ka: 'iComfort Eco™ აერთიანებს მდგრადობას და შეუდარებელ კომფორტს. დამზადებულია რეციკლირებული მასალებით და CoolTemp™ ტექნოლოგიით, რომელიც უზრუნველყოფს ოპტიმალურ ტემპერატურას მთელი ღამის განმავლობაში.', 
      en: 'iComfort Eco™ combines sustainability with unparalleled comfort. Featuring recycled materials and CoolTemp™ technology, it delivers advanced cooling and pressure relief for a restorative sleep.' 
    },
    features: [
      { ka: 'Terra Fusion™ მეხსიერების ქაფი', en: 'Terra Fusion™ Memory Foam' },
      { ka: 'CoolTemp™ გამაგრილებელი ქსოვილი', en: 'CoolTemp™ Cooling Cover' },
      { ka: 'ეკოლოგიურად სუფთა მასალები', en: 'Plant-Based & Recycled Content' }
    ]
  },
  {
    id: 'serta-arctic-hybrid',
    name: { ka: 'Serta Arctic® Hybrid', en: 'Serta Arctic® Hybrid' },
    sizePrices: [
      { size: 160, price: 3500 },
      { size: 180, price: 3900 },
      { size: 200, price: 4200 }
    ],
    type: { ka: 'ულტრა-გამაგრილებელი ჰიბრიდი', en: 'Ultra-Cooling Hybrid' },
    firmness: 7,
    height: 34,
    warranty: 15,
    category: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1505693419148-ad3b17692df5?q=80&w=2070&auto=format&fit=crop',
    description: { 
      ka: 'Serta Arctic® გთავაზობთ 15-ჯერ მეტ გამაგრილებელ ძალას. Reactex® სისტემა აქტიურად შთანთქავს სითბოს თქვენი სხეულიდან, რაც უზრუნველყოფს იდეალურ სიგრილეს ყველაზე ცხელ ღამესაც კი.', 
      en: 'Serta Arctic® delivers 15x more cooling power. The Reactex® system actively pulls heat away from your body, ensuring you stay cool and comfortable through the warmest nights.' 
    },
    features: [
      { ka: 'Reactex® 3-დონიანი გაგრილება', en: 'Reactex® 3-Tier Cooling' },
      { ka: 'DeepReaction® ქაფი', en: 'DeepReaction® Max Memory Foam' },
      { ka: 'პრემიუმ ზამბარების სისტემა', en: 'CustomFit™ HD Innerspring' }
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
      admin: 'ადმინი',
      promo: 'უფასო მიწოდება 2000₾-ზე ზემოთ შეკვეთებზე!'
    },
    hero: {
      title: 'აღმოაჩინეთ იდეალური ძილი Serta-სთან ერთად',
      subtitle: 'ამერიკული ხარისხი და შეუდარებელი კომფორტი. 90 წლიანი გამოცდილება თქვენი მშვიდი ძილისთვის.',
      cta: 'იხილეთ კატალოგი',
      finderCta: 'იპოვე შენი მატრასი'
    },
    home: {
      popular: 'პოპულარული მოდელები',
      mattresses: 'ყველა მატრასი',
      trustTitle: 'რატომ ირჩევენ Serta-ს?',
      quizTitle: 'ვერ ირჩევთ?',
      quizSubtitle: 'უპასუხეთ 3 კითხვას და იპოვეთ თქვენი იდეალური მატრასი.',
      quizButton: 'ტესტის დაწყება'
    },
    filter: {
      title: 'ფილტრები',
      size: 'ზომა (სმ)',
      type: 'ტიპი',
      firmness: 'სიმაგრე (1-10)',
      price: 'ფასი',
      clear: 'ფილტრების გასუფთავება',
      search: 'ძებნა',
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
      verified: 'ვერიფიცირებული',
      delivery: 'მიწოდება',
      free: 'უფასო',
      care: 'მოვლა',
      tech: 'ტექნოლოგია',
      back: 'უკან',
      trial: '100 ღამიანი ტესტი',
      financing: '0% განვადება'
    },
    cart: {
      title: 'თქვენი კალათა',
      empty: 'კალათა ცარიელია',
      summary: 'შეკვეთის ჯამი',
      checkout: 'გაფორმება',
      remove: 'წაშლა',
      info: 'გადახდა ხორციელდება საბანკო გადარიცხვით შეკვეთის დადასტურების შემდეგ.',
      subtotal: 'ჯამი',
      total: 'სულ',
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
    }
  },
  en: {
    nav: {
      shop: 'Shop',
      about: 'About Us',
      warranty: 'Warranty',
      blog: 'Blog',
      comparison: 'Comparison',
      admin: 'Admin',
      promo: 'Free nationwide delivery on orders over 2000₾!'
    },
    hero: {
      title: 'Discover the Perfect Sleep with Serta',
      subtitle: 'American quality and unparalleled comfort. 90 years of expertise for your restorative rest.',
      cta: 'Shop Now',
      finderCta: 'Find Your Match'
    },
    home: {
      popular: 'Popular Models',
      mattresses: 'Our Mattresses',
      trustTitle: 'Why Choose Serta?',
      quizTitle: 'Undecided?',
      quizSubtitle: 'Answer 3 questions to find your perfect sleep system.',
      quizButton: 'Take the Quiz'
    },
    filter: {
      title: 'Filters',
      size: 'Size (cm)',
      type: 'Type',
      firmness: 'Firmness (1-10)',
      price: 'Price',
      clear: 'Clear Filters',
      search: 'Search',
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
      back: 'Back',
      trial: '100 Night Trial',
      financing: '0% Financing'
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      summary: 'Order Summary',
      checkout: 'Checkout',
      remove: 'Remove',
      info: 'Payment is made via bank transfer after order confirmation.',
      subtotal: 'Subtotal',
      total: 'Total',
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
    }
  }
};
