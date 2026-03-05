import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import BackButton from ".";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe("BackButton", () => {
  let mockBack: jest.Mock;

  beforeEach(() => {
    mockBack = jest.fn();
    mockUseRouter.mockReturnValue({ back: mockBack });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render back button", () => {
    render(<BackButton />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("should call router back when clicked", () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
