import { mockCartItem } from "@/lib/testMocks";
import { fireEvent, render, screen } from "@testing-library/react";
import CartItemCard from ".";

describe("CartItemCard", () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  it("should render phone name", () => {
    render(<CartItemCard item={mockCartItem} onRemove={mockOnRemove} />);
    expect(screen.getByText(mockCartItem.phone.name.toUpperCase())).toBeInTheDocument();
  });

  it("should render storage and color", () => {
    render(<CartItemCard item={mockCartItem} onRemove={mockOnRemove} />);
    expect(
      screen.getByText(
        `${mockCartItem.selectedStorage} | ${mockCartItem.selectedColor.toUpperCase()}`
      )
    ).toBeInTheDocument();
  });

  it("should render price", () => {
    render(<CartItemCard item={mockCartItem} onRemove={mockOnRemove} />);
    expect(screen.getByText(`${mockCartItem.price} EUR`)).toBeInTheDocument();
  });

  it("should render remove button", () => {
    render(<CartItemCard item={mockCartItem} onRemove={mockOnRemove} />);
    expect(screen.getByRole("button", { name: "Eliminar" })).toBeInTheDocument();
  });

  it("should call onRemove when remove button is clicked", () => {
    render(<CartItemCard item={mockCartItem} onRemove={mockOnRemove} />);
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
