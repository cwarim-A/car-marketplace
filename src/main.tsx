import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './home'
import Contact from './contact'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './profile/index'
import AddListing from './add-listing'
import { Toaster } from "@/components/ui/sonner"
import SearchByCategory from './search/[category]/Index'
import SearchByOptions from './search/Index'
import ListingDetail from './listing-details/[id]'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/contact",
    element:<Contact/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/add-listing",
    element:<AddListing/>
  },
  {
    path:"/search",
    element:<SearchByOptions/>
  },
  {
    path:"/search/:category",
    element:<SearchByCategory/>
  },
  {
    path:"/listing-details/:id",
    element:<ListingDetail/>
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router}/>
    <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
