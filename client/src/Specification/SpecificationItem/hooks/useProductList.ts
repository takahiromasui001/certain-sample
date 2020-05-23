import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { TProduct } from 'src/Product/pages/ProductList'

const useProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProductList = async () => {
      const response: AxiosResponse = await axios.get('http://localhost:3000/api/v1/products')
      const result = response.data.map((product: TProduct) => ({ label: `${product.name}(${product.maker})`, id: product.id }))
  
      setProducts(result)
    }
    getProductList()
  }, [])

  return products
}

export default useProductList
