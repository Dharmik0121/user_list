import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    // Filter users based on search query
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
    });
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Redirect to the login page
        navigate("/");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between p-2">
                <h2 className="text-2xl font-bold mb-6">Users List</h2>
                <button className=" cursor-pointer bg-black text-white px-6 hover:bg-gray-800 cursor-pointer rounded-md" onClick={handleLogout}>Logout</button>
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Users List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} onDelete={handleDelete} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-4">
                <motion.button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                    whileTap={{ scale: 0.95 }}
                >
                    Previous
                </motion.button>
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                <motion.button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                    whileTap={{ scale: 0.95 }}
                >
                    Next
                </motion.button>
            </div>
        </div>
    );
};

export default UserList;