import React from 'react';
import s from './Button.module.css'

const Button = ({children, ...props}) => {
    return (
        <button {...props} className={s.myBtn}>
            {children}
        </button>
    );
};

export default Button;