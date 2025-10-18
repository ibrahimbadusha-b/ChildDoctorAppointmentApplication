import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import heroBanner from '../assets/updatedbanner.png';

const HeroBanner = () => {
  return (
    <section 
      className="hero-section" 
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '500px',
        width: '100vw',
        margin: '0',
        padding: '0',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <Container>
        <Row>
          <Col lg={8} md={10}>
            <h1 className="text-white mb-3" style={{
              fontSize: '3rem', 
              fontWeight: 'bold', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
            }}>
              Your Little One's Health Hero
            </h1>
            <h2 className="text-white mb-3" style={{
              fontSize: '1.8rem', 
              fontWeight: '500', 
              textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
            }}>
              Compassionate Pediatric Care That Makes Visits Fun
            </h2>
            <h3 className="text-white mb-4" style={{
              fontSize: '1.3rem', 
              fontWeight: '400', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              Where Expert Medical Care Meets Child-Friendly Comfort
            </h3>
            <Button variant="outline-light" className="px-4 py-2" size="lg">
              Book Now
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroBanner;
