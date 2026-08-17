import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null; // or loading spinner

  // 🔐 If user not signed in, redirect to login
  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  // ✅ Default to 'user' if role is undefined
  const role = user?.publicMetadata?.role || "user";
  console.log("🔍 Authenticated User Role:", role);

  // ✅ Check role against allowedRoles
  if (!allowedRoles || allowedRoles.includes(role)) {
    return children;
  }

  // ❌ Role not allowed → redirect to /unauthorized
  return <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
