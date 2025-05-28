import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";
import { vi } from "vitest";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card handleClick={() => {}}>
        <p>Race Name</p>
      </Card>
    );

    expect(screen.getByText("Race Name")).toBeInTheDocument();
  });

  it("shows pushpin icon when not pinned", () => {
    render(
      <Card handleClick={() => {}} isPinned={false} onPinToggle={() => {}}>
        <p>Test</p>
      </Card>
    );

    expect(screen.getByTestId("PushPinIcon")).toBeInTheDocument();
  });

  it("shows close icon when pinned", () => {
    render(
      <Card handleClick={() => {}} isPinned={true} onPinToggle={() => {}}>
        <p>Test</p>
      </Card>
    );

    expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
  });

  it("calls onPinToggle when icon is clicked", () => {
    const onPinToggle = vi.fn();

    render(
      <Card handleClick={() => {}} isPinned={false} onPinToggle={onPinToggle}>
        <p>Test</p>
      </Card>
    );

    const pinIcon = screen.getByRole("button");
    fireEvent.click(pinIcon);

    expect(onPinToggle).toHaveBeenCalledTimes(1);
  });

  it("does not trigger handleClick when pin icon is clicked", () => {//3ashan el e propagate
    const handleClick = vi.fn();
    const onPinToggle = vi.fn();

    render(
      <Card
        handleClick={handleClick}
        isPinned={false}
        onPinToggle={onPinToggle}
      >
        <p>Test</p>
      </Card>
    );

    const pinIcon = screen.getByRole("button");
    fireEvent.click(pinIcon);

    expect(handleClick).not.toHaveBeenCalled();
    expect(onPinToggle).toHaveBeenCalled();
  });
});
