// src/components/layout/Header.jsx
import React from 'react';
import NotificationDropdown from './NotificationDropdown';
import { PAGE_TITLES } from '../../utils/constants';

export default function Header({ page }) {
  return (
    <div className="topbar">
      <div className="topbar-title">{PAGE_TITLES[page]}</div>
      <div className="top-right">
        <NotificationDropdown />
      </div>
    </div>
  );
}