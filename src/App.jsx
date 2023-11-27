import { useState, useEffect } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from "./appwrite/auth"
import { login, logout } from './store/authSlice';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ data }));
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />

      </div>
    </div>
  ) : null;
}

export default App
