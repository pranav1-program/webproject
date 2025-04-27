import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFetchUser } from '../hooks/useFetchUser';
import UserProfile from './UserProfile';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { data: userData, isLoading, isError } = useFetchUser(user?.id);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {user?.firstName && <p>Welcome, {user.firstName}!</p>}

      {isLoading && <p>Loading profile...</p>}
      {isError && <p>Error loading profile.</p>}
      {userData ? (
        <UserProfile user={userData} />
      ) : (
        !isLoading && <p>No user data found.</p>
      )}

      <button className="btn btn-danger mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
