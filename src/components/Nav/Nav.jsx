import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css';

export const NavItem = ({ to, label, active }) => {
  const activeClass = active.startsWith(to) ? 'active' : '';
  return (
    <li>
      <Link className={activeClass} to={to}>
        {label}
      </Link>
    </li>
  );
};

export const NavBase = ({ items, location: { pathname } }) => (
  <nav className="topnav">
    <ul>
      {items.map(({ to, label }) => (
        <NavItem key={label} to={to} label={label} active={pathname} />
      ))}
    </ul>
  </nav>
);

export const Nav = withRouter(NavBase);
