import { mockStorageOptions } from "@/lib/testMocks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StorageSelector from "./index";

describe("StorageSelector Component", () => {
  const mockOnSelectStorage = jest.fn();

  beforeEach(() => {
    mockOnSelectStorage.mockClear();
  });

  it("should render all storage options", () => {
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={null}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    mockStorageOptions.forEach((option) => {
      expect(screen.getByRole("button", { name: option.capacity })).toBeInTheDocument();
    });
  });

  it("should display the selector label", () => {
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={null}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    expect(screen.getByText(/STORAGE ¿HOW MUCH SPACE DO YOU NEED?/i)).toBeInTheDocument();
  });

  it("should call onSelectStorage when a storage option is clicked", async () => {
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={null}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    const storageButton = screen.getByRole("button", { name: "256GB" });
    const user = userEvent.setup();
    await user.click(storageButton);

    expect(mockOnSelectStorage).toHaveBeenCalledWith(mockStorageOptions[1]);
    expect(mockOnSelectStorage).toHaveBeenCalledTimes(1);
  });

  it("should mark selected storage as active", () => {
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={mockStorageOptions[0]}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    const selectedButton = screen.getByRole("button", { name: "128GB" });
    expect(selectedButton).toHaveAttribute("aria-pressed", "true");

    const otherButton = screen.getByRole("button", { name: "256GB" });
    expect(otherButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should handle multiple storage selections", async () => {
    const { rerender } = render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={null}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    const storageButton = screen.getByRole("button", { name: "512GB" });
    const user = userEvent.setup();
    await user.click(storageButton);

    expect(mockOnSelectStorage).toHaveBeenCalledWith(mockStorageOptions[2]);

    rerender(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={mockStorageOptions[2]}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    expect(storageButton).toHaveAttribute("aria-pressed", "true");
  });

  it("should render buttons in correct order", () => {
    render(
      <StorageSelector
        storageOptions={mockStorageOptions}
        selectedStorage={null}
        onSelectStorage={mockOnSelectStorage}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("128GB");
    expect(buttons[1]).toHaveTextContent("256GB");
    expect(buttons[2]).toHaveTextContent("512GB");
  });
});
