import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { JerseyList } from "../components/jerseys/Jerseys"
import { CreateJersey } from "../components/jerseys/CreateJersey"
import { JerseyUpdate } from "../components/jerseys/JerseyUpdate"
import { MyJerseys } from "../components/jerseys/MyJerseys"
import { CreateComment } from "../components/jerseys/JerseyComments"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<JerseyList />} />
            <Route path="/create" element={<CreateJersey />} />
            <Route path="/collections" element={<MyJerseys />} />
            <Route element={<Authorized />}>
                <Route path="/:jerseyId/edit" element={<JerseyUpdate />} />
                <Route path="/:jerseyId/comments" element={< CreateComment />} />

            </Route>
        </Routes>
    </>
}