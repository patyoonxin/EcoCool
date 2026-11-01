
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

const pages = [
  { path: "/", title: "Welcome to EcoCool Node" },
  { path: "/environment", title: "Environmental Monitoring" },
  { path: "/energy", title: "Energy Management" },
  { path: "/control", title: "Control & Configuration" },
  { path: "/experiments", title: "Performance Analysis" },
  { path: "/alerts", title: "Alerts & System Logs" },
  { path: "/settings", title: "System Settings" },
];

function Placeholder({ title }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">
        This page is under development.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<Placeholder title={page.title} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
