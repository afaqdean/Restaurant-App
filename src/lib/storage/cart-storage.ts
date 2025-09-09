import { SessionCart } from "@/types/cart";

/**
 * Shared in-memory cart storage
 * In production, this should be replaced with Redis or a database
 */
class CartStorage {
  private storage = new Map<string, SessionCart>();

  get(cartKey: string): SessionCart | undefined {
    return this.storage.get(cartKey);
  }

  set(cartKey: string, cart: SessionCart): void {
    this.storage.set(cartKey, cart);
  }

  delete(cartKey: string): boolean {
    return this.storage.delete(cartKey);
  }

  has(cartKey: string): boolean {
    return this.storage.has(cartKey);
  }

  clear(): void {
    this.storage.clear();
  }

  // Get all cart keys (useful for debugging)
  keys(): string[] {
    return Array.from(this.storage.keys());
  }

  // Get cart count (useful for debugging)
  size(): number {
    return this.storage.size;
  }
}

// Export a singleton instance
export const cartStorage = new CartStorage();
