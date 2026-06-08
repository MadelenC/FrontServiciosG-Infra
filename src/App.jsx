import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layouts/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import NotFound from "./pages/OtherPage/NotFound";
import ProtectedRoute from "./components/Protected/PortectedRoute";

import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";

import Dashboard from "./pages/Dashboard/Dashboard";
import UserHome from "./pages/UserList/UserHome";
import SeccionesHome from "./pages/Secciones/SeccionesHome";

import ModifyHome from "./pages/ModifyRequets/ModifyHome";

import ListHome from "./pages/WorkApproval/ListHome";
import AcepHome from "./pages/WorkApproval/AcepHome";
import RechHome from "./pages/WorkApproval/RechHome";
import Reports from "./pages/WorkApproval/Reports";

import PedHome from "./pages/OrderApproval/PedHome";
import AceptHome from "./pages/OrderApproval/AceptHome";
import RechaHome from "./pages/OrderApproval/RechaHome";

import ListarHome from "./pages/JobApplication/ListarHome";
import AcceptHome from "./pages/JobApplication/AcceptHome";
import RechazarHome from "./pages/JobApplication/RechazarHome";
import UnidHome from "./pages/JobApplication/UnidHome";
import Profile from "./pages/profile/Profile";

import Home from "./pages/Home";
import PublicRoute from "./components/Protected/PublicRoute";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Routes>

       <Route 
          path="/" 
          element={<Home />} 
          />

          <Route 
            path="/home" 
            element={<Home />} 
          />
       
        <Route
          path="/signin"
          element={   
              <SignIn />               
          }
        />

         <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
        } 
          
        />

        <Route element={<AppLayout />}>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","sergeneral","mesajeroserv"]}>   
                <Dashboard />
              </ProtectedRoute>
            }
          />

           <Route
            path="/profile"
            element={
              <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","sergeneral","mesajeroserv"]}>
               <Profile /> 
              </ProtectedRoute> 
            }
          />
       
          <Route 
            path="/usuarios" 
            element={
              <ProtectedRoute 
                rolesAllowed={["encargadoserv","administradorserv"]}
              >
                <UserHome />
              </ProtectedRoute>
            }
          />

         
          <Route 
            path="/secciones"  
            element={ 
            <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv"]} >
                <SeccionesHome /> 
            </ProtectedRoute>}>
          </Route>
      
          <Route
            path="/modificar"
            element={
              <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","mensajeroserv"]}>
                < ModifyHome />
              </ProtectedRoute>
            }
          />
      
          <Route >
            <Route
              path="solicitudes"
              element={                
              <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","sergeneral","mesajeroserv"]}>   
                  <ListHome />
              </ProtectedRoute>
              }
            />
            <Route
              path="aceptados"
              element={               
               <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","sergeneral","mesajeroserv"]}>
                  < AcepHome/>
                </ProtectedRoute>
              }
            />
            <Route
              path="rechazados"
              element={               
                <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","sergeneral","mesajeroserv"]}>
                  < RechHome/>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/pedido">
            <Route
              index
              element={
                <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","mesajeroserv"]}>
                  <PedHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="pedido"
              element={
                <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","mesajeroserv"]}>
                  <PedHome  />
                </ProtectedRoute>
              }
            />
            <Route
              path="aceptados"
              element={
                <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","mesajeroserv"]}>
                  <AceptHome  />
                </ProtectedRoute>
              }
            />
            <Route
              path="rechazados"
              element={
                <ProtectedRoute  rolesAllowed={["encargadoserv","administradorserv","mesajeroserv"]}>
                  <RechaHome />
                </ProtectedRoute>
              }
            />
          </Route>

       
          <Route path="/solicitud">
            <Route
              index
              element={
                <ProtectedRoute  rolesAllowed={["mesajeroserv","electricista","sergeneral","mecanico","mgeneral","encargadoserv","mantenimiento","administradorserv"]}>
                  < ListarHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="solicitud"
              element={
                <ProtectedRoute  rolesAllowed={["mesajeroserv","electricista","sergeneral","mecanico","mgeneral","encargadoserv","mantenimiento","administradorserv"]}>
                  <ListarHome  />
                </ProtectedRoute>
              }
            />
            <Route
              path="aceptados"
              element={
                <ProtectedRoute  rolesAllowed={["mesajeroserv","electricista","sergeneral","mecanico","mgeneral","encargadoserv","mantenimiento","administradorserv"]}>
                  <AcceptHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="rechazados"
              element={
                <ProtectedRoute  rolesAllowed={["mesajeroserv","electricista","sergeneral","mecanico","mgeneral","encargadoserv","mantenimiento","administradorserv"]}>
                  <RechazarHome/>
                </ProtectedRoute>
              }
            />
            <Route
              path="miunidad"
              element={
                <ProtectedRoute  rolesAllowed={["administradorserv"]}>
                  <UnidHome/>
                </ProtectedRoute>
              }
            />
          </Route>

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


