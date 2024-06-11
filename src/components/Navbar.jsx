import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/reducers/userReducer';
import { clearTasks } from '../redux/reducers/taskReducer';

const Navbar = () => {
    const user = useSelector((state) => state.user?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        dispatch(clearUser());
        dispatch(clearTasks());
        toast.success("Logged out successfully");
        navigate('/');
    };

    return (
        <div className='flex justify-between items-center lg:px-8 px-4 py-3 shadow-lg bg-gradient-to-r from-purple-600 to-blue-500'>
            <div className='flex items-center'>
              
                <h1 className='text-2xl font-bold text-white'>Tikur Creatives</h1>
            </div>
            {user && (
                <button 
                    title='Logout' 
                    onClick={handleLogout} 
                    className='border border-white px-4 py-2 rounded-full font-semibold text-white bg-opacity-30 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:scale-105'
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;
