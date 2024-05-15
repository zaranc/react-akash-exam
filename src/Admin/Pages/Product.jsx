
// import React, { useEffect, useRef, useState } from "react";
// import { base_url, get_product, post_product } from "../../constant";
// import { add_data, get_data } from "../../Api/api";
// // import Producttable from "../Body/Producttable";
// import { Switch } from "@mui/material";
// import axios from "axios";

// const Product = () => {
//   //all products here
//   const [product, setproduct] = useState([]);

//   let productName = useRef();
//   let price = useRef();
//   let desc = useRef();

//   //add product
//   async function addProduct() {
//     let productt = {
//       productName: productName.current.value,
//       productImage:
//       "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
//       price: price.current.value,
//       desc: desc.current.value,
//       available: true,
//     };

//     let res = await add_data(base_url, post_product, productt);
//     console.log(res, "product");
//     setproduct([...product, res.data]);
//   }

//   let getProduct = async () => {
//     let res = await get_data(base_url, get_product);
//     console.log(res, "get product");
//     setproduct(res.data);
//   };

//   //switch
//   let handleSwitch = async (id, available, index) => {
//     console.log(available);

//     let data = product[index];
//     console.log(data);
//     await axios.put(`http://localhost:3001/products/${data.id}`, {
//       ...data,
//       available,
//     });

//     setproduct(
//       product.map((val, ind) => (val.id === id ? { ...data, available } : val))
//     );

//     // console.log(res);
//   };

//   useEffect(() => {
//     getProduct();
//   }, []);

//   console.log(product, "product");

//   return (
//     <div className="row">
//       <div className="col-md-4">
//         <div class="card m-auto" style={{ width: "18rem" }}>
//           <div class="card-body">
//             <div class="form-group">
//               <label for="email">Product Name</label>
//               <input
//                 type="text"
//                 class="form-control"
//                 id="name"
//                 aria-describedby="name"
//                 placeholder="Enter name"
//                 ref={productName}
//               />
//             </div>

//             <div class="form-group">
//               <label for="email">Price</label>
//               <input
//                 type="number"
//                 class="form-control"
//                 id="price"
//                 aria-describedby="price"
//                 placeholder="Enter price"
//                 ref={price}
//               />
//             </div>
//             <div class="form-group">
//               <label for="desc">Description</label>
//               <input
//                 type="text"
//                 class="form-control"
//                 id="desc"
//                 aria-describedby="desc"
//                 placeholder="Enter Description"
//                 ref={desc}
//               />
//             </div>

//             <button type="submit" class="btn btn-primary" onClick={addProduct}>
//               Add
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="col-md-8">
//         {/* <Producttable product={product} /> */}

//         <table class="table ">
//           <thead class="thead-dark">
//             <tr>
//               <th scope="col">id</th>
//               <th scope="col">product Image</th>
//               <th scope="col">product Name</th>
//               <th scope="col">price</th>
//               <th scope="col">Description</th>
//               <th scope="col">available</th>
//             </tr>
//           </thead>
//           <tbody>
//             {product?.map((val, ind) => {
//               return (
//                 <tr>
//                   <td>
//                     <b>{val.id}</b>
//                   </td>
//                   <td>
//                     <img src={val.productImage} width={70} height={70} />
//                   </td>
//                   <td>{val.productName}</td>
//                   <td>{val.price}</td>
//                   <td>{val.desc}</td>
//                   <td>
//                     <Switch
//                       checked={val.available}
//                       onChange={(e) =>
//                         handleSwitch(val.id, e.target.checked, ind)
//                       }
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Product;


import React, { useEffect, useRef, useState } from "react";
import { base_url, get_product, post_product } from "../../constant";
import { add_data, get_data } from "../../Api/api";
import { Switch } from "@mui/material";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const productName = useRef();
  const price = useRef();
  const desc = useRef();

  // Add product
  const addProduct = async () => {
    if (!productName.current.value || !price.current.value || !desc.current.value) {
      setError("All fields are required.");
      return;
    }

    const productData = {
      productName: productName.current.value,
      productImage: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
      price: price.current.value,
      desc: desc.current.value,
      available: true,
    };

    try {
      const res = await add_data(base_url, post_product, productData);
      setProduct([...product, res.data]);
      setMessage("Product added successfully.");
      clearForm();
    } catch (error) {
      setError("Failed to add product.");
    }
  };

  // Get products
  const getProduct = async () => {
    try {
      const res = await get_data(base_url, get_product);
      setProduct(res.data);
    } catch (error) {
      setError("Failed to fetch products.");
    }
  };

  // Switch availability
  const handleSwitch = async (id, available, index) => {
    const data = product[index];
    try {
      await axios.put(`http://localhost:3001/products/${data.id}`, {
        ...data,
        available,
      });

      setProduct(
        product.map((val, ind) => (val.id === id ? { ...data, available } : val))
      );
    } catch (error) {
      setError("Failed to update product availability.");
    }
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    productName.current.value = product.productName;
    price.current.value = product.price;
    desc.current.value = product.desc;
  };

  const updateProduct = async () => {
    if (!productName.current.value || !price.current.value || !desc.current.value) {
      setError("All fields are required.");
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      productName: productName.current.value,
      price: price.current.value,
      desc: desc.current.value,
    };

    try {
      const res = await axios.put(
        `http://localhost:3001/products/${editingProduct.id}`,
        updatedProduct
      );

      setProduct(
        product.map((val) => (val.id === editingProduct.id ? res.data : val))
      );

      setMessage("Product updated successfully.");
      setEditingProduct(null);
      clearForm();
    } catch (error) {
      setError("Failed to update product.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProduct(product.filter((val) => val.id !== id));
      setMessage("Product deleted successfully.");
    } catch (error) {
      setError("Failed to delete product.");
    }
  };

  const clearForm = () => {
    productName.current.value = "";
    price.current.value = "";
    desc.current.value = "";
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card m-auto" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{editingProduct ? "Edit Product" : "Add Product"}</h5>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                ref={productName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                ref={price}
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                className="form-control"
                id="desc"
                placeholder="Enter Description"
                ref={desc}
              />
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {editingProduct ? (
              <>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={updateProduct}
                >
                  Update
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingProduct(null);
                    clearForm();
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={addProduct}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Available</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((val, ind) => (
              <tr key={val.id}>
                <td>
                  <b>{val.id}</b>
                </td>
                <td>
                  <img src={val.productImage} width={70} height={70} alt="Product" />
                </td>
                <td>{val.productName}</td>
                <td>{val.price}</td>
                <td>{val.desc}</td>
                <td>
                  <Switch
                    checked={val.available}
                    onChange={(e) => handleSwitch(val.id, e.target.checked, ind)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditProduct(val)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(val.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;


