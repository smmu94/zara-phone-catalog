import { mockPhones } from "@/lib/testMocks";
import { render, screen } from "@testing-library/react";
import PhoneGrid from ".";

describe("PhoneGrid", () => {
  it("should render all phones in the grid", () => {
    render(<PhoneGrid phones={mockPhones} />);

    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("should render correct number of phone cards", () => {
    render(<PhoneGrid phones={mockPhones} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("should render grid with correct semantic HTML", () => {
    const { container } = render(<PhoneGrid phones={mockPhones} />);

    const gridElement = container.querySelector("ul");
    expect(gridElement).toBeInTheDocument();
  });

  it("should display all phone names", () => {
    render(<PhoneGrid phones={mockPhones} />);

    expect(screen.getByText("Galaxy S23")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText("Pixel 8")).toBeInTheDocument();
  });

  it("should display all phone prices", () => {
    render(<PhoneGrid phones={mockPhones} />);

    expect(screen.getByText("999 EUR")).toBeInTheDocument();
    expect(screen.getByText("1199 EUR")).toBeInTheDocument();
    expect(screen.getByText("799 EUR")).toBeInTheDocument();
  });

  it("should handle empty phones array", () => {
    const { container } = render(<PhoneGrid phones={[]} />);

    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(0);
  });

  it("should render phone links with correct hrefs", () => {
    render(<PhoneGrid phones={mockPhones} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/phones/1");
    expect(links[1]).toHaveAttribute("href", "/phones/2");
    expect(links[2]).toHaveAttribute("href", "/phones/3");
  });
});
