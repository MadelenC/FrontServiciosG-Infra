const ComponentCard = ({ title, children, className = "", desc = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {/* Card Header */}
      <div className="bg-gray-200 dark:bg-gray-800 px-6 py-5">
        <h3 className="text-[23px] font-bold text-gray-800 dark:text-white/90 font-sans">
          {title}
        </h3>

        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="bg-gray-200 dark:bg-gray-900 p-4 border-t border-gray-100 dark:border-gray-800 sm:p-1">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;

