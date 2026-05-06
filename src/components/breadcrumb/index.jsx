export default function Breadcrumb({ product }) {
  const crumbs = ["Home", "Catalog", "Outerwear", product?.name || "Product"];
  return (
    <nav className="flex items-center gap-1.5 px-6 py-3 text-xs text-gray-400 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <a
            href="#"
            className={
              i === crumbs.length - 1
                ? "text-gray-700 font-medium pointer-events-none"
                : "hover:text-gray-700 transition-colors"
            }
          >
            {crumb}
          </a>
          {i < crumbs.length - 1 && <span className="text-gray-300">/</span>}
        </span>
      ))}
    </nav>
  );
}
