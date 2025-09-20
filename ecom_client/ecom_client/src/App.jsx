import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoggedInHeader from './admin/header/LoggedInHeader'
import ProductEdit from './admin/product/ProductEdit'
import ProductList from './admin/product/ProductList'
import ProductCreate from './admin/product/ProductCreate'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './admin/login/AdminLogin'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoggedInHeader/> 
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin" element={<ProductList/>} />
          <Route path="/admin/list" element={<ProductList/>} />
          <Route path="/admin/create" element={<ProductCreate/>} />
          <Route path="/admin/edit/:id" element={<ProductEdit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App