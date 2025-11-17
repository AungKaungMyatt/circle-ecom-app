import { apiClient } from './apiClient'

// ----- Types (adjust to your backend) -----
export type Category = {
  id: string
  name: string
  description?: string
  image?: string
}
export type Product = {
  id: string
  name: string
  shortDescription?: string
  description?: string
  basePrice: number
  images?: string[]
  isFeatured?: boolean
  rating?: number
  variants?: {
    id: string
    name: string
    price: number
    stockQuantity: number
    image?: string
  }[]
}
export type Review = {
  id: string
  productId: string
  rating: number
  comment: string
}
export type Paged<T> = {
  data: T[]
  page?: number
  limit?: number
  total?: number
}

// ----- Helpers -----
function unwrap<T>(p: Promise<{ data: T }>) {
  return p.then((r) => r.data)
}

// ----- API -----
export const api = {
  // Auth
  signin: (email: string, password: string) =>
    unwrap<{ accessToken: string }>(apiClient.post('/auth/signin', { email, password })),
  signup: (p: { email: string; password: string; firstName: string; lastName: string }) =>
    unwrap(apiClient.post('/auth/signup', p)),
  verifyEmail: (email: string, code: string) =>
    unwrap(apiClient.post('/auth/verify-email', { email, code })),
  me: () => unwrap(apiClient.get('/users/profile')),

  // Categories
  listCategories: () => unwrap<Category[]>(apiClient.get('/categories')),

  // Products
  listProducts: (params?: {
    keyword?: string
    categoryId?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    sortBy?: 'price_asc' | 'price_desc' | 'popularity' | 'rating' | 'newest'
    page?: number
    limit?: number
  }) => unwrap<Paged<Product>>(apiClient.get('/products', { params })),
  featuredProducts: (limit = 8) =>
    unwrap<Product[]>(apiClient.get('/products/featured/list', { params: { limit } })),
  productById: (id: string) => unwrap<Product>(apiClient.get(`/products/${id}`)),

  // Reviews
  listReviewsForProduct: (productId: string) =>
    unwrap<Review[]>(apiClient.get(`/reviews/product/${productId}`)),

  // Wishlist (token added by interceptor)
  myWishlist: () => unwrap<Product[]>(apiClient.get('/wishlist')),
  addToWishlist: (productId: string) => unwrap(apiClient.post('/wishlist', { productId })),
  removeFromWishlist: (productId: string) => unwrap(apiClient.delete(`/wishlist/${productId}`)),
  clearWishlist: () => unwrap(apiClient.delete('/wishlist')),
}
