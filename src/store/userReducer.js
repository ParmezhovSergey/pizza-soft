import {getUser} from "../api/api";

const FETCH_USERS = "FETCH_USERS";
const SET_ID = 'SET_ID'
const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_PHONE = 'CHANGE_PHONE';
const CHANGE_BIRTHDAY = 'CHANGE_BIRTHDAY';
const CHANGE_ROLE = 'CHANGE_ROLE';
const CHANGE_ISARCHIVE = 'CHANGE_ISARCHIVE';

const initialState = {
    users: [],                  //все сотрудники
    user:                       //объект для редактирования
        {
            "id": null,
            "name": "",
            "isArchive": null,
            "role": "",
            "phone": "",
            "birthday": ""
        },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.users,
            };
        case SET_ID:
            return {
                ...state,
                id: state.user.id = action.dataUserId
            };
        case CHANGE_NAME:
            return {
                ...state,
                name: state.user.name = action.dataUserName
            };
        case CHANGE_PHONE:
            return {
                ...state,
                phone: state.user.phone = action.dataUserPhone
            };
        case CHANGE_BIRTHDAY:
            return {
                ...state,
                birthday: state.user.birthday = action.dataUserBirthday
            };
        case CHANGE_ROLE:
            return {
                ...state,
                role: state.user.role = action.dataUserRole
            };
        case CHANGE_ISARCHIVE:
            return {
                ...state,
                isArchive: state.user.isArchive = action.dataUserIsArchive
            };

        default:
            return state
    }
}

//получение всех сотрудников
export const setFetchUsers = (users) => ({
    type: FETCH_USERS,
    users,
});
//получение id сотрудника
export const setUserId = (dataUserId) => ({
    type: SET_ID,
    dataUserId
});
//редактирование имени сотрудника
export const setChangeName = (dataUserName) => ({
    type: CHANGE_NAME,
    dataUserName
});
//редактирование телефона сотрудника
export const setChangePhone = (dataUserPhone) => ({
    type: CHANGE_PHONE,
    dataUserPhone
});
//редактирование даты рождения сотрудника
export const setChangeBirthday = (dataUserBirthday) => ({
    type: CHANGE_BIRTHDAY,
    dataUserBirthday
});
//редактирование должности сотрудника
export const setChangeRole = (dataUserRole) => ({
    type: CHANGE_ROLE,
    dataUserRole
});
//редактирование архива
export const setChangeIsArchive = (dataUserIsArchive) => ({
    type: CHANGE_ISARCHIVE,
    dataUserIsArchive
});
//получение всех сотрудников
export const fetchUsers = () => {
    return async (dispatch) => {
        const response = await getUser();
        dispatch(setFetchUsers(response));
    };
};

export default userReducer;