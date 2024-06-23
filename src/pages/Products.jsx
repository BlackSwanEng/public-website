import React, {useEffect, useState} from 'react';
import sanityClient from '@/sanityClient';

const Products = () => {
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    try {
      const query = `*[_type == "product"]`;
      const products = await sanityClient.fetch(query);
      console.log(products)
    } catch (error) {
      console.log(error)}}

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className=' h-[100vh] container'>
      Main Product projects
    </div>
  )
}

export default Products