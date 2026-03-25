"use client";
const UserDropdown = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button onClick={() => setOpen(!open)}>
        <i className="icon-avatar text-[18px]"></i>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border
            overflow-hidden z-[999]
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          {/* USER INFO */}
          <div className="px-4 py-3 border-b bg-gray-50">
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || ""}
            </p>
          </div>

          {/* MENU */}
          <Link
            href="/account"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};