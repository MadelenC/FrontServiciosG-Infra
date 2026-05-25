import { useState, useEffect, useMemo } from "react";

export function useOrderTable({
  status,
  fetchOrders,
  fetchInstitutions,
  fetchMaintenances,
  orders,
  institutions,
  maintenances,
}) {
  const [search, setSearch] = useState("");
  const [taller, setTaller] = useState("");
  const [institution, setInstitution] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchOrders();
    fetchInstitutions();
   
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, taller, institution]);


  const filtered = useMemo(() => {
    const searchText = search.toLowerCase();

    return orders.filter((item) => {
      const institucionNombre =
        item.institucion?.nombre?.toLowerCase() || "";

      const itemTaller = (item.taller || "").toLowerCase();

      const isStatus = item.aprobacion === status;

      const matchSearch =
        !search ||
        String(item.id || "").includes(searchText) ||
        institucionNombre.includes(searchText) ||
        itemTaller.includes(searchText);

      const matchTaller =
        !taller || itemTaller === taller.toLowerCase();

      const matchInstitution =
        !institution ||
        String(item.ins_id) === String(institution);

      return isStatus && matchSearch && matchTaller && matchInstitution;
    });
  }, [orders, search, taller, institution, status]);

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    search,
    setSearch,
    taller,
    setTaller,
    institution,
    setInstitution,
    page,
    setPage,
    limit,
    totalPages,
    currentData,
    
  };
}