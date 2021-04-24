import React from 'react';

import { Text } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Text>Dashboard</Text>
    </Container>
  );
};

export default Dashboard;
