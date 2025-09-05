import { ApiCategoryResponse, ApiSubcategoryResponse, ApiProductResponse } from './types';

const API_BASE_URL = 'https://hoe-be.onrender.com/api';

// Admin token - in a real app, this should be stored securely and managed via auth context
const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGI2ZGI5YTk3OWFkZjEyZTQ2ZjI3MzQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGhvdXNlb2Zldm9sdmUuaW4iLCJuYW1lIjoiQW51cmFnIiwiaWF0IjoxNzU3MDQ4MjIwLCJleHAiOjE3NTc2NTMwMjB9.rOgslF_1qB5stse0WeILXiZ3CiX7vCXAvEE8x35hN80';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${ADMIN_TOKEN}`,
};

export async function getCategories(brandSlug: string): Promise<ApiCategoryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${brandSlug}/categories`, {
      headers: defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: [] };
  }
}

// Public endpoint: fetch a single product by ID (no admin token required)
export async function getPublicProductById(productId: string): Promise<{ data: any }> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching public product:', error);
    throw error;
  }
}

export async function getSubcategories(brandSlug: string, categorySlug: string): Promise<ApiSubcategoryResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/brands/${brandSlug}/categories/${categorySlug}/subcategories`,
      { headers: defaultHeaders }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch subcategories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return { data: [] };
  }
}

export async function getProductsByCategoryAndSubcategory(
  brandSlug: string,
  categorySlug: string,
  subcategorySlug: string,
  options: { page?: number; limit?: number } = {}
): Promise<ApiProductResponse> {
  try {
    const { page = 1, limit = 20 } = options;
    const url = new URL(
      `${API_BASE_URL}/admin/brands/${brandSlug}/categories/${categorySlug}/subcategories/${subcategorySlug}/products`
    );
    
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [] };
  }
}

// Fetch a single product by ID from the admin endpoint
export async function getProductById(
  brandSlug: string,
  productId: string
): Promise<{ data: any }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/brands/${brandSlug}/products/${productId}`,
      {
        headers: defaultHeaders,
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function getAllProducts(
  brandSlug: string,
  options: { page?: number; limit?: number } = {}
): Promise<ApiProductResponse> {
  try {
    const { page = 1, limit = 20 } = options;
    const url = new URL(`${API_BASE_URL}/admin/brands/${brandSlug}/products`);
    
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [] };
  }
}
