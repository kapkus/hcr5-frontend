import { createBrowserRouter } from "react-router-dom";
import Login from "../../components/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import { getAccessToken } from "../../utils/utils";
import Dashboard from "../Dashboard/Dashboard";

const isAuthenticated = () => {
    return !!getAccessToken();
}

const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login />,
            index: true
        },
        {
            element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />
                },
            ]
        },
        {
            path: '*',
            element: <h1>404 - Not found</h1>
        }
    ]
);

export default router;