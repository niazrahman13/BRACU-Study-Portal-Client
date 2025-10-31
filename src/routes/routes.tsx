import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import CourseControl from "../pages/AdminDashboard/CourseControl";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import CompleteProfile from "../pages/CompleteProfile";
import Course from "../pages/Course";
import CoursesPage from "../pages/CoursesPage";
import Forum from "../pages/Forum/Forum";
import PostIssues from "../pages/Forum/PostIssues";
import Home from "../pages/Home";
import ImportantLinks from "../pages/ImportantLinks";
import Playlist from "../pages/PlayList";
import CourseReview from "../pages/Review/CourseReview";
import CourseReviewDetails from "../pages/Review/CourseReviewDetails";
import Thesis from "../pages/Thesis";
import Calendar from "../pages/User/Calendar";
import ToDoList from "../pages/User/ToDoList";
import UserDashboard from "../pages/User/UserDashboard";
import UserProfile from "../pages/User/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "course/:id", element: <Course /> },
      { path: "playlist/:playlistUrl", element: <Playlist /> },
      { path: "thesis", element: <Thesis /> },
      { path: "forum", element: <Forum /> },
      { path: "review", element: <CourseReview /> },
      { path: "importantLinks", element: <ImportantLinks /> },
      { path: "review/:courseId", element: <CourseReviewDetails /> },
      { path: "adminDashboard", element: <AdminDashboard /> },
      { path: "courseControl", element: <CourseControl /> },
      {
        path: "user",
        element: <UserDashboard />,
        children: [
          { path: "profile", element: <UserProfile /> },
          { path: "todo", element: <ToDoList /> },
          { path: "calendar", element: <Calendar /> },
          { path: "postIssues", element: <PostIssues /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/complete-profile",
    element: <CompleteProfile />,
  },
]);

export default router;
