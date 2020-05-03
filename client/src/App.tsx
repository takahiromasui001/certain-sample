import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios'

function App() {
  const [products, setProducts] : any = useState([])

  useEffect(() => {
    const getApiResult = async () => {
      const result: AxiosResponse = await axios.get('http://localhost:3000/api/v1/products')
      setProducts(result.data)
    }
    getApiResult()
  }, [])

  const productList = products.map((product: { id: number, name: string, maker: string, price: number }) => (
    <div key={product.id}>
      <div>
        {product.name}
      </div>
      <div>
        {product.maker}
      </div>
      <div>
        {product.price}
      </div>
    </div>
  ))

  return (
    <>
      {productList}
    </>
  )
}

export default App;
