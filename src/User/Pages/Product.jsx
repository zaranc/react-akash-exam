import React, { useEffect, useState } from "react";
import { base_url, get_product } from "../../constant";
import { get_data } from "../../Api/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  // Get products
  const getProduct = async () => {
    try {
      const res = await get_data(base_url, get_product);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [inputValue, products]);

  // Filter products based on search input
  const filterProducts = () => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Search Your Product :-</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your product name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="row">
        {error && <div className="alert alert-danger">{error}</div>}
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card" style={{ width: "18rem" }}>
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
    </div>
  );
};

export default Product;



