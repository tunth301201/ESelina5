import axios from 'axios';

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//   },
// };

// =============Product=================
export const getAllProducts = async () => {
  return await axios.get("http://localhost:4000/product")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getOneProduct = async (productId) => {
  return await axios.get(`http://localhost:4000/product/${productId}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getProductsByTag = async (tagId) => {
  return await axios.get(`http://localhost:4000/product/tag/${tagId}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}



// ==============User Product Relationship======================
export const getProductRating = async (productId) => {
  return await axios.get(`http://localhost:4000/user-product-relationship/rating/${productId}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}


// =====================Product Product Relationship===================
export const getProductProductRelationship = async (productId) => {
  return await axios.get(`http://localhost:4000/product-product-relationship/${productId}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

// ==========================Cart===============================
export const getCartByUserId = async () => {
  return await axios.get(`http://localhost:4000/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const addProductToCart = async (addCartItem) => {
  console.log("cart item ", addCartItem)
  return await axios.post(`http://localhost:4000/cart`, addCartItem, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

// =============================Order=====================

export const createOrder = async (createOrderDto) => {
  console.log(createOrderDto);
  return await axios.post(`http://localhost:4000/order`, createOrderDto, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getOrderByUserId = async () => {
  return await axios.get(`http://localhost:4000/order/listUserOrders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}


export const getOrderByOrderId = async (orderId) => {
  return await axios.get(`http://localhost:4000/order/orderItems/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then(res => {
      console.log ("back end", res.data);
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

// ===================Category=====================
export const getAllCategories = async () => {
  return await axios.get("http://localhost:4000/category")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}



