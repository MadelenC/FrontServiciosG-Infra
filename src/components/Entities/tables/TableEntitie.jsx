import React, { useState, useEffect } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import EntitieRow from "./EntitieRow";
import Pagination from "./pagination";
import SearchBar from "../search/SearchBar";
import EntitieFormPanel from "../form/EntitieFormPanel";
import EditEntitiePanel from "../form/EditEntitiePanel";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../ui/table";

export default function TableEntitie() {
  const { entidades = [], loading, error, fetchEntidades } = useEntidadStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [openFormPanel, setOpenFormPanel] = useState(false);
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [entitieToEdit, setEntitieToEdit] = useState(null);

  useEffect(() => {
    fetchEntidades();
  }, [fetchEntidades]);

  const handleEdit = (entitie) => {
    setEntitieToEdit(entitie);
    setOpenEditPanel(true);
  };

  const filteredEntidades = (entidades || []).filter((e) => {
    const term = search.toLowerCase();
    return (
      e?.facultad?.toLowerCase().includes(term) ||
      e?.carrera?.toLowerCase().includes(term) ||
      e?.materia?.toLowerCase().includes(term) ||
      e?.sigla?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredEntidades.length / limit);
  const currentEntidades = filteredEntidades.slice(
    (page - 1) * limit,
    page * limit
  );

  if (loading)
    return <div className="p-6 text-center">Cargando entidades...</div>;

  if (error)
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">
      {/* Botón principal */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEntitieToEdit(null);
            setOpenFormPanel(true);
          }}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
        >
          + Registrar Nueva Entidad
        </button>
      </div>

      {/* Buscador */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Tabla usando componentes Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {["ID", "Facultad", "Carrera", "Materia", "Sigla", "Acciones"].map(
                (head) => (
                  <TableCell key={head} className="px-4 py-3 text-left font-semibold text-gray-700">
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEntidades.length > 0 ? (
              currentEntidades.map((entitie) => (
                <EntitieRow
                  key={entitie.id}
                  entitie={entitie}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No se encontraron entidades
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Paneles de formulario */}
      <EntitieFormPanel
        open={openFormPanel}
        entitie={entitieToEdit}
        onClose={() => {
          setOpenFormPanel(false);
          setEntitieToEdit(null);
        }}
      />
      <EditEntitiePanel
        open={openEditPanel}
        entitieId={entitieToEdit?.id || null}
        onClose={() => {
          setOpenEditPanel(false);
          setEntitieToEdit(null);
        }}
      />
    </div>
  );
}