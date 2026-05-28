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
import Profile from "./pages/profile/Profile";

import ElecHome from "./pages/ElectricalWorkshop/AcepHome";
import ListElecHome from "./pages/ElectricalWorkshop/ListHome";
import RechElecHome from "./pages/ElectricalWorkshop/RechHome";
import PedElecHome from "./pages/ElectricalWorkshop/PedHome";

import SerGenarlHome from "./pages/TallerSerGeneral/AcepHome";
import ListSerGenarlHome from "./pages/TallerSerGeneral/ListHome";
import RechSerGenarlHome from "./pages/TallerSerGeneral/RechHome";
import PedSerGenarlHome from "./pages/TallerSerGeneral/PedHome";

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
          element={
            <PublicRoute> 
              <Home />
            </PublicRoute>   
          } 
        />
       
        <Route
          path="/signin"
          element={   
            <PublicRoute>       
              <SignIn />
            </PublicRoute>        
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
                <Dashboard />            
            }
          />

           <Route
            path="/profile"
            element={
               <Profile /> 
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
          </Route>

          <Route >
            <Route
              path="trabajoElec"
              element={
                <ProtectedRoute  rolesAllowed={["electricista"]}>
                  <ListElecHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="realizadoElec"
              element={
                <ProtectedRoute  rolesAllowed={["electricista"]}>
                  < ElecHome/>
                </ProtectedRoute>
              }
            />
            <Route
              path="canceladoElec"
              element={
                <ProtectedRoute  rolesAllowed={["electricista"]}>
                  < RechElecHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="pedidosElec"
              element={
                <ProtectedRoute  rolesAllowed={["electricista"]}>
                  < PedElecHome />
                </ProtectedRoute>
              }
            />
          </Route>
            

          <Route >
            <Route
              path="trabajoTaller"
              element={
                <ProtectedRoute  rolesAllowed={["sergeneral"]}>
                  <ListSerGenarlHome/>
                </ProtectedRoute>
              }
            />
            <Route
              path="realizadoTaller"
              element={
                <ProtectedRoute  rolesAllowed={["sergeneral"]}>
                  < SerGenarlHome/>
                </ProtectedRoute>
              }
            />
            <Route
              path="canceladoTaller"
              element={
                <ProtectedRoute  rolesAllowed={["sergeneral"]}>
                  < RechSerGenarlHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="pedidosTaller"
              element={
                <ProtectedRoute  rolesAllowed={["sergeneral"]}>
                  < PedSerGenarlHome />
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


