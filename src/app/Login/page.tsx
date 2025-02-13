'use client';
import { FC, useState, ChangeEvent } from 'react';
import { useAuth } from '../../Context/AuthContext';

interface FormData {
  name: string;
  email: string;
}

const Login: FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email } = formData;
    await login(name, email);
  };

  return (
    <div className="flex flex-col h-full max-h-[100dvh] w-[80%] max-w-[400px] justify-center align-middle text-center mx-auto gap-3">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
