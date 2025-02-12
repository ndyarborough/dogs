'use client';
import { FC } from 'react';
import { useAuth } from '@/Context/AuthContext';
import Welcome from './Welcome/page';
import Login from './Login/page';

const Home: FC = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Welcome /> : <Login />;
};

export default Home;
