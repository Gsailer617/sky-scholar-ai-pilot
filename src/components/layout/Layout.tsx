
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ showHeader = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
