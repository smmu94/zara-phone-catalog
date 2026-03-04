import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from ".";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("usehooks-ts", () => ({
  useDebounceCallback: (fn: (...args: unknown[]) => void) => fn,
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe("SearchBar", () => {
  let mockRouter: { replace: jest.Mock };

  beforeEach(() => {
    mockRouter = { replace: jest.fn() };
    mockUseRouter.mockReturnValue(mockRouter);
    mockUsePathname.mockReturnValue("/");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render search input", () => {
    render(<SearchBar totalResults={5} />);
    expect(screen.getByPlaceholderText("Search for a smartphone...")).toBeInTheDocument();
  });

  it("should show results count", () => {
    render(<SearchBar totalResults={3} />);
    expect(screen.getByText("3 RESULTS")).toBeInTheDocument();
  });

  it("should have correct aria label", () => {
    render(<SearchBar totalResults={0} />);
    expect(screen.getByLabelText("Search for a smartphone")).toBeInTheDocument();
  });

  it("should update URL when typing", async () => {
    render(<SearchBar totalResults={1} />);
    const input = screen.getByPlaceholderText("Search for a smartphone...");
    fireEvent.change(input, { target: { value: "Samsung" } });
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/?search=Samsung");
    });
  });

  it("should remove search param when clearing input", async () => {
    render(<SearchBar totalResults={0} />);
    const input = screen.getByPlaceholderText("Search for a smartphone...");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenLastCalledWith("/");
    });
  });

  it("should trim whitespace from search", async () => {
    render(<SearchBar totalResults={2} />);
    const input = screen.getByPlaceholderText("Search for a smartphone...");
    fireEvent.change(input, { target: { value: "  iPhone  " } });
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/?search=iPhone");
    });
  });
});
