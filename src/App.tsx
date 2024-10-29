import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import EditName from './components/EditName';
import EditEmail from './components/EditEmail';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import PublicLayout from './layouts/PublicLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoadingProvider>
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
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/edit-name" 
                element={
                  <PrivateRoute>
                    <EditName />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/edit-email" 
                element={
                  <PrivateRoute>
                    <EditEmail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/change-password" 
                element={
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/delete-account" 
                element={
                  <PrivateRoute>
                    <DeleteAccount />
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
