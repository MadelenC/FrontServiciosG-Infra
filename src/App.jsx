import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/Entities/EntitiesHome";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Calendar from "./pages/Trips/Calendar";
import Travelrol from "./pages/Travelrol/travelTables";
import FormElements from "./pages/Vehiculos/VehiculoHome";
import Combustible from "./pages/combustible/Combustible";
import Destinations from "./pages/Destinations/destinations";
import Maps from "./pages/Maps/Maps";
import Reservations from "./pages/Reservations/ReservationsHome";
import TripsHome from "./pages/Trips/TripsHome";
import CheckBudgetHome from "./pages/TravelBudget/CheckBudgetHome";
import CashBudgetHome from "./pages/TravelBudget/CashBudgetHome";
import DepartureHome from "./pages/DepartureAuthorization/DepartureHome";
import TripReportHome from "./pages/TripReport/TripReportHome";
import JobApplicationHome from "./pages/JobApplication/JobApplicationHome" ;
import ApplicationHome from "./pages/Maintenance/ApplicationHome";
import KardexHome from "./pages/Maintenance/KardexHome";
import AppLayout from "./layouts/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/UserList/Home";
import { ProtectedRoute, PublicRoute } from "./auth/PrivateRoute";



export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>

            <Route index path="/" element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>
            } />
                      
            {/* Others Page */}
           
            <Route path="/entidades" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/vehiculos" element={<FormElements />} />
            <Route path="/travel-rol" element={<Travelrol />} />
            <Route path="/combustible" element={<Combustible />} />
             <Route path="/destinos" element={<Destinations />} />
            <Route path="/mapas" element={<Maps/>}></Route>
            <Route path="/reservas" element={<Reservations/>}></Route>
            <Route path="/viajes">
                <Route index element={<TripsHome />} />       
                <Route path="calendar" element={<Calendar />} />  
            </Route>
            <Route path="/presupuestos">
            <Route index element={<CheckBudgetHome />} />
            <Route path="cheque" element={<CheckBudgetHome />} />
            <Route path="caja" element={<CashBudgetHome />} />
            </Route>
            <Route path="/autorizacion" element={<DepartureHome/>}></Route>
            <Route path="/informe" element={<TripReportHome/>}></Route>
            <Route path="/Solicitud_Trabajo" element={<JobApplicationHome/>}></Route>
            
            <Route path="/mantenimiento">
             <Route index element={<ApplicationHome />} />
            <Route path="solicitudes" element={<ApplicationHome />} />
            <Route path="kardex" element={<KardexHome />} />
            </Route>
            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>

          {/* Auth Layout */}
            <Route path="/signin" element={
              <PublicRoute >
                <SignIn />
              </PublicRoute>
            } />
          
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}


