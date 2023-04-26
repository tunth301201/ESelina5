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
    console.log("get product id service: "+ id)
    return await axios.get(`http://localhost:4000/product/${id}`)
      .then(res => {
          return res;
      })
      .catch(err => {
          console.log(err)
      })
  }

  

  // export const updateProduct = async (id, updateProductData) => {
  //   return await axios.put(`http://localhost:4000/product/${id}`, updateProductData, config)
  //     .then(res => {
  //         return res;
  //     })
  //     .catch(err => {
  //         console.log(err)
  //     })
  // }


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