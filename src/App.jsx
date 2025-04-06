import { useEffect } from 'react'
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
import RemoteJobs from './components/RemoteJobs'
import axios from "axios";

axios.defaults.withCredentials = true;


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
    path: "/remote",
    element: <RemoteJobs />
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

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/me`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(res.data.user));  // Set user in Redux store
            }
        } catch (error) {
        }
    };
  
    fetchUser();
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
