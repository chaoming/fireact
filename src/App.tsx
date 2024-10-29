import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ConfigProvider } from './contexts/ConfigContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import EditName from './components/EditName';
import EditEmail from './components/EditEmail';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import PublicLayout from './layouts/PublicLayout';
import DesktopMenuItems from './components/DesktopMenuItems';
import MobileMenuItems from './components/MobileMenuItems';
import config from './config.json';

function App() {
  return (
    <Router>
      <ConfigProvider config={config}>
        <AuthProvider>
          <LoadingProvider>
            <Routes>
              <Route element={
                <AuthenticatedLayout 
                  desktopMenuItems={<DesktopMenuItems isSidebarOpen={true} />}
                  mobileMenuItems={<MobileMenuItems />}
                />
              }>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-name" element={<EditName />} />
                <Route path="/edit-email" element={<EditEmail />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/delete-account" element={<DeleteAccount />} />
              </Route>
              <Route element={<PublicLayout />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
            </Routes>
          </LoadingProvider>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
