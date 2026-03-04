import { CartProvider } from "@/features/cart/CartContext";
import { render, screen } from "@testing-library/react";
import Navbar from ".";
import { ROUTES } from "@/lib/constants";

describe("Navbar", () => {
  it("should render navbar header", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("should render logo with correct alt text", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const logo = screen.getByAltText("MBST");
    expect(logo).toBeInTheDocument();
  });

  it("should render home link to root path", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const homeLink = screen.getByRole("link", { name: /go to phones list/i });
    expect(homeLink).toHaveAttribute("href", ROUTES.PHONES.LIST);
  });

  it("should render cart link to cart path", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const cartLink = screen.getByRole("link", { name: /cart with 0 items/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("should display cart count as 0 when empty", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render cart inactive icon when no items", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const cartIcon = screen.getByAltText("Cart Icon");
    expect(cartIcon).toBeInTheDocument();
  });

  it("should have accessible aria labels", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const homeLink = screen.getByLabelText("Go to phones list page");
    const cartLink = screen.getByLabelText(/cart with/i);

    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });

  it("should render two navigation links", () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });
});
