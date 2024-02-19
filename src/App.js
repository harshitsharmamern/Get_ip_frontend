import './App.css';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import UserComponent from './Controller/user_home/UserComponent';
import AdminPage from './Controller/user_home/AdminPage';

function App() {
  return (
    <>
      <BrowserRouter> 

<Routes>
<Route exact path="/" index element={ <UserComponent/>} />
       
<Route exact path="/admin" index element={ <AdminPage/>} />


        
</Routes>
</BrowserRouter>
    </>
  );
}

export default App;
