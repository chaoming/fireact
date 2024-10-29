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
import Logo from './components/Logo';
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
                  desktopMenuItems={<DesktopMenuItems />}
                  mobileMenuItems={<MobileMenuItems />}
                  logo={<Logo className="w-10 h-10" />}
                />
              }>
                <Route path={config.pages.home} element={<Navigate to={config.pages.dashboard} />} />
                <Route path={config.pages.dashboard} element={<Dashboard />} />
                <Route path={config.pages.profile} element={<Profile />} />
                <Route path={config.pages.editName} element={<EditName />} />
                <Route path={config.pages.editEmail} element={<EditEmail />} />
                <Route path={config.pages.changePassword} element={<ChangePassword />} />
                <Route path={config.pages.deleteAccount} element={<DeleteAccount />} />
              </Route>
              <Route element={<PublicLayout logo={<Logo className="w-20 h-20" />} />}>
                <Route path={config.pages.signIn} element={<SignIn />} />
                <Route path={config.pages.signUp} element={<SignUp />} />
                <Route path={config.pages.resetPassword} element={<ResetPassword />} />
              </Route>
            </Routes>
          </LoadingProvider>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
