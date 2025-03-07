"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navigation = ({ authorized }: { authorized: boolean }) => {
  const pathname = usePathname();

  const commonNavItems = [{ href: "/", label: "ホーム" }];

  const authNavItems = authorized
    ? [
        { href: "/friend", label: "友達" },
        { href: "/avatars", label: "アバター一覧" },
        { href: "/mycontact", label: "自分の連絡先" },
        { href: "/logout", label: "ログアウト" },
      ]
    : [{ href: "/login", label: "ログイン" }];

  const navItems = [...commonNavItems, ...authNavItems];

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <ul className="flex list-none space-x-8">
            {navItems.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`inline-flex h-16 items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isCurrent
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
