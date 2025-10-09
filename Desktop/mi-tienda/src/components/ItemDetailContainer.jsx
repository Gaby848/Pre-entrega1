import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProductById } from "../data/products"

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    getProductById(id).then(res => setProduct(res))
  }, [id])

  if (!product) return <h2>Cargando...</h2>

  return (
    <div className="detalle">
      <img src={product.img} alt={product.name} style={{ width: "300px", borderRadius: "10px" }} />
      <h2>{product.name}</h2>
      <p>Categoría: {product.category}</p>
      <p>Precio: ${product.price}</p>
      <Link to="/">Volver al catálogo</Link>
    </div>
  )
}

export default ItemDetailContainer
