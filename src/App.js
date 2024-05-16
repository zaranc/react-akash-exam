
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

//admin
import AdminHeader from './Admin/Header/AdminHeader';
import Home from './Admin/Pages/Home';
import Product from './Admin/Pages/Product';
import About from './Admin/Pages/About';
import Contact from './Admin/Pages/Contact';

//user
import UserHome from './User/Pages/Home';
import UserNavbar from './User/Header/UserNavbar';
import UserProduct from './User/Pages/ProductUser';
import UserAbout from './User/Pages/About';
import Users from "./Admin/Pages/Users";
import LoginUser from './componant/UserLogin';
import Login from './componant/Login';
import ProductUser from './User/Pages/ProductUser';



const getRole = () => {
  return localStorage.getItem("role");
};

function App() {

  const role = getRole();
  const location = useLocation();

  // let role = "admin"
  const isLoginPage = location.pathname === "/";

  if (!role || role === "") {
    return (
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (role === "admin") {
    return (
      <>
      <AdminHeader/>
        <div
          className="container"
       
        >
          <Routes>
            <Route path="/product" element={<Product />} />
           
            <Route path="/users" element={<Users />} />

          </Routes>
        </div>
      </>
    );
  }

  if (role === "user") {
    return (
      <>
      <UserNavbar/>
        <div
          className="container"
         
        >
          <Routes>
            <Route path="/productuser" element={<ProductUser />} />
          
          </Routes>
        </div>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
  // if(role==='admin')
  // {
  //   return (
  //     <>
  //      <AdminHeader/>
  //      <Routes>
  //         {/* <Route path='/' exact element={<Home/>}/> */}
  //         <Route path="/users" exact element={<Users/>} />
  //         <Route path='/product' exact element={<Product/>}/>
  //         {/* <Route path='/about' exact element={<About/>}/>
  //         <Route path='/contact' exact element={<Contact/>}/> */}
  //         <Route/>
  //      </Routes>
  //     </>
  //    );
  // }else if(role==='user')
  // {
  //   return( 
  //   <>
  //     <UserNavbar/>
  //     <Routes>
  //         <Route path='/' element={<UserHome/>}/>
  //         <Route path='/product' element={<UserProduct/>}/>
  //         <Route path='/about' element={<UserAbout/>}/>
  //         <Route/>
  //      </Routes>
  //   </>
  //   )
  // }
  // else{
  //   return <h1>Not found</h1>
  // }


export default App;

