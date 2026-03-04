import { ROUTES } from "@/lib/constants";
import { mockPhone } from "@/lib/testMocks";
import { Phone } from "@/lib/types";
import { render, screen } from "@testing-library/react";
import PhoneCard from ".";

describe("PhoneCard", () => {
  it("should render phone card with correct data", () => {
    render(<PhoneCard phone={mockPhone} />);

    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S23")).toBeInTheDocument();
    expect(screen.getByText("999 EUR")).toBeInTheDocument();
  });

  it("should render image with correct alt text", () => {
    render(<PhoneCard phone={mockPhone} />);

    const image = screen.getByAltText("Samsung Galaxy S23");
    expect(image).toBeInTheDocument();
  });

  it("should link to phone details page", () => {
    render(<PhoneCard phone={mockPhone} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", ROUTES.PHONES.DETAILS("1"));
  });

  it("should render image with correct src", () => {
    render(<PhoneCard phone={mockPhone} />);

    const image = screen.getByAltText("Samsung Galaxy S23") as HTMLImageElement;
    expect(image.src).toContain("phone.jpg");
  });

  it("should work with different phone data", () => {
    const differentPhone: Phone = {
      id: "2",
      brand: "Apple",
      name: "iPhone 15",
      basePrice: 1199,
      imageUrl: "https://example.com/iphone.jpg",
    };

    render(<PhoneCard phone={differentPhone} />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText("1199 EUR")).toBeInTheDocument();
  });
});
