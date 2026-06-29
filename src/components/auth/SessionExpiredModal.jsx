import { useEffect, useRef, useState } from "react";

export default function SessionExpiredModal() {
  const [isOpen, setIsOpen] = useState(false);
  const resolverRef = useRef(null);

  useEffect(() => {
    const handleSessionExpired = (event) => {
      resolverRef.current = event.detail.resolve;
      setIsOpen(true);
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);

  const resolveAction = (action) => {
    resolverRef.current?.(action);
    resolverRef.current = null;
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tu sesion expiro
        </h2>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          Deseas permanecer en el sistema? Intentaremos renovar tu sesion.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => resolveAction("logout")}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Salir
          </button>

          <button
            type="button"
            onClick={() => resolveAction("stay")}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Permanecer
          </button>
        </div>
      </div>
    </div>
  );
}
