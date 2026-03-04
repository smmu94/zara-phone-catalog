export interface Phone {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

export interface CartItem {
  phone: Phone
  selectedColor: string
  selectedStorage: string
  price: number
}