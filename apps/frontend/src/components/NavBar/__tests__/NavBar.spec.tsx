import { screen, render } from "@testing-library/react";
import { useScreenSize } from "@hooks/useScreenSize";
import { queryWithRouterWrapper } from "@utils/test-wrappers";
import { NavBar } from "../NavBar";

vi.mock("@hooks/useScreenSize");
const mockUseScreenSize = vi.mocked(useScreenSize);

describe("NavBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render only home navbar item", () => {
    mockUseScreenSize.mockReturnValue({ isMediumAndAbove: true });
    render(
      queryWithRouterWrapper({
        children: <NavBar user={undefined} />,
      })
    );

    expect(mockUseScreenSize).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole("paragraph").length).toBe(1);
    expect(screen.getAllByRole("paragraph")[0].textContent).toBe("Home");
  });

  it("should render all navbar items except home", () => {
    mockUseScreenSize.mockReturnValue({ isMediumAndAbove: true });
    render(
      queryWithRouterWrapper({
        children: <NavBar user={{ id: 1, email: "test@rain.co.za" }} />,
      })
    );

    expect(mockUseScreenSize).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole("paragraph").length).toBe(4);
    expect(screen.getAllByRole("paragraph")[0].textContent).toBe("Dashboard");
    expect(screen.getAllByRole("paragraph")[1].textContent).toBe("Services");
    expect(screen.getAllByRole("paragraph")[2].textContent).toBe("Orders");
    expect(screen.getAllByRole("paragraph")[3].textContent).toBe("Payments");
  });
});
