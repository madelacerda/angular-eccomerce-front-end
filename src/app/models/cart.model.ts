export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  product: string;
  nombre: string;
  precio: number;
  cantidad: number;
  id: number;
}
