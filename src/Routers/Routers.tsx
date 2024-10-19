import AsideBar from '@src/components/AsideBar';
import { useAppSelector } from '@src/store/hook';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './Routers.css';
// Lazy loading для страниц
const AuthPage = React.lazy(() => import('../pages/AuthPage/AuthPage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const currentUser = useAppSelector((state) => state.user.idCurrentUser);
  const navigate = useNavigate();
  if(currentUser){
    console.log("id пользователя", currentUser);
    return children
  }else{
    console.log("пользователь не найден");
    navigate('/auth', { replace: true });
    return null;
  }
};


const Routers = () => {
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
                          <MainLayout/>
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
export default Routers;