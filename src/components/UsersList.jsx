import React, {useState} from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchUsers} from "../store/userReducer";
import UserCard from './UserCard';
import style from './UserList.module.css';

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userReducer.users);
    const usersLocal = JSON.parse(localStorage.getItem("dataUser"))
    const usersFilter = JSON.parse(localStorage.getItem("data"))

    const [userState, setUserState] = useState(usersLocal)
    const [userName, setUserName] = useState('')
    const [birthdayUser, setBirthdayUser] = useState('')
    const [userRole, setUserRole] = useState('')
    const [isArchiveUser, setIsArchiveUser] = useState(null)

//загрузка всех пользователей
    useEffect(() => {
        if ((usersLocal === null) || (usersFilter === null)) {
            dispatch(fetchUsers())
        }
    }, []);

//фильтрация по имени
    useEffect(() => {
        if (usersFilter !== null) {
            const newUser = usersFilter.filter(i => i.name.toLowerCase().includes(userName.toLowerCase()))
            setUserState(newUser)
        }
    }, [userName]);

//фильтрация по дате рождения
    useEffect(() => {
        if (usersFilter !== null) {
            const newUser = usersFilter.filter(i => i.birthday.includes(birthdayUser))
            setUserState(newUser)
        }
    }, [birthdayUser]);

//фильтрация по должности
    useEffect(() => {
        if (usersFilter !== null) {
            const newUser = usersFilter.filter(i => i.role.includes(userRole))
            setUserState(newUser)
        }
    }, [userRole]);

//фильтрация архив
    useEffect(() => {
        if ((usersLocal !== null) && (isArchiveUser === true)) {
            const newUser = usersFilter.filter(i => i.isArchive === isArchiveUser)
            setUserState(newUser)
        } else {
            setUserState(usersFilter)
        }
    }, [isArchiveUser]);

//сброс фильтров
    const resetFilter = (e) => {
        setUserState(usersLocal)
        e.preventDefault()
        setUserName('')
        setBirthdayUser('')
        setUserRole('')
        setIsArchiveUser(null)
    }
    const clickName = () => {
        setBirthdayUser('')
        setUserRole('')
        setIsArchiveUser(null)
    }
    const clickBirthday = () => {
        setUserName('')
        setUserRole('')
        setIsArchiveUser(null)
    }
    const clickRole = () => {
        setUserName('')
        setBirthdayUser('')
        setIsArchiveUser(null)
    }
    const clickArchive = () => {
        setUserName('')
        setBirthdayUser('')
        setUserRole('')
    }

    const Card = userState !== null
        ? userState.map((p) => (
            <UserCard
                key={p.id}
                id={p.id}
                name={p.name}
                role={p.role}
                phone={p.phone}
            />))
        : users.map((p) => (
            <UserCard
                key={p.id}
                id={p.id}
                name={p.name}
                role={p.role}
                phone={p.phone}
            />
        ));

    return (
        <div>
            <div className={style.filter}>
                <div className={style.name}>
                    Фильтры поиска:
                </div>
                <div className={style.name}>
                    <input
                        type="text"
                        placeholder='Имя'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onClick={clickName}
                    />
                </div>
                <div className={style.name}>
                    <input
                        type="text"
                        placeholder='Дата рождения'
                        value={birthdayUser}
                        onChange={(e) => setBirthdayUser(e.target.value)}
                        onClick={clickBirthday}
                    />
                </div>
                <div>
                    <select
                        className={style.select}
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        onClick={clickRole}
                    >
                        <option value=''>Должность</option>
                        <option value='cook'>Повар</option>
                        <option value='waiter'>Официант</option>
                        <option value='driver'>Водитель</option>
                    </select>
                </div>
                <div className={style.checkbox}>
                    <input
                        type={"checkbox"}
                        checked={isArchiveUser}
                        onChange={(e) => setIsArchiveUser(e.target.checked)}
                        onClick={clickArchive}
                    />
                    в архиве
                </div>
                <div className={style.name}>
                    <button className={style.btnReset} onClick={resetFilter}>Сбросить фильтры</button>
                </div>
            </div>

            <div className={style.nameLink}>
                <button className={style.btn}>
                    <NavLink to="/pizza-soft/новый-сотрудник" style={{textDecoration: 'none', color: 'inherit'}}>
                        Добавить сотрудника
                    </NavLink>
                </button>
            </div>

            <div>
                <div className={style.title}>
                    Список сотрудников
                </div>
                <div className={style.card}>
                    {Card}
                </div>
            </div>
        </div>
    );
};

export default UsersList;