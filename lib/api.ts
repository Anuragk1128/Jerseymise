import { ApiCategoryResponse, ApiSubcategoryResponse, ApiProductResponse, RegisterRequest, LoginRequest, AuthResponse, AuthErrorResponse } from './types';
import { User } from './auth-context';

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
export async function getUserProfile(token?: string): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/users/me`, { headers });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
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
// Add to lib/api.ts
export interface GoogleLoginRequest {
  token: string;
}

export async function loginWithGoogle(
  token: string
): Promise<{ success: boolean; data?: { token: string; user: User }; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: errorData.message || 'Google login failed' 
      };
    }

    const data = await response.json();
    return { 
      success: true, 
      data: {
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar
        }
      }
    };
  } catch (error) {
    console.error('Google login error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to the server. Please try again.' 
    };
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

// Auth API functions
export async function sendOTP(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/send-otp`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || errorData.error || 'Failed to send OTP'
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'OTP sent to email'
    };
  } catch (error) {
    console.error('Send OTP error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

export async function registerUser(data: RegisterRequest): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: AuthErrorResponse = await response.json();
      return {
        success: false,
        error: errorData.message || errorData.error || 'Registration failed'
      };
    }

    const authData: AuthResponse = await response.json();
    return {
      success: true,
      data: authData
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

export async function loginUser(data: LoginRequest): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: AuthErrorResponse = await response.json();
      return { 
        success: false, 
        error: errorData.message || errorData.error || 'Login failed' 
      };
    }

    const responseData: AuthResponse = await response.json();
    return { 
      success: true, 
      data: {
        token: responseData.token,
        user: {
          id: responseData.user.id,
          name: responseData.user.name,
          email: responseData.user.email,
          role: responseData.user.role
        }
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'Network error. Please try again.' 
    };
  }
}

export async function addToWishlist(
  productId: string,
  token: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to add to wishlist' 
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return { 
      success: false, 
      error: 'Network error. Please try again.' 
    };
  }
}
