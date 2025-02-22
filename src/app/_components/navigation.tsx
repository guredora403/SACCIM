"use client"
import Link from "next/link";
import React from 'react';
import { usePathname } from 'next/navigation';

const Navigation = ({ authorized }: {authorized: boolean}) => {
  const pathname = usePathname();

  const commonNavItems = [
    { href: '/', label: 'ホーム' },
  ];

  const authNavItems = authorized
    ? [
        { href: '/avatars', label: 'アバター一覧' },
        { href: '/logout', label: 'ログアウト' }
      ]
    : [
        { href: '/login', label: 'ログイン' }
      ];

  const navItems = [...commonNavItems, ...authNavItems];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <ul className="flex space-x-8 list-none">
            {navItems.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                      isCurrent
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
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