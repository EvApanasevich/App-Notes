import React, { useContext } from 'react';
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { AuthContext } from "../../context";
import s from "./Login.module.scss";

const Login = () => {
   const { setIsAuth } = useContext(AuthContext)

   const login = (e) => {
      e.preventDefault()
      localStorage.setItem('auth', 'true')
      setIsAuth(true)
   }

   return (
      <div className={s.login}>
         <div className={s.login__container}>
            <h2 className={s.login__container_text}>Please, enter your name and password.</h2>
            <form onSubmit={login} className={s.form}>
               <Input type='text' placeholder='enter login...' />
               <Input type='password' placeholder='enter password...' />
               <Button children='Login' />
            </form>
         </div>
      </div>
   );
};

export default Login;