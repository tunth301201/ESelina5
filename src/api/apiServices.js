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

export const getFiveProducts = async () => {
  return await axios.get("http://localhost:4000/product/five-products")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getUserBasedProducts = async () => {
  return await axios.get(`http://localhost:4000/user-product-relationship`, {
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


export const getAllUserBasedProducts = async () => {
  return await axios.get(`http://localhost:4000/user-product-relationship/all`, {
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

export const getCollabProducts = async () => {
  return await axios.get(`http://localhost:4000/user-product-collab`, {
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

export const getAllCollabProducts = async () => {
  return await axios.get(`http://localhost:4000/user-product-collab/all`, {
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

export const searchProductResult = async (searchKeyword) => {
  return await axios.get(`http://localhost:4000/product/product/search?keyword=${searchKeyword}`)
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

export const getAllProductProductRelationship = async (productId) => {
  return await axios.get(`http://localhost:4000/product-product-relationship/all/${productId}`)
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

export const updateCart = async (updateCartItem) => {
  return await axios.put(`http://localhost:4000/cart`, updateCartItem, {
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

export const deleteCartItem = async (idCartItem) => {
  return await axios.delete(`http://localhost:4000/cart/${idCartItem}`, {
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

// ======================User======================
export const getUserProfile = async () => {
  return await axios.get(`http://localhost:4000/user/profile/${1}`,{
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

export const updateProfile = async (updateUserDto) => {
  return await axios.put("http://localhost:4000/user", updateUserDto, {
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

// =====================Feedback=====================
export const getFeedbacksByProductId = async (id) => {
  return await axios.get(`http://localhost:4000/feedbacks/${id}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getRatingFeedbacks = async (userId, productId) => {
  return await axios.get(`http://localhost:4000/user-product-relationship/user-rating/${userId}/${productId}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const ratingProduct = async (productId, rating) => {
  return await axios.post(`http://localhost:4000/user-product-relationship`,{
    product_id: productId,
    rating: rating
  },{
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

export const sendFeedback = async (productId, feedbackContent) => {
  return await axios.post(`http://localhost:4000/feedbacks/${productId}`,{
    feedback_content: feedbackContent,
  },{
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

export const getOneFeedbackById = async (id) => {
  return await axios.get(`http://localhost:4000/feedbacks/feedback/${id}`)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}
