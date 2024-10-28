import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext'; // Import LoadingProvider
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import PublicLayout from './layouts/PublicLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoadingProvider> {/* Wrap the application in LoadingProvider */}
          <Routes>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
            </Route>
            <Route element={<PublicLayout />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Routes>
        </LoadingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
