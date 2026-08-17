import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import GalleryPage from "./pages/GalleryPage";
import HydroVerPage from "./pages/projects/HydroVerPage";
import TrueMediPage from "./pages/projects/TrueMediPage";
import AEyePage from "./pages/projects/AEyePage";
import NutriDripPage from "./pages/projects/NutriDripPage";
import QCECPage from "./pages/projects/QCECPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/projects/hydrover" element={<HydroVerPage />} />
      <Route path="/projects/truemedi" element={<TrueMediPage />} />
      <Route path="/projects/a-eye" element={<AEyePage />} />
      <Route path="/projects/nutridrip" element={<NutriDripPage />} />
      <Route path="/essays/qcec" element={<QCECPage />} />
      <Route path="*" element={<IndexPage />} />
    </Routes>
  );
}
