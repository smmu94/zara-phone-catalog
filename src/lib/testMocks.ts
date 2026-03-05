import { CartItem, ColorOption, Phone, PhoneDetail, StorageOption } from "./types";

/* PHONES LIST MOCKS */
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

/* PHONE DETAILS MOCKS */

export const mockColorOptions: ColorOption[] = [
  { name: "Black", hexCode: "#000000", imageUrl: "/black.jpg" },
  { name: "White", hexCode: "#FFFFFF", imageUrl: "/white.jpg" },
  { name: "Blue", hexCode: "#0000FF", imageUrl: "/blue.jpg" },
];

export const mockStorageOptions: StorageOption[] = [
  { capacity: "128GB", price: 999 },
  { capacity: "256GB", price: 1099 },
  { capacity: "512GB", price: 1199 },
];

export const mockPhoneDetail: PhoneDetail = {
  id: "1",
  brand: "Apple",
  name: "iPhone 15",
  basePrice: 999,
  description: "Latest iPhone",
  specs: {
    screen: " 6.1-inch Super Retina XDR display",
    resolution: "2532 x 1170 pixels",
    processor: "Apple A16 Bionic chip",
    mainCamera: "48MP main camera",
    selfieCamera: "12MP front camera",
    battery: "3279mAh",
    os: "iOS 16",
    screenRefreshRate: "120Hz"
  },
  colorOptions: mockColorOptions,
  storageOptions: mockStorageOptions,
  rating: 0,
  similarProducts: []
};

/* CART MOCKS */

export const mockCartItem: CartItem = {
  phone: mockPhoneDetail,
  selectedColor: "black",
  selectedStorage: "256GB",
  price: 999,
};

export const mockCartItem2: CartItem = {
  phone: { ...mockPhoneDetail, id: "2", name: "Galaxy S24" },
  selectedColor: "white",
  selectedStorage: "512GB",
  price: 1199,
};
