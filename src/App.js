import './App.css';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import UserComponent from './Controller/user_home/UserComponent';
import Admin_page from './Controller/user_home/Admin_page';

function App() {
  return (
    <>
      <BrowserRouter> 

<Routes>
<Route exact path="/" index element={ <UserComponent/>} />
       
<Route exact path="/admin" index element={ <Admin_page/>} />


        
</Routes>
</BrowserRouter>
    </>
  );
}

export default App;
