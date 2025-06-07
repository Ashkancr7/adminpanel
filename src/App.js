import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import UserTable from './pages/UserTable';
import AdminPayments from './pages/AdminPayments';
import Orders from './pages/Orders';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="user-table" element={<UserTable />} />
        <Route path="payments-table" element={<AdminPayments />} />
        <Route path="orders" element={<Orders />} />



      </Route>
    </Routes>
  );
}

export default App;
