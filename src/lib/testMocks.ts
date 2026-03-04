import { CartItem, Phone } from "./types";

export const mockPhone: Phone = {
  id: "1",
  brand: "Samsung",
  name: "Galaxy S23",
  basePrice: 999,
  imageUrl: "https://example.com/phone.jpg",
};

export const mockPhones: Phone[] = [
  {
    id: "1",
    brand: "Samsung",
    name: "Galaxy S23",
    basePrice: 999,
    imageUrl: "https://example.com/phone1.jpg",
  },
  {
    id: "2",
    brand: "Apple",
    name: "iPhone 15",
    basePrice: 1199,
    imageUrl: "https://example.com/phone2.jpg",
  },
  {
    id: "3",
    brand: "Google",
    name: "Pixel 8",
    basePrice: 799,
    imageUrl: "https://example.com/phone3.jpg",
  },
];

export const mockCartItem: CartItem = {
  phone: mockPhone,
  selectedColor: "black",
  selectedStorage: "256GB",
  price: 999,
};

export const mockCartItem2: CartItem = {
  phone: { ...mockPhone, id: "2", name: "Galaxy S24" },
  selectedColor: "white",
  selectedStorage: "512GB",
  price: 1199,
};
