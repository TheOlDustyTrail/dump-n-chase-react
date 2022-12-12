import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { JerseyList } from "../components/jerseys/Jerseys"
import { CreateJersey } from "../components/jerseys/CreateJersey"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<JerseyList />} />
            <Route path="/create" element={<CreateJersey />} />
            <Route element={<Authorized />}>


            </Route>
        </Routes>
    </>
}