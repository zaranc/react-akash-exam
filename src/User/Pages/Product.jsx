// import { Input } from '@mui/material'
// import React from 'react'

// const Product = () => {
//   return (
//     <div>
      
//     </div>

//   )
// }
    
// export default Product;


import React, { useEffect, useState } from "react";
import { base_url, get_product } from "../../constant";
import { get_data } from "../../Api/api";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  // Get products
  const getProduct = async () => {
    try {
      const res = await get_data(base_url, get_product);
      setProduct(res.data);
    } catch (error) {
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="row">
      {error && <div className="alert alert-danger">{error}</div>}
      {product.map((prod) => (
        <div key={prod.id} className="col-md-4">
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img
              src={prod.productImage}
              className="card-img-top"
              alt={prod.productName}
            />
            <div className="card-body">
              <h5 className="card-title">{prod.productName}</h5>
              <p className="card-text">${prod.price}</p>
              <p className="card-text">{prod.desc}</p>
              <p className="card-text">
                {prod.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;


