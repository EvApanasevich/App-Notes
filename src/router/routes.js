import Notes from "../pages/notes/Notes";
import Login from "../pages/login/Login";

export const privateRoutes = [
    {path: '/notes', element: Notes, exact: true},
    {path: '/', element: Notes, exact: true},
]

export const publicRoutes = [
    {path: '/login', element: Login, exact: true},
]