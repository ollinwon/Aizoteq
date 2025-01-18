import React from 'react'
import './Product.css'
import { useTheme } from '../theme/ThemeContext'


const Product = () => {
const {theme} = useTheme()

  
  
  return (
    <div className={`product-main ${theme}-theme`}>
      <div className="dash-dummy"></div>
    Product
    </div>
  )
}

export default Product