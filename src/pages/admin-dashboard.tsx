import { useState } from 'react';
import './AdminDashboard.css';
import Settings from './Settings';
import UserManagement from './UserManagement';

const Overview = () => <div>Overview Content</div>;
const Doctors = () => <div>Doctors Content</div>;

const AdminDashboard = ({ signInStatus }: { signInStatus: (role: string) => void }) => {
  const [selectedSection, setSelectedSection] = useState('overview');

  const handleSignOut = () => {
    signInStatus("sign-in");
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'overview':
        return <Overview />;
      case 'doctors':
        return <Doctors />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="content-area">
        {renderSection()}
      </div>

      <div className="sidebar">
        <ul className="sidebar-list">
          <li onClick={() => setSelectedSection('overview')} className="sidebar-item">
            Overview
          </li>
          <li onClick={() => setSelectedSection('doctors')} className="sidebar-item">
            Doctors
          </li>
          <li onClick={() => setSelectedSection('users')} className="sidebar-item">
            Users
          </li>
          <li onClick={() => setSelectedSection('settings')} className="sidebar-item">
            Settings    
          </li>
          <li onClick={handleSignOut} className="sidebar-item">
            Sign Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
