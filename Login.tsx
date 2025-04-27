import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: data.username,
        password: data.password,
        expiresInMins: 30,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { accessToken, refreshToken, ...userData } = response.data;

      login(userData, accessToken);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" {...register('username')} className="form-control" />
          <small className="text-danger">{errors.username?.message}</small>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" {...register('password')} className="form-control" />
          <small className="text-danger">{errors.password?.message}</small>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
