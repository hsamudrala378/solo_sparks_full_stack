import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">🔐 Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    New to Solo Sparks?{" "}
                    <a
                        href="/register"
                        className="text-purple-600 hover:underline hover:text-purple-800"
                    >
                        Register here
                    </a>
                </p>

            </div>

        </div>

    );
}
