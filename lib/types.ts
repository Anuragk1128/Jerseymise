export interface ProductAttributes {
  size: string[];
  color: string[];
  material: string;
  fit: string;
}

export interface Product {
  _id: string;
  brandId: string;
  categoryId: string | { _id: string; name: string; slug: string };
  subcategoryId: string | { _id: string; name: string; slug: string };
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  priceIncludingTax: number;
  taxAmount: number;
  gstRate: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  tags: string[];
  attributes: ProductAttributes;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ApiResponse<T> {
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ApiCategoryResponse = ApiResponse<Category>;
export type ApiSubcategoryResponse = ApiResponse<Subcategory>;
export type ApiProductResponse = ApiResponse<Product>;

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AuthErrorResponse {
  message?: string;
  error?: string;
}