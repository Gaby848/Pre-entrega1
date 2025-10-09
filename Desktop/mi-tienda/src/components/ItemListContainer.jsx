import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProducts, getProductsByCategory } from "../data/products"

const ItemListContainer = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    const fetchData = categoryId ? getProductsByCategory(categoryId) : getProducts()
    fetchData.then(res => {
      setItems(res)
      setLoading(false)
    })
  }, [categoryId])

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <h2>Cargando productos...</h2>
      </div>
    )
  }

  return (
    <div className="catalogo">
      <h2>{categoryId ? `Categoría: ${categoryId}` : "Catálogo de Productos"}</h2>

      <div className="grid">
        {items.map(item => (
          <div key={item.id} className="card">
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <Link to={`/item/${item.id}`}>Ver Detalle</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemListContainer
