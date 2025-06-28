import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  uid: null,
  displayName: "",
  email: "",
  role: "",
  profileImage: "",
}

const loginSlice = createSlice({
  name: "logger",
  initialState: initialState,
  reducers: {
    loginToggler(state, action) {
     state.logged = !state.logged
     state.role = action.payload
    }
  }
})

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//    firstName: "Anonim",
//    lastName: "Anonimi"
//   },
//   reducers: {
//     updateUserFullName(state, action) {
//       state.firstName = action.payload.firstName;
//       state.lastName = action.payload.lastName;
//     },
//   }
// })

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       return { ...state, ...action.payload };
//     },
//     setProfileImage: (state, action) => {
//       state.profileImage = action.payload;
//     },
//     logoutUser: () => initialState,
//   },
// });

const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    data: null,
    loading: false,
    error: null,
    profileImage: null
  },
  reducers: {
    setTeacherData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfileImage: (state, action) => {
      if (state.data) {
        state.data.profileImage = action.payload;
      }
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    
    
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    selectedBooks: [],
  }, 
  reducers: {
    addBookToCart: (state, action) => {
      const { id, title, author, price, image } = action.payload;
      state.selectedBooks.push({
        id,
        title,
        author,
        price,
        image,
        quantity: 1,
        initialPrice: price,
      });
    },
    removeBookFromCart: (state, action) => {
      console.log(action.payload);
      state.selectedBooks = state.selectedBooks.filter(book => book.id !== action.payload)
    },
    increaseThePrice: (state, action) => {
      const index = action.payload;
      const book = state.selectedBooks[index];
      book.quantity += 1;
      const initialPrice = book.initialPrice || 0; // Make 
      const newPrice = initialPrice * book.quantity;
      book.price = newPrice;
    },
    decreaseThePrice: (state, action) => {
      const index = action.payload;
      const book = state.selectedBooks[index];
      if (book.quantity > 0) {
        book.quantity -= 1;
        const initialPrice = book.initialPrice || 0;
        const newPrice = initialPrice * book.quantity;
        book.price = newPrice;
      }
    },
    removeBookIfQuantityZero: (state, action) => {
      const index = action.payload;
      const book = state.selectedBooks[index];
      if (book.quantity === 0) {
        state.selectedBooks.splice(index, 1);
      }
    },
      setCertificates: (state, action) => {
      state.certificates = action.payload;
    },
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
    }
    
  }
})
 

// const store = configureStore({
//   reducer: {login: loginSlice.reducer}
// })
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    cart: cartSlice.reducer, 
    teacher: teacherSlice.reducer
    // user: userSlice.reducer
  }
})
// In case that I have only one reducer so I do not need a map or reducers

// Here I am exploring the actions, I do have only one actions which is the loginToggler that will work as a switch

export const loginActions = loginSlice.actions
// export const { updateUserFullName, setProfileImage, logoutUser } = userSlice.actions;
export const { setTeacherData, setLoading, setError, updateProfileImage, setProfileImage, setCertificates, addCertificate } = teacherSlice.actions;
export const { addBookToCart, removeBookFromCart, increaseThePrice, decreaseThePrice, removeBookIfQuantityZero } = cartSlice.actions;
export const selectCart = (state) => state.cart
export default store