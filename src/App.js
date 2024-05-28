import Home from './routes/home/home.component';

import Navegation from './routes/navigation/navegation.component';

import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


const App = () => {
  return ( //index is an atribute, equal to true
    <Routes>
      <Route path='/' element={<Navegation/>} >
        <Route index element={<Home/>} ></Route>
        <Route path='shop' element={<Shop/>} ></Route>
        <Route path='auth' element={<Authentication/>} ></Route>
        <Route path='checkout' element={<Checkout/>} ></Route>
      </Route>
    </Routes>
  );
};

export default App;
