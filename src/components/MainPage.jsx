import React from "react";
import UsersList from "./UsersList";
import style from './MainPage.module.css';
import pizzasoft from './../img/pizzasoft.png';


const MainPage = () => {
    return (
        <div>
            <div className={style.header}>
                <img src={pizzasoft} alt="логотип" className={style.logo}/>
            </div>
            <div className={style.users}>
                <UsersList/>
            </div>

        </div>
    );
};

export default MainPage;