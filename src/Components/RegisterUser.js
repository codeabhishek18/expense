import { useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

const RegisterUser = () =>
{
    const [ isSignIn, setSignIn ] = useState(true);
    const [ form, setForm ] = useState({name:'', email:'' , password:''});
    const { showIncomes, showExpenses, loginUser, signUpUser, deleteUser } = useGlobalContext();
    const navigate = useNavigate();

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setForm({...form, [name] : value});
    }

    function validate(success, token)
    {
        console.log(success, token);
        return new Promise((resolve, reject) =>
        {
            if(success === true)
            {
                resolve(token)
            }
            else
            {
                reject(new Error('Token failed'))
            }
        })
    }

    const handleClick = async (e) =>
    {
        e.preventDefault();
        if(isSignIn)
        {
            try
            {
                const response = await loginUser(form);
                console.log(response);
                localStorage.setItem('token', response.token);
                // const userToken = localStorage.getItem('token');
                if(response.success)
                    navigate('/home')
                // console.log(userToken);
                // showIncomes(userToken);
                // showExpenses(userToken);
                // validate(response.success, userToken)
                // .then((userToken) =>
                // {
                //     navigate('/home')
                //     console.log(userToken);
                //     showIncomes(userToken);
                //     showExpenses(userToken);
                // });
            }
            catch(error)
            {
                console.log(error);
            }
        }

        if(!isSignIn)
        {
            try
            {
                signUpUser(form);
                setForm({name:'', email:'' , password:''})
                setSignIn(true);
            }
            catch(error)
            {
                console.log(error);
            }
        }

    }

    return(
         <div className="shadow flex flex-col justify-center bg-gradient-to-bl from-black to-blue-950 items-center h-screen w-screen p-4">
            <div className="flex flex-col justify-between items-center bg-white p-4 py-6 rounded-md h-72 w-84">
                <div className="flex mb-2 bg-black bg-opacity-10 rounded-xl text-xs">
                    <label className="px-2 py-1 rounded-xl" style={{ backgroundColor: isSignIn ? 'rgb(21,128,61)' : '', color: isSignIn ? 'white' : 'black' }}><button onClick={()=>setSignIn(true)}>Sign In</button></label>
                    <label className="px-2 py-1 rounded-xl" style={{ backgroundColor: isSignIn ? '' : 'rgb(21,128,61)', color: isSignIn ? 'black' : 'white'}}><button onClick={()=>setSignIn(false)}>Sign Up</button></label>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                    { !isSignIn ? <input className="p-2 my-1 w-72 bg-black bg-opacity-10" name="name" value={form.name} placeholder="Enter name" onChange={handleChange}/> : <label className="font-bold mb-4 text-blue-950 text-lg text-center">Finance Tracker</label>}
                    <input className="p-2 my-1 w-72 bg-black bg-opacity-10" name="email" value={form.email} placeholder="Enter email" onChange={handleChange}/>
                    <input className="p-2 my-1 w-72 bg-black bg-opacity-10" name="password" value={form.password} placeholder="Enter password" onChange={handleChange}/>
                    <button className="p-2 my-1 bg-green-700 text-white rounded-md" onClick={handleClick}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
                    { isSignIn && <label className="text-xs text-center my-1">New User? <span  onClick={()=>setSignIn(false)} className="text-blue-700 hover:underline cursor-pointer">Register now!</span></label> }
                    { !isSignIn && <label className="text-xs text-center my-1">Already a user? <span onClick={()=>setSignIn(true)} className="text-blue-700 hover:underline cursor-pointer">Sign In now!</span></label> }
                </div>
            </div>
        </div>
    )
} 

export default RegisterUser;