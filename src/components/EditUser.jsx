import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://reqres.in/api/users/${id}`);
                setUser(response.data.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://reqres.in/api/users/${id}`, user);
            navigate("/users");
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    return (
        <div className="edit-user p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Edit User</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={user.first_name}
                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={user.last_name}
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <motion.button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
                    whileTap={{ scale: 0.95 }}
                >
                    Update
                </motion.button>
            </form>
        </div>
    );
};

export default EditUser;