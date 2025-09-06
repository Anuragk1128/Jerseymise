import { ApiCategoryResponse, ApiSubcategoryResponse, ApiProductResponse } from './types';

const API_BASE_URL = 'https://hoe-be.onrender.com/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function getCategories(brandSlug: string): Promise<ApiCategoryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${brandSlug}/categories`, {
      headers: { 'Accept': 'application/json' }
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
      { headers: { 'Accept': 'application/json' } }
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
      `${API_BASE_URL}/brands/${brandSlug}/categories/${categorySlug}/subcategories/${subcategorySlug}/products`
    );
    
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
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

// Fetch a single product by ID from the public endpoint
export async function getProductById(
  productId: string
): Promise<{ success: boolean; data: any }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}`,
      {
        headers: { 'Accept': 'application/json' },
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
    const url = new URL(`${API_BASE_URL}/brands/${brandSlug}/products/all`);
    
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
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
