import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin-login');
    }
  }, []);

  return <div>به پنل ادمین خوش اومدی!</div>;
};

export default AdminPanel;
