import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TaskHeader = ({ setAddModalOpen }) => {
    const user = useSelector((state) => state.user.user);

    const [taskCreated, setTaskCreated] = useState("");
    const [taskCompleted, setTaskCompleted] = useState("");

    useEffect(() => {
        if (user) {
            setTaskCreated(user.taskCreated <= 9 ? "0" + user.taskCreated : user.taskCreated);
            setTaskCompleted(user.taskCompleted <= 9 ? "0" + user.taskCompleted : user.taskCompleted);
        }
    }, [user]);

    return (
        <div className='relative w-full'>
            <div className='flex justify-end mb-4'>
                <button 
                    onClick={() => setAddModalOpen(true)} 
                    className='bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-slate-700 transform transition-transform hover:scale-105'
                >
                    Add Task
                </button>
            </div>
            <div className='flex'>
                <div className='w-1/2 flex flex-col items-center justify-center border rounded-lg bg-[#6d4e43] text-white p-4 shadow-lg transform transition-transform hover:scale-105 m-2'>
                    <h3 className='text-4xl font-bold'>{taskCreated}</h3>
                    <h6 className='text-xl font-semibold text-center'>Task Created</h6>
                </div>
                <div className='w-1/2 flex flex-col items-center justify-center border rounded-lg bg-[#284e43] text-white p-4 shadow-lg transform transition-transform hover:scale-105 m-2'>
                    <h3 className='text-4xl font-bold'>{taskCompleted}</h3>
                    <h6 className='text-xl font-semibold text-center'>Task Completed</h6>
                </div>
            </div>
        </div>
    );
};

export default TaskHeader;
