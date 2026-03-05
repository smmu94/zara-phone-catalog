import { CartProvider } from "@/features/cart/CartContext";
import { mockPhoneDetail } from "@/lib/testMocks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhoneMainInfo from "./index";

const renderWithContext = (component: React.ReactElement) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe("PhoneMainInfo Component", () => {
  it("should render phone name and base price", () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    expect(screen.getByText(mockPhoneDetail.name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`From ${mockPhoneDetail.basePrice} EUR`)).toBeInTheDocument();
  });

  it("should render phone image with correct alt text", () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    const altText = `${mockPhoneDetail.brand} ${mockPhoneDetail.name}`;
    const image = screen.getByAltText(altText);
    expect(image).toBeInTheDocument();
  });

  it("should render ColorSelector and StorageSelector components", () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    expect(screen.getByText(/COLOR. PICK YOUR FAVOURITE./i)).toBeInTheDocument();
    expect(screen.getByText(/STORAGE ¿HOW MUCH SPACE DO YOU NEED?/i)).toBeInTheDocument();
  });

  it("should have disabled Add button when no selection is made", () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    const addButton = screen.getByRole("button", { name: /AÑADIR/i });
    expect(addButton).toBeDisabled();
  });

  it("should enable Add button when both color and storage are selected", async () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    const colorButton = screen.getByLabelText(mockPhoneDetail.colorOptions[0].name);
    const storageButton = screen.getByRole("button", {
      name: mockPhoneDetail.storageOptions[0].capacity,
    });
    const addButton = screen.getByRole("button", { name: /AÑADIR/i });

    expect(addButton).toBeDisabled();

    const user = userEvent.setup();
    await user.click(colorButton);
    expect(addButton).toBeDisabled();

    await user.click(storageButton);
    expect(addButton).not.toBeDisabled();
  });

  it("should update price when storage is selected", async () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    let priceText = screen.getByText(`From ${mockPhoneDetail.basePrice} EUR`);
    expect(priceText).toBeInTheDocument();

    const storageButton = screen.getByRole("button", {
      name: mockPhoneDetail.storageOptions[1].capacity,
    });
    const user = userEvent.setup();
    await user.click(storageButton);

    priceText = screen.getByText(`From ${mockPhoneDetail.storageOptions[1].price} EUR`);
    expect(priceText).toBeInTheDocument();
  });

  it("should update image when color is selected", async () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    const altText = `${mockPhoneDetail.brand} ${mockPhoneDetail.name}`;
    let image = screen.getByAltText(altText) as HTMLImageElement;
    expect(image.src).toContain(mockPhoneDetail.colorOptions[0].imageUrl.replace("/", ""));

    const whiteColorButton = screen.getByLabelText(mockPhoneDetail.colorOptions[1].name);
    const user = userEvent.setup();
    await user.click(whiteColorButton);

    image = screen.getByAltText(altText) as HTMLImageElement;
    expect(image.src).toContain(mockPhoneDetail.colorOptions[1].imageUrl.replace("/", ""));
  });

  it("should call addItem when Add button is clicked with selections", async () => {
    renderWithContext(<PhoneMainInfo phone={mockPhoneDetail} />);

    const colorButton = screen.getByLabelText(mockPhoneDetail.colorOptions[0].name);
    const storageButton = screen.getByRole("button", {
      name: mockPhoneDetail.storageOptions[0].capacity,
    });
    const addButton = screen.getByRole("button", { name: /AÑADIR/i });

    const user = userEvent.setup();
    await user.click(colorButton);
    await user.click(storageButton);
    await user.click(addButton);

    expect(addButton).not.toBeDisabled();
  });
});
