import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import AuthPage from "./Pages/AuthPage.jsx";
import ForgotPasswordPage from "./Pages/ForgotPassword.jsx";
import ResetPage from "./Pages/ResetPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SirenPage from "./Pages/SirenPage.jsx";
import SosPage from "./Pages/SosPage.jsx";
import TrackerPage from "./Pages/TrackerPage.jsx";
import MoodPage from "./Pages/MoodPage.jsx";
import PregnancyGuidePage from "./Pages/PregencyGuidePage.jsx";
import FakeCall from "./Pages/FakeCall.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="resetPassword" element={<ResetPage />} />
      <Route element={<PrivateRoute />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="me" element={<ProfilePage />} />
        <Route path="sos" element={<SosPage />} />
        <Route path="siren" element={<SirenPage />} />
        <Route path="tracker" element={<TrackerPage />} />
        <Route path="mood" element={<MoodPage />} />
        <Route path="guide" element={<PregnancyGuidePage />} />
        <Route path="fakeCall" element={<FakeCall />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
