import { mockCartItem, mockCartItem2 } from "@/lib/testMocks";
import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should initialize with empty items", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
  });

  it("should add item to cart", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockCartItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockCartItem);
    expect(result.current.totalItems).toBe(1);
  });

  it("should add multiple items to cart", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockCartItem);
      result.current.addItem(mockCartItem2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
  });

  it("should remove item from cart", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockCartItem);
      result.current.addItem(mockCartItem2);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeItem("1");
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].phone.id).toBe("2");
    expect(result.current.totalItems).toBe(1);
  });

  it("should persist items to localStorage", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockCartItem);
    });

    const stored = localStorage.getItem("cart");
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual([mockCartItem]);
  });

  it("should load items from localStorage on init", () => {
    localStorage.setItem("cart", JSON.stringify([mockCartItem, mockCartItem2]));

    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
  });

  it("should throw error when useCart is used without CartProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => useCart());
    }).toThrow("useCart must be used inside CartProvider");

    consoleSpy.mockRestore();
  });

  it("should update localStorage when items change", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockCartItem);
    });

    let stored = JSON.parse(localStorage.getItem("cart")!);
    expect(stored).toHaveLength(1);

    act(() => {
      result.current.addItem(mockCartItem2);
    });

    stored = JSON.parse(localStorage.getItem("cart")!);
    expect(stored).toHaveLength(2);

    act(() => {
      result.current.removeItem("1");
    });

    stored = JSON.parse(localStorage.getItem("cart")!);
    expect(stored).toHaveLength(1);
  });
});
