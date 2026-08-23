import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreateWorkspacePage from './pages/CreateWorkspacePage';
import DashboardPage from './pages/DashboardPage';
import InvitePage from './pages/InvitePage';
import WorkspaceSettingsPage from './pages/WorkspaceSettingsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/create-workspace" element={<CreateWorkspacePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/workspace-settings" element={<WorkspaceSettingsPage />} />
      <Route path="/invite/:token" element={<InvitePage />} />
    </Routes>
  );
};

export default App;
