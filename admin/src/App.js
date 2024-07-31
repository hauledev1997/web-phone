import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import Products from './pages/product/Products';
// import Chat from './pages/chatroom/Chat';
import DashBoard from './pages/dashboard/DashBoard';
import NewProduct from './pages/newProduct/NewProduct';
import EditProduct from './pages/editProduct/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/products' element={<Products />} />
        {/* <Route path="/chatrooms" element={<Chat />} /> */}
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/edit-product/:ProdId' element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
