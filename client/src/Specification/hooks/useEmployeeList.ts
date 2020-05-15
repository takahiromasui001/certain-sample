import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

const useEmployeeList = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const getEmployeeList = async () => {
      const response: AxiosResponse = await axios.get('http://localhost:3000/api/v1/employees')
      const result = response.data.map((employee: { id: string, name: string }) => ({ label: `${employee.name}`, id: employee.id }))
  
      setEmployees(result)
    }
    getEmployeeList()
  }, [])

  return employees 
}

export default useEmployeeList
