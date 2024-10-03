import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import style from './NewUser.module.css'
import pizzasoft from "../img/pizzasoft.png";
import InputMask from 'react-input-mask';
import {
    setChangeName,
    setChangePhone,
    setChangeBirthday,
    setChangeRole,
    setChangeIsArchive,
    setUserId,
} from "../store/userReducer";

const NewUser = () => {
    const dispatch = useDispatch();
    const newUser = useSelector((state) => state.userReducer.user)
    const users = (JSON.parse(localStorage.getItem("dataUser")))
    const navigate = useNavigate();

    const [dataUserName, setDataUserName] = useState('') //имя сотрудника
    const [dataUserPhone, setDataUserPhone] = useState('') //телефон сотрудника
    const [dataUserBirthday, setDataUserBirthday] = useState('') //дата рождения сотрудника
    const [dataUserRole, setDataUserRole] = useState('') //должность сотрудника
    const [dataUserIsArchive, setDataUserIsArchive] = useState(false) //в архиве
    const [modal, setModal] = useState(false)

    const secureID = crypto.randomUUID(); //id сотрудника
    const id = secureID.replace(/[^0-9]/g, "")

    useEffect(() => {
        dispatch(setUserId(+id))
        dispatch(setChangeName(dataUserName))
        dispatch(setChangePhone(dataUserPhone))
        dispatch(setChangeBirthday(dataUserBirthday))
        dispatch(setChangeRole(dataUserRole))
        dispatch(setChangeIsArchive(dataUserIsArchive))
    }, [dataUserName, dataUserPhone, dataUserBirthday, dataUserRole, dataUserIsArchive]);

    useEffect(() => {
        setTimeout(() => setModal(false), 3000)
    }, [modal]);

    const btn = () => {
        setModal(true)
        users.push(newUser)
        return localStorage.setItem("dataUser", JSON.stringify(users))
    }

    const btnCancel = () => {
        navigate('/pizza-soft')
    }

    return (
        <div>
            <div className={style.header}>
                <img src={pizzasoft} alt="логотип" className={style.logo}/>
            </div>

            <div className={style.users}>
                <div>
                    <button className={style.back}>
                        <NavLink to="/pizza-soft" style={{textDecoration: 'none', color: 'inherit'}}>
                            Назад
                        </NavLink>
                    </button>
                </div>

                <div className={style.title}>
                    Новый сотрудник
                </div>
                <div className={style.list}>
                    <div className={style.name}>
                        Имя сотрудника -
                        <input
                            type="text"
                            placeholder='Имя'
                            value={dataUserName}
                            onChange={(e) => setDataUserName(e.target.value)}
                            className={style.input}
                        />
                    </div>
                    <div className={style.name}>
                        Телефон -
                        <InputMask
                            mask="+7\ (999) 999-9999"
                            placeholder='+7 (999) 999-9999'
                            value={dataUserPhone}
                            onChange={(e) => setDataUserPhone(e.target.value)}
                        />
                    </div>
                    <div className={style.name}>
                        Дата рождения -
                        <InputMask
                            mask="99.99.9999"
                            placeholder='дд.мм.гггг'
                            value={dataUserBirthday}
                            onChange={(e) => setDataUserBirthday(e.target.value)}
                        />
                    </div>
                    <div className={style.name}>
                        Должность -
                        <select
                            value={dataUserRole}
                            onChange={(e) => setDataUserRole(e.target.value)}
                        >
                            <option value=''></option>
                            <option value='cook'>Повар</option>
                            <option value='waiter'>Официант</option>
                            <option value='driver'>Водитель</option>
                        </select>
                    </div>
                    <div className={style.checked}>
                        <div className={style.checkedTitle}>
                            В архиве -
                        </div>
                        <input
                            type={"checkbox"}
                            checked={dataUserIsArchive}
                            onChange={(e) => setDataUserIsArchive(e.target.checked)}
                        />
                    </div>
                    <div className={style.name}>
                        <button className={style.btnCancel} onClick={btnCancel}>
                            Отмена
                        </button>
                        <button className={style.btn} onClick={btn}>Сохранить</button>
                    </div>
                </div>
                {modal &&
                < div className={style.modal}>Изменения сохранены</div>
                }
            </div>
        </div>
    )
};

export default NewUser;