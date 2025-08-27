import Index from "@/app/index";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";

jest.useFakeTimers();

beforeAll(() => {
  jest.spyOn(Alert, "alert").mockImplementation((title, message, buttons) => {
    // auto-press Delete in tests when present
    const deleteBtn = buttons && buttons.find((b: any) => b.text === "Delete");
    if (deleteBtn && typeof deleteBtn.onPress === "function") {
      deleteBtn.onPress();
    }
    return null as any;
  });
});

describe("Task management UI", () => {
  it("can add a task", async () => {
    const { getByTestId, getByPlaceholderText, getByText, queryByText } =
      render(<Index />);

    const openAdd = getByTestId("open-add");
    fireEvent.press(openAdd);

    const titleInput = getByPlaceholderText("Task Title");
    fireEvent.changeText(titleInput, "Test task");

    const addButton = getByText("Add");
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(queryByText("Test task")).toBeTruthy();
    });
  });

  it("can toggle a task completion", async () => {
    const { getByTestId, getByPlaceholderText, getByText, getAllByTestId } =
      render(<Index />);

    fireEvent.press(getByTestId("open-add"));
    fireEvent.changeText(getByPlaceholderText("Task Title"), "Toggle task");
    fireEvent.press(getByText("Add"));

    await waitFor(() => {
      expect(getByText("Toggle task")).toBeTruthy();
    });

    // find first toggle button using regex-based testID
    const toggles = getAllByTestId(/toggle-/);
    expect(toggles.length).toBeGreaterThan(0);
    fireEvent.press(toggles[0]);

    await waitFor(() => {
      const title = getByText("Toggle task");
      expect(title).toBeTruthy();
    });
  });

  it("can delete a task", async () => {
    const {
      getByTestId,
      getByPlaceholderText,
      getByText,
      getAllByTestId,
      queryByText,
    } = render(<Index />);

    fireEvent.press(getByTestId("open-add"));
    fireEvent.changeText(getByPlaceholderText("Task Title"), "Delete task");
    fireEvent.press(getByText("Add"));

    await waitFor(() => {
      expect(getByText("Delete task")).toBeTruthy();
    });

    const deletes = getAllByTestId(/delete-/);
    expect(deletes.length).toBeGreaterThan(0);
    fireEvent.press(deletes[0]);

    await waitFor(() => {
      expect(queryByText("Delete task")).toBeNull();
    });
  });
});
