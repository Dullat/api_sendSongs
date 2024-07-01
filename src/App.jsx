import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"

import HomePage from "./pages/HomePage.jsx"
import Layout from "./layouts/Layout.jsx"
import "./index.css"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
