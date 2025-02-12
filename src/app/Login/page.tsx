import { FC, useState, ChangeEvent } from 'react';
import { login } from '../../services/api';

interface FormData {
  name: string;
  email: string;
}

interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<LoginProps> = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { name, email } = formData;
    const response = await login(name, email);
    if (response.success) {
      setLoggedIn(true);
    }
  };

  return (
    <form onSubmit={handleLogin} className="m-[20dvw] flex flex-col space-y-4">
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
  );
};

export default Login;
