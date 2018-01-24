// @flow
import * as React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import './Topbar.css'

class Topbar extends React.Component<{}> {
  render() {
    return (
      <Navbar light expand="sm" className="bg-light rounded d-none d-sm-flex mt-5 mb-5">
        <NavbarBrand href="/">the corps of discovery online</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#">map</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/bib">bibliography</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Topbar
