import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Container, Row, Col } from 'react-bootstrap';

export default function NavbarOffcanvas(){
const [sidebar, setSidebar] = useState(false);

  function showSidebar(){
    setSidebar(!sidebar)
  }

    return (
      <div>
            <div className="p-0 menu-icon">
                <button className="menu-bars" onClick={showSidebar}><FaIcons.FaBars/></button>
            </div>

        <Container fluid className="p-0">
          <Row>
            <div className={sidebar ? "nav-menu active" : "nav-menu"}>
              <button className="menu-bars" onClick={showSidebar}><AiIcons.AiOutlineClose /></button>

              <h1 className="nav-title">Menu</h1>

              <Row>
                <Col>
                  <Link onClick={showSidebar} to="/" className="nav-button mt-3">
                    Dashboard
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Link onClick={showSidebar} to="/search" className="nav-button mt-3">
                    Search
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Link onClick={showSidebar} to="/reservations/new" className="nav-button mt-3">
                    New Reservation
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Link onClick={showSidebar} to="/tables/new" className="nav-button mt-3">
                    New Table
                  </Link>
                </Col>
              </Row>

            </div>
          </Row>
        </Container>
      </div>
    );
}