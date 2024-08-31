import { lazy } from "react"
import { useEffect, useState } from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import HomePage from "./pages/HomePage"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"
// import Login from "./pages/Login"

import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import SpinnerFullPage from "./components/SpinnerFullPage"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"
import { Suspense } from "react"
//lazy loading pages
const Product = lazy(()=>import("./pages/Product"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const HomePage = lazy(()=>import("./pages/HomePage"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))
const Login = lazy(()=>import("./pages/Login"))



function App() {

  
  return (
    <div>
      <CitiesProvider>
          <AuthProvider>
      <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>

      
        <Routes>
          <Route path="product" element={<Product></Product>}></Route>
          <Route path="pricing" element={<Pricing></Pricing>}></Route>

          <Route path="app" element={
            <ProtectedRoute>
              <AppLayout></AppLayout>
            </ProtectedRoute>
            }>
            {/* <Route index element={<CityList cities={cities} isLoading={isLoading}></CityList>}></Route> */}
            <Route index element={<Navigate replace to="cities"></Navigate>}></Route>
            <Route path="cities" element={<CityList ></CityList>}></Route>
            <Route path="cities/:id" element={<City></City>}></Route>
            <Route path="countries" element={<CountryList ></CountryList>}></Route>
            <Route path="form" element={<Form></Form>}></Route>
          </Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
      </BrowserRouter> 
          </AuthProvider>
      </CitiesProvider>
    </div>
  )
}

export default App

