import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [products, setProducts] : any = useState([])

  useEffect(() => {
    const getApiResult = async () => {
      const result: any = await axios.get('http://localhost:3000/api/v1/products')
      setProducts(result.data[0])
    }
    getApiResult()
  }, [])

  return (
    <>
      <div>
        {products.name}
      </div>
      <div>
        {products.maker}
      </div>
      <div>
        {products.price}
      </div>
    </>
  )
}

export default App;
