import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin-login');
    }
  }, []);

  return <>
  <AdminLayout />

  </>;
};

export default AdminPanel;
