import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import styles from "./button.module.css";
import Button from "./index";

describe("Button Component", () => {
  it("should render with default variant (standard)", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button", { name: /button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.btn, styles.standard);
  });

  it("should render with primary variant", () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole("button", { name: /primary button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.btn, styles.primary);
  });

  it("should render children correctly", () => {
    render(<Button>Test Children</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Test Children");
  });

  it("should handle click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should accept and apply HTML button attributes", () => {
    render(
      <Button id="custom-button" className="custom-class" disabled data-testid="test-button">
        Button
      </Button>
    );
    const button = screen.getByTestId("test-button");

    expect(button).toHaveAttribute("id", "custom-button");
    expect(button).toHaveClass("custom-class");
    expect(button).toBeDisabled();
  });

  it("should handle multiple clicks", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("should not trigger click when disabled", async () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should render with type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });
});
