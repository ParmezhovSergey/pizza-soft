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

    const [userState, setUserState] = useState(usersLocal)
    const [userName, setUserName] = useState('')
    const [birthdayUser, setBirthdayUser] = useState('')
    const [userRole, setUserRole] = useState('')
    const [isArchiveUser, setIsArchiveUser] = useState(false)

//загрузка всех пользователей
    useEffect(() => {
        if ((usersLocal === null) || (usersLocal.length === 0)) {
            dispatch(fetchUsers())
            window.location.reload();
        }
    }, []);

//фильтрация по имени
    useEffect(() => {
        if (!!usersLocal) {
            const newUser = userState.filter(i => i.name.toLowerCase().includes(userName.toLowerCase()))
            setUserState(newUser)
        }
    }, [userName]);

//фильтрация по дате рождения
    useEffect(() => {
        const newUser = userState.filter(i => i.birthday.includes(birthdayUser))
        setUserState(newUser)
    }, [birthdayUser]);

//фильтрация по должности
    useEffect(() => {
        const newUser = userState.filter(i => i.role.includes(userRole))
        setUserState(newUser)
    }, [userRole]);

//фильтрация архив
    const btn = () => {
        const newUser = userState.filter(i => i.isArchive !== isArchiveUser)
        setUserState(newUser)
        setIsArchiveUser(true)
    }

//сброс фильтров
    const resetFilter = (e) => {
        setUserState(usersLocal)
        // dispatch(fetchUsers())
        e.preventDefault()
        setUserName('')
        setBirthdayUser('')
        setUserRole('')
        setIsArchiveUser(false)
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
                    />
                </div>
                <div className={style.name}>
                    <input
                        type="text"
                        placeholder='Дата рождения'
                        value={birthdayUser}
                        onChange={(e) => setBirthdayUser(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className={style.select}
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
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
                        onChange={(e) => btn(e.target.checked)}
                    />
                    в архиве
                </div>
                <div className={style.name}>
                    <button className={style.btn} onClick={resetFilter}>Сбросить фильтры</button>
                </div>
            </div>

            <div className={style.nameLink}>
                <button className={style.btn}>
                    <NavLink to="/pizza-soft/новый сотрудник" style={{textDecoration: 'none', color: 'inherit'}}>
                        Добавить сотрудника
                    </NavLink>
                </button>
            </div>

            <div>
                {userState?.length > 0 ? (
                    <div className={style.title}>
                        Список сотрудников
                    </div>
                ) : (
                    <div className={style.titleEmpty}>
                        Список сотрудников пуст (сбросьте фильтры)
                    </div>
                )}
                <div className={style.card}>
                    {Card}
                </div>
            </div>
        </div>
    );
};

export default UsersList;