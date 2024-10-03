import {Routes, Route} from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import UsersInfo from "./components/UsersInfo";
import NewUser from "./components/NewUser";

function App() {
    return (
        <Routes>
            <Route path="/pizza-soft" element={<MainPage/>}/>
            <Route path="/pizza-soft/сотрудник/:id/:name" element={<UsersInfo/>}/>
            <Route path="/pizza-soft/новый сотрудник" element={<NewUser/>}/>
        </Routes>
    );
}

export default App;
