import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { RegisterCredentials } from '../types';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>();

  const onSubmit = async (data: RegisterCredentials) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: unknown) {
      const err = error as { userMessage?: string; message?: string };
      const message = err.userMessage || err.message || 'Registration failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <h1 className="font-serif text-4xl text-stone-900">
              Seasons<span className="text-gold-500">.</span>
            </h1>
          </Link>
          <p className="text-stone-500 mt-2">Begin your journey</p>
        </div>

        <div className="bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-serif text-stone-900 mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-stone-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-600 hover:text-gold-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
