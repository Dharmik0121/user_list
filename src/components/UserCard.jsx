import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';


const UserCard = ({ user, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-user/${user.id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://reqres.in/api/users/${user.id}`);
            onDelete(user.id);
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    return (
        <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 max-w-xs md:max-w-sm lg:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500"
            />
            <h3 className="text-xl font-bold text-center mt-4">{`${user.first_name} ${user.last_name}`}</h3>
            <p className="text-gray-500 text-center">{user.email}</p>

            <div className="flex justify-center space-x-4 mt-6">
                <motion.button
                    onClick={handleEdit}
                    className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none"
                    whileTap={{ scale: 0.95 }}
                >
                    Edit
                </motion.button>
                <motion.button
                    onClick={handleDelete}
                    className=" cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                    whileTap={{ scale: 0.95 }}
                >
                    Delete
                </motion.button>
            </div>
        </motion.div>
    );
};

export default UserCard;

// import React from "react";

// const UserCard = ({ user, onDelete }) => {
//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md">
//             <img
//                 src={user.avatar}
//                 alt={`${user.first_name} ${user.last_name}`}
//                 className="w-24 h-24 mx-auto rounded-full"
//             />
//             <h3 className="text-xl font-semibold mt-4 text-center">
//                 {`${user.first_name} ${user.last_name}`}
//             </h3>
//             <p className="text-gray-600 text-center">{user.email}</p>
//             <div className="flex justify-center mt-4 space-x-2">
//                 <button
//                     onClick={() => onDelete(user.id)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserCard;