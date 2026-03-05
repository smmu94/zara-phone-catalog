import { mockColorOptions } from "@/lib/testMocks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorSelector from "./index";

describe("ColorSelector Component", () => {
  const mockOnSelectColor = jest.fn();

  beforeEach(() => {
    mockOnSelectColor.mockClear();
  });

  it("should render all color options", () => {
    render(
      <ColorSelector
        colors={mockColorOptions}
        selectedColor={null}
        onSelectColor={mockOnSelectColor}
      />
    );

    mockColorOptions.forEach((color) => {
      const button = screen.getByLabelText(color.name);
      expect(button).toBeInTheDocument();
      const swatch = button.querySelector("span");
      expect(swatch).toHaveStyle({ backgroundColor: color.hexCode });
    });
  });
  it("should display the selector label", () => {
    render(
      <ColorSelector
        colors={mockColorOptions}
        selectedColor={null}
        onSelectColor={mockOnSelectColor}
      />
    );

    expect(screen.getByText(/COLOR. PICK YOUR FAVOURITE./i)).toBeInTheDocument();
  });

  it("should call onSelectColor when a color is clicked", async () => {
    render(
      <ColorSelector
        colors={mockColorOptions}
        selectedColor={null}
        onSelectColor={mockOnSelectColor}
      />
    );

    const blackButton = screen.getByLabelText("Black");
    const user = userEvent.setup();
    await user.click(blackButton);

    expect(mockOnSelectColor).toHaveBeenCalledWith(mockColorOptions[0]);
    expect(mockOnSelectColor).toHaveBeenCalledTimes(1);
  });

  it("should mark selected color as active", () => {
    render(
      <ColorSelector
        colors={mockColorOptions}
        selectedColor={mockColorOptions[1]}
        onSelectColor={mockOnSelectColor}
      />
    );

    const whiteButton = screen.getByLabelText("White");
    expect(whiteButton).toHaveAttribute("aria-pressed", "true");

    const blackButton = screen.getByLabelText("Black");
    expect(blackButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should handle multiple color selections", async () => {
    const { rerender } = render(
      <ColorSelector
        colors={mockColorOptions}
        selectedColor={null}
        onSelectColor={mockOnSelectColor}
      />
    );

    const blackButton = screen.getByLabelText("Black");
    const user = userEvent.setup();
    await user.click(blackButton);

    expect(mockOnSelectColor).toHaveBeenCalledWith(mockColorOptions[0]);

    rerender(
      <ColorSelector
        colors={mockColorOptions}
        selectedColor={mockColorOptions[0]}
        onSelectColor={mockOnSelectColor}
      />
    );

    expect(blackButton).toHaveAttribute("aria-pressed", "true");
  });
});
