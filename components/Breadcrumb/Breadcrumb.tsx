"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm mb-4 bg-gray-800 w-full h-10 flex items-center px-4 rounded-md" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home */}
        <li>
          <a href="/dashboardLocker/Overview_Dashboard" className="text-blue-600 hover:underline">
            Home
          </a>
        </li>

        {/* Dynamic Path */}
        {paths.map((item, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");

          return (
            <li key={index} className="flex items-center space-x-2">
              <span>/</span>

              {index === paths.length - 1 ? (
                <span className="text-gray-600 capitalize">{item}</span>
              ) : (
                <a
                  href={href}
                  className="text-blue-600 capitalize hover:underline"
                >
                  {item}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
