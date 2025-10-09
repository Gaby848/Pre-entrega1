import cap6Img from "../assets/img/cap6.jpg";
import laacapImg from "../assets/img/laacap.jpg";
import looserImg from "../assets/img/looser.jpg";
import rosaImg from "../assets/img/rosa.jpg";

export const products = [
  { id: 1, name: "Gorra Nike", category: "urbana", price: 35000, img: cap6Img },
  { id: 2, name: "Gorra Adidas", category: "urbana", price: 32000, img: laacapImg },
  { id: 3, name: "Perfume Dior", category: "perfumeria", price: 90000, img: looserImg },
  { id: 4, name: "Perfume Lattafa", category: "perfumeria", price: 60000, img: rosaImg },
]

export const getProducts = () =>
  new Promise(resolve => setTimeout(() => resolve(products), 1000))

export const getProductById = (id) =>
  new Promise(resolve => setTimeout(() => resolve(products.find(p => p.id === Number(id))), 1000))

export const getProductsByCategory = (category) =>
  new Promise(resolve => setTimeout(() => resolve(products.filter(p => p.category === category)), 1000))
