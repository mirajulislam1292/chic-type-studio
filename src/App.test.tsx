import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { galleryImages } from "./data/galleryImages";
import { AuthProvider } from "./context/AuthContext";
import { getVisibleSocialLinks } from "./lib/socialLinks";
import { MarkdownContent } from "./components/MarkdownContent";
import { ProjectMedia } from "./components/ProjectMedia";

describe("portfolio routes and gallery data", () => {
  it("uses the local gallery asset list requested for the portfolio", () => {
    expect(galleryImages[0]).toEqual({
      src: "/assets/gallery-thumbs/16267556-e1ed-4280-b139-10c4b43ef20f.jpg",
      fullSrc: "/assets/16267556-e1ed-4280-b139-10c4b43ef20f.jpg",
      alt: "Gallery photo",
    });

    expect(galleryImages.slice(0, 5).map((image) => image.src)).toEqual([
      "/assets/gallery-thumbs/16267556-e1ed-4280-b139-10c4b43ef20f.jpg",
      "/assets/gallery-thumbs/IMG_0329.jpg",
      "/assets/gallery-thumbs/IMG_3143.JPG",
      "/assets/gallery-thumbs/IMG_3822.jpg",
      "/assets/gallery-thumbs/IMG_3828.jpg",
    ]);
  });

  it("shows only configured social profiles and supports custom platforms", () => {
    expect(getVisibleSocialLinks({
      x: "https://x.com/mahim",
      facebook: "",
      custom: [
        { label: "Behance", url: "https://behance.net/mahim" },
        { label: "Hidden", url: "" },
      ],
    })).toEqual([
      { key: "x", label: "X (formerly Twitter)", url: "https://x.com/mahim" },
      { key: "custom-0-Behance", label: "Behance", url: "https://behance.net/mahim" },
    ]);
  });

  it("renders project screenshots and preserves authored description spacing", () => {
    const { container } = render(<><ProjectMedia projectName="GutiGhor" galleryUrls={["https://example.com/screenshot.png"]} /><MarkdownContent content={"First  line\nSecond line"} preserveWhitespace /></>);

    expect(screen.getByRole("img", { name: "GutiGhor project preview" })).toHaveAttribute("src", "https://example.com/screenshot.png");
    expect(container.querySelector("p")).toHaveClass("whitespace-pre-wrap");
    expect(container.querySelector("p")?.textContent).toBe("First  lineSecond line");
  });

  it.each([
    ["/gallery", /^Gallery$/i],
    ["/projects/hydrover", /HydroVer/i],
    ["/projects/truemedi", /TrueMedi/i],
    ["/projects/a-eye", /AEYE|A-Eye/i],
    ["/projects/nutridrip", /NutriDrip/i],
    ["/essays/qcec", /QCEC/i],
    ["/message", /anonymous note/i],
    ["/contact", /Let's talk/i],
  ])("registers the route %s", async (route, headingMatcher) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider><App /></AuthProvider>
      </MemoryRouter>
    );

    expect((await screen.findAllByText(headingMatcher)).length).toBeGreaterThan(0);
    unmount();
  });

  it("keeps admin access behind authentication and configuration", async () => {
    render(<MemoryRouter initialEntries={["/admin/login"]}><AuthProvider><App /></AuthProvider></MemoryRouter>);
    expect(await screen.findByText(/content service is not connected/i)).toBeInTheDocument();
  });

  it("separates volunteering from work experience on the homepage", async () => {
    render(<MemoryRouter initialEntries={["/"]}><AuthProvider><App /></AuthProvider></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Work Experience" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Volunteering" })).toBeInTheDocument();
    expect(await screen.findByText("RCY Volunteer, ICT Department")).toBeInTheDocument();
  });
});
