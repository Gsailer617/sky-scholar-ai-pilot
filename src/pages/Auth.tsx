
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Header from '@/components/layout/Header';

const Auth = () => {
  return (
    <div className="min-h-screen">
      <Header showNav={false} />
      <div className="container max-w-md py-12 px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to Sky Scholar</h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
