import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { BiCalendar } from "react-icons/bi";
import { useSidebar } from "../../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { BiSpreadsheet } from "react-icons/bi";
import { LuBuilding2 } from "react-icons/lu";
import { MdSecurityUpdate, MdDomainAdd, MdTravelExplore } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { FaUsersLine, FaUsersGear, FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsFillFuelPumpDieselFill, BsCardHeading } from "react-icons/bs";
import { GiHorizonRoad } from "react-icons/gi";
import { SiOrganicmaps } from "react-icons/si";

const navItems = [
  { icon: <FaUsersLine className="text-white" />, name: "Usuarios", subItems: [{ name: " Ver Lista de Usuarios", path: "/", pro: false }] },
  { icon: <MdDomainAdd className="text-white" />, name: "Entidades", subItems: [{ name: " Lista de Entidades", path: "/entidades", pro: false }] },
  { name: "Rol de Viajes", icon: <FaUsersGear className="text-white" />, subItems: [{ name: "Motrar", path: "/travel-rol", pro: false }] },
  { name: "Vehiculos ", icon: <BiSpreadsheet className="text-white" />, subItems: [{ name: "Mostrar", path: "/vehiculos", pro: false }] },
  { name: "Combustible", icon: <BsFillFuelPumpDieselFill className="text-white" />, subItems: [{ name: "Mostrar", path: "/combustible", pro: false }] },
  { name: "Destinos", icon: <GiHorizonRoad className="text-white" />, subItems: [{ name: "Lista de Destinos", path: "/destinos", pro: false }] },
  { name: "Mapas", icon: <SiOrganicmaps className="text-white" />, subItems: [{ name: "listar", path: "/mapas", pro: false }] },
  { name: "Reservas", icon: <BsCardHeading className="text-white" />, subItems: [{ name: "reservas", path: "/reservas", pro: false }] },
  { icon: <BiCalendar className="text-white" />, name: "Calendar", path: "/calendar" },
  { name: "Viajes", icon: <MdTravelExplore className="text-white" />, subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }] },
  { name: "Presupuestos de Viaje", icon: <FaMoneyBillTrendUp className="text-white" />, subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }] },
];

const othersItems = [
  {
    icon: <LuBuilding2 className="text-white" />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <MdSecurityUpdate className="text-white" />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index)
        return null;
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-white">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <GoChevronDown
                  className={`ml-auto w-5 h-5 text-white transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                } text-white`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text text-white">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item text-white ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                    {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span className={`ml-auto menu-dropdown-badge text-white`}>
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span className={`ml-auto menu-dropdown-badge text-white`}>
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`
        fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 
        bg-[#1e1f4b] text-white border-r border-[#151735]
        dark:bg-[#11121f] dark:border-[#1a1a2c]
        h-screen transition-all duration-300 ease-in-out z-50
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-6 flex justify-center pl-0 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-center"}`}>
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/85/Escudo_Universidad_Aut%C3%B3noma_Tom%C3%A1s_Fr%C3%ADas.png"
                alt="Escudo Universidad Autónoma Tomás Frías"
                width={150}
                height={140}
                style={{ display: "block" }}
              />
              <p className="font-bold text-lg text-white mt-2 text-center">UATF</p>
              <h1 className="text-sm text-white/80 text-center">DEPTO. DE INFRAESTRUCTURA</h1>
            </div>
          ) : (
            <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-white/70 ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <FiMoreHorizontal className="size-6 text-white" />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-white/70 ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Others" : <FiMoreHorizontal className="text-white" />}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;