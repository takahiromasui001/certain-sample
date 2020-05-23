import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { FormInstance } from 'antd/lib/form'

const useProductColorList = (productId: string) => {
  const [colors, setColors] = useState([])

  useEffect(() => {
    const getProductItem = async () => {
      if(productId) {
        const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/products/${productId}/colors`)
        setColors(response.data)
      } else {
        setColors([]) 
      }
    }
    getProductItem()
  }, [productId, setColors])

  const getProductColor = async (value: string, form: FormInstance) => {
    const response: AxiosResponse = await axios.get(`http://localhost:3000/api/v1/products/${value}/colors`)
    form.setFieldsValue({ colorId: '' })
    setColors(response.data)
  }

  return { productColors: colors, getProductColor: getProductColor }
}

export default useProductColorList
