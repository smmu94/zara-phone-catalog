import { mockPhones } from "@/lib/testMocks";
import { fireEvent, render, screen } from "@testing-library/react";
import SimilarPhones from ".";

jest.mock("@/features/phones/components/phoneCard", () => ({
  __esModule: true,
  default: ({ phone }: { phone: { name: string } }) => <div>{phone.name}</div>,
}));

describe("SimilarPhones", () => {
  it("should render the title", () => {
    render(<SimilarPhones phones={mockPhones} />);
    expect(screen.getByText("SIMILAR ITEMS")).toBeInTheDocument();
  });

  it("should render all phone cards", () => {
    render(<SimilarPhones phones={mockPhones} />);
    mockPhones.forEach((phone) => {
      expect(screen.getByText(phone.name)).toBeInTheDocument();
    });
  });

  it("should render scrollbar track and thumb", () => {
    const { container } = render(<SimilarPhones phones={mockPhones} />);
    expect(container.querySelector(".scrollbarTrack")).toBeInTheDocument();
    expect(container.querySelector(".scrollbarThumb")).toBeInTheDocument();
  });

  it("should not navigate on drag", () => {
    const { container } = render(<SimilarPhones phones={mockPhones} />);
    const carousel = container.querySelector(".carousel") as HTMLElement;

    fireEvent.pointerDown(carousel, { pageX: 0 });
    fireEvent.pointerMove(carousel, { pageX: 100 });
    fireEvent.click(carousel);

    expect(carousel).toBeInTheDocument();
  });
});
