import { useState,useEffect } from "react"
import { Alert } from "react-native"
import { getAllPosts } from "./appwrite"

export const useAppWrite = (fn:()=>void) => {

    const [data, setData] = useState<any>([])

  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async ()=> {
      setIsLoading(true);

      try {
        const response = await fn()
        setData(response);

      } catch (error) {
        Alert.alert('Error', error instanceof Error ? error.message : String(error))
      }
      finally{
        setIsLoading(false)
      }
  }
  
  useEffect(()=>{

    fetchData();

  },[])

  const refetch = async () => fetchData()

  return {data, isLoading, refetch}
}