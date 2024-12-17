// import RouterProvider from './router/RouterProvider'
// import { GlobalStyles } from './components/styled/GlobalStyles'
// import { Provider } from 'react-redux'
// import store from './store'
// import './app.css'
// function App() {

//   return (
//     <>
//      <Provider store={store}>
//        <GlobalStyles />
//        <RouterProvider />
//      </Provider>
//     </>  
   
   
//   )
// }

// export default App


import RouterProvider from './router/RouterProvider';
import { GlobalStyles } from './components/styled/GlobalStyles';
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext'; 
import store from './store'
import './app.css';

function App() {
  return (
    <Provider store={store}>
     <AuthProvider>
      <GlobalStyles />
      <RouterProvider />
     </AuthProvider>
    </Provider>
 
  );
}

export default App;
