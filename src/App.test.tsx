import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { galleryImages } from "./data/galleryImages";

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

  it.each([
    ["/gallery", /Photo Gallery/i],
    ["/projects/hydrover", /HydroVer/i],
    ["/projects/truemedi", /TrueMedi/i],
    ["/projects/a-eye", /AEYE|A-Eye/i],
    ["/projects/nutridrip", /NutriDrip/i],
    ["/essays/qcec", /QCEC/i],
  ])("registers the route %s", (route, headingMatcher) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(headingMatcher).length).toBeGreaterThan(0);
    unmount();
  });
});
