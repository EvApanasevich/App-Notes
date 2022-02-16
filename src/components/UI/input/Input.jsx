import React from 'react';
import s from './Input.module.css'

const Input = ({...props}) => {
    return (
       <input maxLength="70" className={s.myInput} {...props}/>
    );
};

export default Input;