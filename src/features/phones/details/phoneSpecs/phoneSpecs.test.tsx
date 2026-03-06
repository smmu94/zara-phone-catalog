import { mockPhoneDetail } from "@/lib/testMocks";
import { render, screen } from "@testing-library/react";
import PhoneSpecs from ".";
import { SPEC_KEYS } from "./constants";

const mockPhone = { ...mockPhoneDetail, ...mockPhoneDetail.specs };

describe("PhoneSpecs", () => {
  it("should render the specifications title", () => {
    render(<PhoneSpecs phone={mockPhone} />);
    expect(screen.getByText("SPECIFICATIONS")).toBeInTheDocument();
  });

  it("should render all spec labels", () => {
    render(<PhoneSpecs phone={mockPhone} />);
    expect(screen.getByText("BRAND")).toBeInTheDocument();
    expect(screen.getByText("SCREEN")).toBeInTheDocument();
    expect(screen.getByText("BATTERY")).toBeInTheDocument();
  });

  it("should render spec values from phone", () => {
    render(<PhoneSpecs phone={mockPhone} />);
    expect(screen.getByText(mockPhoneDetail.brand)).toBeInTheDocument();
    expect(screen.getByText(mockPhoneDetail.specs.processor)).toBeInTheDocument();
    expect(screen.getByText(mockPhoneDetail.specs.battery)).toBeInTheDocument();
  });

  it("should render all spec rows", () => {
    render(<PhoneSpecs phone={mockPhone} />);
    SPEC_KEYS.forEach(({ label }: { label: string }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
