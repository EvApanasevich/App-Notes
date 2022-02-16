import React, { useContext } from 'react';
import Button from "../button/Button";
import { AuthContext } from "../../../context";
import s from "../../UI/navbar/Navbar.module.scss";

const Navbar = () => {
   const { isAuth, setIsAuth } = useContext(AuthContext)

   const logout = () => {
      localStorage.removeItem('auth')
      setIsAuth(false)
   }

   return (
      <div className={s.navbar}>
         <div className={s.navbar__container}>
            {isAuth &&
               <Button children={'Logout'} onClick={logout} />
            }
         </div>
      </div>
   );
};

export default Navbar;