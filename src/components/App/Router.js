import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import { getAccessToken } from "../../utils/utils";
import ControlPanel from "../ControlPanel/ControlPanel";

const isAuthenticated = () => {
    console.log(!!getAccessToken())
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
                    element: <ControlPanel />
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