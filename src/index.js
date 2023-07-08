import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/global.css"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { routes } from './routes';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './utils/ProtectedRoute';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.page;
            const type = route.type
            if(type === "public"){
              return (
                <Route path={route.path} key={index} element={
                  <Layout>
                    <Page/>
                  </Layout>
                }/>
              )}
            else if (type === "protect"){
              return (
                <Route path={route.path} key={index} 
                element={
                <ProtectedRoute Layout = {Layout} Page = {Page}/>
                }/>)  
            }
          })}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
