import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Catálogo general */}
        <Route path="/" element={<ItemListContainer />} />

        {/* Catálogo por categoría */}
        <Route path="/category/:categoryId" element={<ItemListContainer />} />

        {/* Detalle del producto */}
        <Route path="/item/:id" element={<ItemDetailContainer />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
