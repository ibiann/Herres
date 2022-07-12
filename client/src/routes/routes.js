import LoginPage from './../pages/LoginPage'
import RegisterPage from './../pages/RegisterPage'
import BoardPage from './../pages/BoardPage'
import BoardsPage from './../pages/BoardsPage'
import HomePage from './../pages/HomePage'
import PublicRouter from './../routes/publicRouter'
import PrivateRouter from './protectedRouter'
export const routes = [
  {
    path: '/',
    element: (
      <PublicRouter>
        <HomePage />
      </PublicRouter>
    ),
  },
  {
    path: '/boards',
    element: (
      <PrivateRouter>
        <BoardsPage />
      </PrivateRouter>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRouter>
        <LoginPage />
      </PublicRouter>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRouter>
        <RegisterPage />
      </PublicRouter>
    ),
  },
  {
    path: '/board',
    element: (
      <PrivateRouter>
        <BoardPage />
      </PrivateRouter>
    ),
  },
]
