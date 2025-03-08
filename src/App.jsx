import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import ProtectedRoute from './components/admin/ProtectedRoute'
import JobsByCategory from './components/JobsByCategory'
import Contact from './components/Contact'
import NotFoundPage from './components/NotFoundPage'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/categories/:category",
    element: <JobsByCategory />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/profile", // ✅ Regular users can access this
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: "/jobs", // 🔒 Admin-only
    element: <ProtectedRoute requireAdmin={true}><Jobs /></ProtectedRoute>
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
