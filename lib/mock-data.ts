export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  subcategory: string
  description: string
  features: string[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  rating: number
  reviewCount: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface Address {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

export const categories = [
  { id: "men", name: "Men", subcategories: ["sportswear", "tshirts", "gym-tshirts"] },
  { id: "women", name: "Women", subcategories: ["sportswear", "tshirts", "gym-tshirts"] },
  { id: "equipment", name: "Equipment", subcategories: ["weights", "cardio", "accessories"] },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Performance Training Tank",
    price: 45,
    originalPrice: 60,
    image: "/athletic-tank-top.png",
    images: ["/athletic-tank-front.png", "/athletic-tank-back.png"],
    category: "men",
    subcategory: "tops",
    description:
      "Lightweight, moisture-wicking tank designed for high-intensity training sessions. Made with premium performance fabric that keeps you cool and dry during the most demanding workouts.",
    features: ["Moisture-wicking fabric", "Anti-odor technology", "Flatlock seams", "Quick-dry material"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray", "White"],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "Compression Leggings",
    price: 85,
    image: "/compression-leggings.png",
    images: ["/compression-leggings-front.png", "/compression-leggings-side.png"],
    category: "women",
    subcategory: "bottoms",
    description:
      "High-performance compression leggings with four-way stretch for ultimate comfort and support during any activity.",
    features: ["Four-way stretch", "High waistband", "Side pockets", "Squat-proof", "Compression support"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "Olive"],
    inStock: true,
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: "3",
    name: "Cross Training Shoes",
    price: 120,
    originalPrice: 150,
    image: "/placeholder-ou13c.png",
    images: ["/cross-training-shoes-side.png", "/cross-training-shoes-top.png"],
    category: "men",
    subcategory: "shoes",
    description:
      "Versatile cross-training shoes built for lifting, running, and everything in between. Engineered for stability and performance.",
    features: ["Stable heel", "Breathable mesh", "Durable outsole", "Lightweight design", "Multi-directional grip"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Black/White", "Gray/Blue", "All Black"],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "4",
    name: "Sports Bra - High Support",
    price: 55,
    image: "/high-support-sports-bra.png",
    images: ["/sports-bra-front.png", "/placeholder.svg?height=400&width=400"],
    category: "women",
    subcategory: "tops",
    description:
      "Maximum support sports bra designed for high-impact activities. Features advanced moisture-wicking technology and superior comfort.",
    features: ["Maximum support", "Moisture-wicking", "Adjustable straps", "Removable pads", "Seamless construction"],
    sizes: ["32B", "34B", "36B", "32C", "34C", "36C", "32D", "34D", "36D"],
    colors: ["Black", "White", "Navy", "Pink"],
    inStock: true,
    rating: 4.7,
    reviewCount: 167,
  },
  {
    id: "5",
    name: "Adjustable Dumbbells Set",
    price: 299,
    originalPrice: 399,
    image: "/placeholder-v8xgp.png",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    category: "equipment",
    subcategory: "weights",
    description:
      "Space-saving adjustable dumbbells that replace an entire weight set. Perfect for home gyms with limited space.",
    features: ["5-50 lbs per dumbbell", "Quick adjustment", "Compact design", "Durable construction", "Space-saving"],
    sizes: ["One Size"],
    colors: ["Black/Silver"],
    inStock: true,
    rating: 4.4,
    reviewCount: 45,
  },
  {
    id: "6",
    name: "Yoga Mat - Premium",
    price: 75,
    image: "/premium-yoga-mat.png",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    category: "equipment",
    subcategory: "accessories",
    description:
      "Premium non-slip yoga mat with superior cushioning and grip. Made from eco-friendly materials for sustainable practice.",
    features: ["Non-slip surface", "Extra thick padding", "Eco-friendly", "Easy to clean", "Alignment guides"],
    sizes: ['Standard (68" x 24")'],
    colors: ["Purple", "Teal", "Black", "Pink"],
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: "7",
    name: "Running Shorts - Men's",
    price: 35,
    image: "/mens-running-shorts.png",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    category: "men",
    subcategory: "bottoms",
    description: "Lightweight running shorts with built-in compression liner and multiple pockets for essentials.",
    features: ["Built-in liner", "Multiple pockets", "Reflective details", "Quick-dry fabric", "Anti-chafe design"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray", "Red"],
    inStock: true,
    rating: 4.3,
    reviewCount: 92,
  },
  {
    id: "8",
    name: "Wireless Earbuds - Sport",
    price: 129,
    originalPrice: 179,
    image: "/placeholder-0slux.png",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    category: "equipment",
    subcategory: "accessories",
    description:
      "Sweat-resistant wireless earbuds designed for intense workouts with superior sound quality and secure fit.",
    features: ["Sweat-resistant", "12-hour battery", "Secure fit", "Premium sound", "Quick charge"],
    sizes: ["One Size"],
    colors: ["Black", "White", "Blue"],
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
  },
  // Demo products for Men and Women: sportswear, tshirts, gym-tshirts
  {
    id: "9",
    name: "Men's Sportswear Tee",
    price: 39,
    originalPrice: 49,
    image: "/athletic-tank-top.png",
    images: ["/athletic-tank-front.png", "/athletic-tank-back.png"],
    category: "men",
    subcategory: "sportswear",
    description:
      "Lightweight breathable sportswear tee engineered to keep you cool during training sessions.",
    features: ["Moisture-wicking", "Breathable mesh", "Quick-dry", "Flat seams"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray", "White"],
    inStock: true,
    rating: 4.4,
    reviewCount: 58,
  },
  {
    id: "10",
    name: "Men's Classic T-Shirt",
    price: 29,
    image: "/placeholder-6f5gf.png",
    images: ["/placeholder-ou13c.png", "/placeholder-3cp5y.png"],
    category: "men",
    subcategory: "tshirts",
    description:
      "Soft cotton-blend t-shirt designed for everyday comfort and casual athletic style.",
    features: ["Soft-hand feel", "Durable collar", "Everyday fit"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Blue"],
    inStock: true,
    rating: 4.2,
    reviewCount: 41,
  },
  {
    id: "11",
    name: "Men's Gym T-Shirt",
    price: 34,
    image: "/placeholder-iszfl.png",
    images: ["/placeholder-ou13c.png", "/athletic-tank-front.png"],
    category: "men",
    subcategory: "gym-tshirts",
    description:
      "Performance gym t-shirt with stretch for unrestricted movement and quick-dry comfort.",
    features: ["4-way stretch", "Quick-dry", "Anti-odor"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Olive"],
    inStock: true,
    rating: 4.5,
    reviewCount: 66,
  },
  {
    id: "12",
    name: "Women's Sportswear Tee",
    price: 39,
    image: "/high-support-sports-bra.png",
    images: ["/high-support-sports-bra-front.png", "/sports-bra-front.png"],
    category: "women",
    subcategory: "sportswear",
    description:
      "Breathable training tee tailored for performance with a flattering athletic fit.",
    features: ["Moisture-wicking", "Breathable", "Lightweight"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Pink", "Teal"],
    inStock: true,
    rating: 4.6,
    reviewCount: 52,
  },
  {
    id: "13",
    name: "Women's Classic T-Shirt",
    price: 29,
    image: "/placeholder-3cp5y.png",
    images: ["/placeholder-v8xgp.png", "/placeholder-0slux.png"],
    category: "women",
    subcategory: "tshirts",
    description:
      "Everyday cotton-blend tee with a soft feel and easy silhouette.",
    features: ["Soft cotton blend", "Breathable", "Everyday wear"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Burgundy"],
    inStock: true,
    rating: 4.3,
    reviewCount: 39,
  },
  {
    id: "14",
    name: "Women's Gym T-Shirt",
    price: 34,
    image: "/placeholder-6f5gf.png",
    images: ["/placeholder-ou13c.png", "/compression-leggings-front.png"],
    category: "women",
    subcategory: "gym-tshirts",
    description:
      "Stretchy, sweat-wicking gym tee made for high-intensity sessions.",
    features: ["Stretch fabric", "Quick-dry", "Anti-odor"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Purple", "Gray", "Black"],
    inStock: true,
    rating: 4.5,
    reviewCount: 61,
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "2",
    items: [
      {
        product: products[0],
        quantity: 2,
        selectedSize: "M",
        selectedColor: "Black",
      },
    ],
    total: 90,
    status: "delivered",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
    paymentMethod: "Credit Card ending in 4242",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
]
