import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css';

export const NavItem = ({ to, label, active }) => (
  <li>
    <Link className={to === active ? 'active' : ''} to={to}>
      {label}
    </Link>
  </li>
);

export const NavBase = ({ location: { pathname } }) => (
  <nav className="topnav">
    <ul>
      <NavItem to="/theexperiment" label="theexperiment" active={pathname} />
      <NavItem to="/transactions" label="transactions" active={pathname} />
      <NavItem to="/results" label="results" active={pathname} />
      <NavItem to="/blog" label="blog" active={pathname} />
    </ul>
  </nav>
);

export const Nav = withRouter(NavBase);
