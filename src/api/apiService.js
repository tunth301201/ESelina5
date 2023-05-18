import axios from 'axios';

// const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//     },
//   };

// ==========Category===================
  export const getAllCategories = async () => {
    return await axios.get("http://localhost:4000/category")
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }
  

  export const createCategory = async (categoryData) => {
    return await axios.post("http://localhost:4000/category", categoryData, {
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

  export const updateCategory = async (id, updateCategoryData) => {
    return await axios.put(`http://localhost:4000/category/${id}`, updateCategoryData, {
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

  export const deleteOneCategory = async (id) => {
    return await axios.delete(`http://localhost:4000/category/${id}`, {
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

 

//================Product=============================
  export const getAllProducts = async () => {
    return await axios.get("http://localhost:4000/product")
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }

  export const getOneProduct = async (id) => {
    return await axios.get(`http://localhost:4000/product/${id}`)
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }

  export const deleteOneProduct = async (id) => {
    return await axios.delete(`http://localhost:4000/product/${id}`, {
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
  
  export const getProductsByCollectionId = async (tagId) => {
    return await axios.get(`http://localhost:4000/product/tag/${tagId}`)
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }



  // ======================User =================
  export const getAllUsers = async () => {
    return await axios.get("http://localhost:4000/user", {
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

  export const deleteOneUser = async (id) => {
    return await axios.delete(`http://localhost:4000/user/${id}`, {
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

  // ==================Promotion===================
  export const getAllPromorions = async () => {
    return await axios.get("http://localhost:4000/promotion")
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }

  export const createPromotion = async (promotionData) => {
    return await axios.post("http://localhost:4000/promotion", promotionData, {
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

  export const getOnePromotion = async (id) => {
    return await axios.get(`http://localhost:4000/promotion/${id}`)
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }

  export const deleteOnePromotion = async (id) => {
    return await axios.delete(`http://localhost:4000/promotion/${id}`, {
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

// =========================User======================
export const createUser = async (createUserDto) => {
  return await axios.post("http://localhost:4000/user", createUserDto, {
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

export const getUserById = async (id) => {
  return await axios.get(`http://localhost:4000/user/${id}`,{
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

export const changPassword = async (changePasswordDto) => {
  return await axios.put("http://localhost:4000/user/change-password", changePasswordDto, {
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

// ================Order==============
export const getAllOrders = async () => {
  return await axios.get(`http://localhost:4000/order`,{
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

export const checkExistProductInOrders = async (id) => {
  return await axios.get(`http://localhost:4000/order/check-exist-in-orders/${id}`,{
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


export const updateOrderStatus = async (idOrder) => {
  return await axios.put(`http://localhost:4000/order/updateOrderStatus/${idOrder}`, {}, {
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

// ===============Dashboard===================
export const getTotalBudget = async () => {
  return await axios.get("http://localhost:4000/product/product/totalBudget")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getFiveLatestProducts = async () => {
  return await axios.get("http://localhost:4000/product/product/fiveLatestProducts")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getTotalUser = async () => {
  return await axios.get("http://localhost:4000/user/user/totalUser")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getTotalUserThisMonth = async () => {
  return await axios.get("http://localhost:4000/user/user/totalUserThisMonth")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getTotalProfit = async () => {
  return await axios.get("http://localhost:4000/order/order/totalProfit")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getTotalProfitByMonth = async () => {
  return await axios.get("http://localhost:4000/order/order/totalByMonth")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}

export const getSixLatestOrder = async () => {
  return await axios.get("http://localhost:4000/order/order/sixLastestOrders")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err)
    })
}