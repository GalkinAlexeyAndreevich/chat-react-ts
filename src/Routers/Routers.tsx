import AsideBar from '@src/components/AsideBar';
import { useAppSelector } from '@src/store/hook';
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './Routers.css';
import { useMobileDetect } from '@src/hooks/useMobileDetect';
import BottomTab from '@src/components/BottomTab/BottomTab';
// Lazy loading для страниц
const AuthPage = React.lazy(() => import('../pages/AuthPage/AuthPage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const currentUser = useAppSelector((state) => state.user.idCurrentUser) || Number(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== undefined) {
      setLoading(false);  // Останавливаем загрузку, как только данные определены
    }
    if(!currentUser){
      navigate('/auth', { replace: true });
    }
  }, [currentUser,navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if(currentUser){
    return children
  }
  return null
};


const Routers = () => {
  const isMobile = useMobileDetect()
  console.log(isMobile);
  
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Private Routes */}
              <Route
                  path="/*"
                  element={
                      <PrivateRoute>
                        {!isMobile?<MainLayout/>:<MobileLayout />}
                      </PrivateRoute>
                  } />

              {/* Redirect all unknown routes */}
              <Route path="*" element={<Navigate to="/auth" replace/>} />
          </Routes>
      </Suspense>
  );
};
const MainLayout = () => {
  return (
    <div className="main-layout">
      <AsideBar />
      <div className="main-content">
        <Routes>
          <Route path="chat/*" element={<ChatPage />} />
          <Route path="contact" element={<div>Contact Page</div>} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="calendar" element={<div>Calendar Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="*" element={<Navigate to="/auth" replace/>} />
        </Routes>
      </div>
    </div>
  );
};

const MobileLayout = ()=>{
  return (
    <div className="main-layout">
      <div className="main-content">
        <Routes>
          <Route path="chat/*" element={<ChatPage />} />
          <Route path="contact" element={<div>Contact Page</div>} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="calendar" element={<div>Calendar Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="*" element={<Navigate to="/auth" replace/>} />
        </Routes>
      </div>
      <BottomTab />
    </div>
  );
}
export default Routers;