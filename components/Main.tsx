import React from 'react';
import { useGetSessionStorage } from '../hooks/hooks';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useGetSessionStorage();
  return <>{children}</>;
};
export default Main;
