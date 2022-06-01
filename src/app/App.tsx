import "app/App.scss";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import TopNav from "./components/TopNav";
import { Privacy } from "./pages";
import NotFound from "./pages/NotFound";

const ThemeLoader = lazy(() => import("app/components/ThemeLoader"));
const About = lazy(() => import("app/pages/About"));
const Home = lazy(() => import("app/pages/Home"));
const ChatBot = lazy(() => import("app/pages/ChatBot"));

export default function App() {
  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <TopNav />
        <ThemeLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat-bot" element={<ChatBot />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
