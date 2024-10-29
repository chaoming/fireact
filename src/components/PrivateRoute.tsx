import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useConfig } from '../contexts/ConfigContext';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();
  const { pages } = useConfig();

  return currentUser ? <>{children}</> : <Navigate to={pages.signIn} />;
}
