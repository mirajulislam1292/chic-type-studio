import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/Index";
import QCECPage from "./pages/projects/QCECPage";
import VisitorTracker from "./components/VisitorTracker";

const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const DynamicProjectPage = lazy(() => import("./pages/DynamicProjectPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AnonymousMessagePage = lazy(() => import("./pages/AnonymousMessagePage"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const ResetPasswordPage = lazy(() => import("./admin/ResetPasswordPage"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const CollectionPage = lazy(() => import("./admin/CollectionPage"));
const EditorPage = lazy(() => import("./admin/EditorPage"));
const SettingsPage = lazy(() => import("./admin/SettingsPage"));
const VisitorsPage = lazy(() => import("./admin/VisitorsPage"));
const VisitorDetailPage = lazy(() => import("./admin/VisitorDetailPage"));
const MessagesPage = lazy(() => import("./admin/MessagesPage"));

export default function App() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#050507] text-sm text-zinc-500">Loading…</div>}><VisitorTracker /><Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/projects/:slug" element={<DynamicProjectPage />} />
    <Route path="/achievements" element={<AchievementsPage />} />
    <Route path="/gallery" element={<GalleryPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogPostPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/message" element={<AnonymousMessagePage />} />
    <Route path="/essays/qcec" element={<QCECPage />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="visitors" element={<VisitorsPage />} />
      <Route path="visitors/:id" element={<VisitorDetailPage />} />
      <Route path="messages" element={<MessagesPage />} />
      <Route path=":section" element={<CollectionPage />} />
      <Route path=":section/:id" element={<EditorPage />} />
    </Route>
    <Route path="*" element={<IndexPage />} />
  </Routes></Suspense>;
}
