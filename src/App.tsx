import { useState } from 'react';
import SignIn from './pages/sign-in-form';
import AdminDashboard from './pages/admin-dashboard';
import GeneralDashboard from './pages/general-dashboard';

const App = () => {
  const [page, setPage] = useState('sign-in'); // Default page

  // Function to switch pages
  const goToPage = (pageName: string) => {
    setPage(pageName);
  };

  return (
    <div>
      {page === 'sign-in' && <SignIn onSignIn={goToPage} />}
      {page === 'admin' && <AdminDashboard signInStatus={goToPage}/>}
      {page === 'general' && <GeneralDashboard />}
    </div>
  );
};

export default App;


