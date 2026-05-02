"use client";

type Option = {
  value: string;
  label: React.ReactNode;
};

type DropdownProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: Option[];
  id: string;
  open: string | null;
  setOpen: (id: string | null) => void;
};

export default function Dropdown({
  label,
  value,
  setValue,
  options,
  id,
  open,
  setOpen,
}: DropdownProps) {
  const isRegion = id === "region";
  const widthClass = isRegion ? "min-w-[180px]" : "min-w-[140px]";

  return (
    <div className="relative">
      
      {/* BUTTON */}
      <button
        onClick={() => setOpen(open === id ? null : id)}
        className={`px-4 py-2 rounded-md ${widthClass} flex justify-between items-center border`}
        style={{
          background: "var(--btn-bg)",
          color: "var(--btn-text)",
          borderColor: "var(--btn-text)",
        }}
      >
        {/* whitespace-nowrap */}
        <span className="whitespace-nowrap mr-2">
          {options.find((o) => o.value === value)?.label || label}
        </span>
        <span>▼</span>
      </button>

      {/* MENU */}
      <div
        className={`absolute left-0 mt-2 w-full rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200 ${
          open === id
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: "var(--dropdown-bg)",
          color: "var(--dropdown-text)",
          border: "1px solid var(--btn-text)",
        }}
      >
        {options.map((opt, index) => (
          <div
            key={index}
            onClick={() => {
              setValue(opt.value);
              setOpen(null);
            }}
            className="px-3 py-2 cursor-pointer transition-colors"
            style={{
              color: "var(--dropdown-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hover-bg)";
              e.currentTarget.style.color = "var(--hover-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--dropdown-text)";
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}