import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/Header.jsx'
import Headerbody from './components/Headerbody.jsx'
import Search from './components/Search.jsx'

const ytrouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Header />,
      },
      {
        path:"/search",
        element:<Search />,
      },
      {
        path:"/video/:id",
        element:<Headerbody/>,
      },
    ]

  },
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={ytrouter}></RouterProvider>
)