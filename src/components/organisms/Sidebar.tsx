import React from 'react';
import Link from 'next/link';
import { Heading } from '../atoms/Heading';

export const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analytics', href: '#' },
    { name: 'Reports', href: '#' },
    { name: 'Settings', href: '#' },
  ];

  return (
    <aside className="w-64 bg-white p-6 border-r border-gray-100 min-h-screen">
      <div className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">GT</div>
        <Heading level={2}>GreenTree Sales</Heading>
      </div>
      <nav>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className={`block px-4 py-2.5 rounded-lg text-sm transition ${item.name === 'Dashboard' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {item.name}
              </Link>
            </li>
          )
          )}
        </ul>
      </nav>
    </aside>
  );
};