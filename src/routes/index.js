import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import AuthContext from '../contexts/auth';

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="blue" />
    )
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}