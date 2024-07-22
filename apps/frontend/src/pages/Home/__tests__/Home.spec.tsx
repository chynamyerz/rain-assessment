import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import { queryWithRouterWrapper } from "@utils/test-wrappers";
import { Home } from "../Home";

describe("Home", () => {
  const testEmail = "test@rain.co.za";
  const testPassword = "password";
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should sign up seccessfully", async () => {
    const axiosPostMock = vi.spyOn(axios, "post");
    axiosPostMock.mockResolvedValue({
      data: { user: { id: 1, emal: testEmail }, token: "encrypted" },
    });

    render(queryWithRouterWrapper({ children: <Home /> }));

    const emailInput = screen.getByRole("textbox") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);
    await userEvent.click(screen.getByRole("checkbox"));

    const signUpButton = screen.getByRole("button");

    expect(signUpButton.textContent).toBe("Sign up");

    await userEvent.click(signUpButton);

    expect(emailInput.value).toBe(testEmail);
    expect(passwordInput.value).toBe(testPassword);

    expect(axiosPostMock).toHaveBeenCalledTimes(1);
    expect(axiosPostMock).toHaveBeenCalledWith(
      "http://127.0.0.1:4000/api/users",
      {
        email: testEmail,
        password: testPassword,
      }
    );
  });

  it("should sign in seccessfully", async () => {
    const axiosPostMock = vi.spyOn(axios, "post");
    axiosPostMock.mockResolvedValue({
      data: { user: { id: 1, emal: testEmail }, token: "encrypted" },
    });

    render(queryWithRouterWrapper({ children: <Home /> }));

    const emailInput = screen.getByRole("textbox") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const signInButton = screen.getByRole("button");

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);

    expect(signInButton.textContent).toBe("Sign in");

    await userEvent.click(signInButton);

    expect(emailInput.value).toBe(testEmail);
    expect(passwordInput.value).toBe(testPassword);

    expect(axiosPostMock).toHaveBeenCalledTimes(1);
    expect(axiosPostMock).toHaveBeenCalledWith(
      "http://127.0.0.1:4000/api/auth",
      {
        email: testEmail,
        password: testPassword,
      }
    );
  });
});
