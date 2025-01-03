import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'signup';
    console.log(endpoint)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      if (isLogin) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert('Signup successful! Please log in.');
        setIsLogin(true);
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex w-[100vw] justify-center items-center h-screen bg-gradient-to-r from-[#6b44ad] to-[#e851b4]">
      <div className=" p-8 rounded-xl  w-[40vw] pl-20 pr-20">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          {isLogin ? 'Login' : 'Signup'}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 bg-white text-black h-[6vh]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 bg-white text-black h-[6vh]"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-black text-sm underline mt-4  bg-[#8b47ae] transition duration-200"
        >
          {isLogin
            ? "Don't have an account? Signup"
            : 'Already have an account? Login'}
        </button>
      </div>

      <div className='w-[40vw] h-[60vh]'>
        <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp" alt="" />
      </div>
    </div>
  );
};

export default Auth;
