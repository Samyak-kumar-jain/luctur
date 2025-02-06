import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "./components/theme-provider";
import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/Student/HomePage";
import Auth from "./AppComonents/Auth/Auth";
import HeroPage from "./AppComonents/Student/HeroPage";
import MyLearning from "./Pages/Student/MyLearning";
import Profile from "./Pages/Student/Profile";
import Admin from "./AppComonents/Admin/Admin";
import Dashboard from "./Pages/Admin/Dashboard";
import AddCourse from "./Pages/Admin/AddCourse";
import CourseTable from "./AppComonents/Admin/CourseTable";
import EditCourse from "./Pages/Admin/EditCourse";
import LecturePage from "./Pages/Admin/LecturePage";
import EditLecture from "./Pages/Admin/EditLecture";
import CourseDetail from "./Pages/Student/CourseDetail";
import CourseProgress from "./Pages/Student/CourseProgress";
import SearchPage from "./Pages/Student/SearchPage";
import { Authenticated, ProtectedRoute, AdminRoute } from "./AppComonents/Commom/ProtectedRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HeroPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "my-learning", element: <ProtectedRoute><MyLearning /></ProtectedRoute> },
        { path: "my-profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "course/search", element: <ProtectedRoute><SearchPage /></ProtectedRoute> },
        { path: "detail-page/:courseId", element: <ProtectedRoute><CourseDetail /></ProtectedRoute> },
        { path: "course-progress/:courseId", element: <ProtectedRoute><CourseProgress /></ProtectedRoute> },
      ],
    },
    {
      path: "/auth",
      element: (
        <Authenticated>
          <Auth />
        </Authenticated>
      ),
    },
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <Admin />
        </AdminRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "add-course", element: <CourseTable /> },
        { path: "add-course/create-course", element: <AddCourse /> },
        { path: "add-course/:courseId", element: <EditCourse /> },
        { path: "add-course/:courseId/lectures", element: <LecturePage /> },
        { path: "add-course/:courseId/lectures/:lectureId/edit", element: <EditLecture /> },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName={() => "custom-toast"}
      />

      {/* Provide the router to the app */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
