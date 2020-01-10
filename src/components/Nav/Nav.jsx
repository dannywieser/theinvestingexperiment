import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css';

export const NavItem = ({ to, label, active, width }) => {
  const activeClass = active.startsWith(to) ? 'active' : '';
  return (
    <li style={{ width: width }}>
      <Link className={activeClass} to={to}>
        {label}
      </Link>
    </li>
  );
};

export const NavBase = ({ items, overrideActive, location: { pathname } }) => {
  const width = `${100 / items.length}%`;
  const active = overrideActive ? overrideActive : pathname;
  return (
    <nav className="topnav">
      <ul>
        {items.map(({ to, label }) => (
          <NavItem key={label} to={to} label={label} active={active} width={width} />
        ))}
      </ul>
    </nav>
  );
};

export const Nav = withRouter(NavBase);
