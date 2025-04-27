import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

type FormValues = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

const schema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', {
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        password: data.password,
      });

      console.log('Registration successful:', response.data);
      alert(`Registration successful!\nWelcome, ${data.first_name} ${data.last_name}`);
      navigate('/');
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert(`Registration failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" {...register('first_name')} className="form-control" />
          <small className="text-danger">{errors.first_name?.message}</small>
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" {...register('last_name')} className="form-control" />
          <small className="text-danger">{errors.last_name?.message}</small>
        </div>
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
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Register;
