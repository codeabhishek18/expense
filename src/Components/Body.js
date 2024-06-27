import RegisterUser from "./RegisterUser";
import Test from "./Test";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () =>
{

    const appRoute = createBrowserRouter([
        {
            path: '/',
            element: <RegisterUser/>
        },
        {
            path: '/home',
            element: <Test/>
        }])

        return(
            <div>
                <RouterProvider router={appRoute}/>
            </div>
        )
}

export default Body;