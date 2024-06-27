import { useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { HeaderList } from "./HeaderList";
import { useNavigate } from "react-router-dom";

const Header = ({active, setActive}) =>
{
    const navigate = useNavigate();

    const handleLogout = () =>
    {
        localStorage.removeItem("token");
        navigate('/')
    }

    return(
    <div className="h-[100vh]">
        <div className="w-64 list-none h-[100vh] bg-gradient-to-tr from-black to-blue-950 flex flex-col justify-evenly items-center text-xs text-white">
            <div>User profile</div>
            <div className="flex flex-col gap-4">
            {HeaderList.map((item) =>
            (
                <div key={item.id} className="flex text-justify">
                    <span style={{ backgroundColor: item.id === active ? 'white' : '' }} className="h-3 mr-4 w-1 rounded"></span>
                    <li onClick={()=> setActive(item.id)}
                    className="cursor-pointer text-start"
                    >{item.title}</li>
                </div>
            ))}
        </div>
        <label onClick={handleLogout}>Logout</label>
    </div>
</div>
    )
}

export default Header;