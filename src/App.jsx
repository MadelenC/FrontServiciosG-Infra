import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layouts/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ProtectedRoute, PublicRoute } from "./auth/PrivateRoute";
import NotFound from "./pages/OtherPage/NotFound";



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

import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />

      <Routes>

<Route path="/" element={<Home />} />
        {/* ================= AUTH ================= */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route path="/signup" element={<SignUp />} />

        {/* ================= APP LAYOUT ===========*/}
        <Route element={<AppLayout />}>


          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
       {/* ================= MODULOS ================= */}
          <Route path="/usuarios" element={<UserHome />} />

          {/* =================Secciones ================= */}
          <Route path="/secciones"  element={ <ProtectedRoute><SeccionesHome /> </ProtectedRoute>}></Route>
          {/* Modificar Solicitud*/}
          <Route
            path="/solicitud"
            element={
              <ProtectedRoute>
                < ModifyHome />
              </ProtectedRoute>
            }
          />
          {/* =================Aprobacion de trabajo ================= */}
          <Route >
            <Route
              path="solicitudes"
              element={
                <ProtectedRoute>
                  <ListHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="aceptados"
              element={
                <ProtectedRoute>
                  < AcepHome/>
                </ProtectedRoute>
              }
            />
            <Route
              path="rechazados"
              element={
                <ProtectedRoute>
                  < RechHome/>
                </ProtectedRoute>
              }
            />
             <Route
              path="reporte"
              element={
                <ProtectedRoute>
                  < Reports/>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ================= PEDIDOS ================= */}
          <Route path="/pedido">
            <Route
              index
              element={
                <ProtectedRoute>
                  <PedHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="pedido"
              element={
                <ProtectedRoute>
                  <PedHome  />
                </ProtectedRoute>
              }
            />
            <Route
              path="aceptados"
              element={
                <ProtectedRoute>
                  <AceptHome  />
                </ProtectedRoute>
              }
            />
            <Route
              path="rechazados"
              element={
                <ProtectedRoute>
                  <RechaHome />
                </ProtectedRoute>
              }
            />
          </Route>

           {/* ================= Solicitud de trabajo================= */}
          <Route path="/solicitud">
            <Route
              index
              element={
                <ProtectedRoute>
                  < ListarHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="solicitud"
              element={
                <ProtectedRoute>
                  <ListarHome  />
                </ProtectedRoute>
              }
            />
            <Route
              path="aceptados"
              element={
                <ProtectedRoute>
                  <AcceptHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="rechazados"
              element={
                <ProtectedRoute>
                  <RechazarHome/>
                </ProtectedRoute>
              }
            />
          </Route>

          

          {/* ================= UI ================= */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

        </Route>

        {/* ================= NOT FOUND ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}


