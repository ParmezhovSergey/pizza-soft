import {useDispatch, useSelector} from "react-redux";
import style from './UserCard.module.css'
import {NavLink, Link} from "react-router-dom";
import React from "react";

const UserCard = ({name, id, role, phone}) => {

    return (
        <Link to={`/pizza-soft/сотрудник/${id}/${name}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className={style.table}>
                <div className={style.row}>
                    {name}
                </div>
                <div className={style.row}>
                    {role}
                </div>
                <div className={style.phone}>
                    {phone}
                </div>
            </div>
        </Link>
    )
};

export default UserCard;