const API_BASE_URL = 'https://hoe-be.onrender.com/api';

export interface SearchResult {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  brand: {
    slug: string;
  };
  description?: string;
  category?: string;
  subcategory?: string;
  inStock?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  rating?: number;
  numReviews?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export async function searchProducts(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
