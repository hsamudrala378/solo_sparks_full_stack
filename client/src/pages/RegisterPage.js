import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            alert('Registered successfully!');
            navigate('/login');
        } catch (err) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-yellow-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">📝 Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border px-3 py-2 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border px-3 py-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border px-3 py-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-pink-600 hover:underline hover:text-pink-800"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}
