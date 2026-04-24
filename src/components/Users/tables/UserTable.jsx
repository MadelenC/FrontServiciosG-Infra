import React, { useState } from "react";
import UserRow from "./UserRow";
import EditUserPanel from "../form/EditUserPanel";

export default function UserTable({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full border-collapse text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">

            <tr>
              {[
                "ID",
                "Nombres",
                "Apellidos",
                "Cédula",
                "Celular",
                "Tipo",
                "Operaciones",
              ].map((head) => (
                <th
                  key={head}
                  className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300"
                >
                  {head}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={(u) => setSelectedUser(u)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      {selectedUser && (
        <EditUserPanel
          open={true}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}
