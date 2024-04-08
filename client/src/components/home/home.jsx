import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop,faUserTie,faBars, faSignOutAlt ,faUser, faBuilding, faTachometer, faBuildingUser, faCalendar, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Society } from "../society/society";
import { User } from "../user/user";
import WorkhourForm from "../workhour/workhour";
import { Employee } from "../employee/Employee";
import { Department } from "../department/Department";
import WorkhourMapping from "../workhour/workhourlist";
import { Dashboard} from "../dashboard/Dashboard";
import "./home.css";
import "../workhour/workhour.css"
import { Material } from "../material/Material";


export const Home = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(localStorage.getItem('selectedItem') || '0');
  const [selected, setSelected] = useState(localStorage.getItem('selectedItem') || '0');
  const [isLoading, setIsLoading] = useState(false); 

  const handleClick = (val) => {
    setValue(val);
    setSelected(val);
    localStorage.setItem('selectedItem', val);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'fr' ? 'en' : 'fr';
    setIsLoading(true); 
    setTimeout(() => {
      i18n.changeLanguage(newLanguage);
      setIsLoading(false); 
    }, 2000);
  };
  

  const renderContent = () => {
    switch (value) {
      case '0':
        return <Dashboard t={t}/>;
      case '1':
        return <Society t={t} />;
      case '2':
        return <User t={t} />;
      case '3':
        return <Department t={t} />;
      case '4':
        return <WorkhourForm t={t} />;
      case '5':
        return <WorkhourMapping t={t} />;
      case '6':
        return <Employee t={t} />;
      case '7':
        return <Material t={t} />;
      default:
        return <h1>{t('Home')}</h1>;
    }
  };

    // const renderContent. = () => {
    //   switch (value) {
    //     case '0' :
    //       return <h1>Dashboard no eto angambany</h1>
    //     case '1':
    //       return <Society />;
    //     case '2':
    //       return <User />;
    //       case '3':
    //         return<Department />
    //     case '4':
    //       return<WorkhourForm />
    //     case '5':
    //       return <WorkhourMapping />
    //     case '6':
    //       return <Employee />
    //     default:
    //       return <h1>Home</h1>;
    //   }
    // };

  
  return (
    <div className="home">
      <Navbar bg="transparent" variant="light" className="fixed-top text-dark">
        <Container>
          <div className="logo"></div>
        </Container>
        <Button variant="outline-light" style={{ border: "1px solid black", color:'black', marginRight:'10px' }} onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'EN' : 'FR'}
        </Button>
      </Navbar>
      <Container fluid className="mt-5" style={{ marginTop: "250px" }}>
        <Row>
          <Col
            xs={2}
            className="sidebar"
            style={{
              backgroundColor: "#50b64a",
              minHeight: "90vh",
              marginTop: "10px",
              borderRadius: "20px",
              position: "relative",
              width:'250px'
            }}
          >
            <br></br>
            <div
              onClick={() => handleClick('0')}
              style={{
                backgroundColor: selected === '0' ? '#ececec' : 'inherit',
                padding: selected === '0' ? '15px' : '10px',
                marginRight: selected === '0' ? '-15px' : '0px',
                color: selected === '0'? 'black' : 'white'
              }}
            >
              <FontAwesomeIcon icon={faTachometer} style={{color: selected === '0'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Dashboard')}
            </div>
            <div
              onClick={() => handleClick('1')}
              style={{
                backgroundColor: selected === '1' ? '#ececec' : 'inherit',
                padding: selected === '1' ? '15px' : '10px',
                marginRight: selected === '1' ? '-15px' : '0px',
                color: selected === '1'? 'black' : 'white'
              }}
            >
              <FontAwesomeIcon icon={faBuilding} style={{color: selected === '1'? 'black' : 'white' }} /> <span>&nbsp;</span>{t('Society')}
            </div>
            <div
              onClick={() => handleClick('2')}
              style={{
                backgroundColor: selected === '2' ? '#ececec' : 'inherit',
                padding: selected === '2' ? '15px' : '10px',
                marginRight: selected === '2' ? '-15px' : '0px',
                color: selected === '2' ? 'black' : 'white'
              }}
            >

              <FontAwesomeIcon icon={faUser} style={{color: selected === '2' ? 'black' : 'white'  }} /><span>&nbsp;</span>{t('User')}

                {/* <FontAwesomeIcon icon={faCalendarAlt} style={{  color: selected === '5'? 'black' : 'white'}} /> WorkhourList */}
            </div>
            {/* <div
                onClick={() => handleClick('6')}
                style={{
                    backgroundColor: selected === '6' ? '#ececec' : 'inherit',
                    padding: selected === '6' ? '15px' : '10px',
                    marginRight: selected === '6' ? '-20px' : '0px',
                    color: selected === '6'? 'black' : 'white'
                }}
            >
                {/* <FontAwesomeIcon icon={faUserTie} style={{  color: selected === '6'? 'black' : 'white'}} /> Employee *

            </div> */}
              <div
                  onClick={() => handleClick('3')}
                  style={{
                      backgroundColor: selected === '3' ? '#ececec' : 'inherit',
                      padding: selected === '3' ? '15px' : '10px',
                      marginRight: selected === '3' ? '-15px' : '0px',
                      color: selected === '3'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faBuildingUser} style={{color: selected === '3'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Department')}
                  </div>
              <div
                  onClick={() => handleClick('4')}
                  style={{
                      backgroundColor: selected === '4' ? '#ececec' : 'inherit',
                      padding: selected === '4' ? '15px' : '10px',
                      marginRight: selected === '4' ? '-15px' : '0px',
                      color: selected === '4'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faCalendar} style={{color: selected === '4'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Workhour')}
              </div>
              <div
                  onClick={() => handleClick('5')}
                  style={{
                      backgroundColor: selected === '5' ? '#ececec' : 'inherit',
                      padding: selected === '5' ? '15px' : '10px',
                      marginRight: selected === '5' ? '-15px' : '0px',
                      color: selected === '5'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faCalendarAlt} style={{  color: selected === '5'? 'black' : 'white'}} /> <span>&nbsp;</span>{t('Workhour List')}
              </div>
              <div
                  onClick={() => handleClick('6')}
                  style={{
                      backgroundColor: selected === '6' ? '#ececec' : 'inherit',
                      padding: selected === '6' ? '15px' : '10px',
                      marginRight: selected === '6' ? '-15px' : '0px',
                      color: selected === '6'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faUserTie} style={{  color: selected === '6'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Employee')}
              </div>
              <div
                  onClick={() => handleClick('7')}
                  style={{
                      backgroundColor: selected === '7' ? '#ececec' : 'inherit',
                      padding: selected === '7' ? '15px' : '10px',
                      marginRight: selected === '7' ? '-15px' : '0px',
                      color: selected === '7'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faLaptop} style={{  color: selected === '7'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Material')}
              </div>
                  <div style={{ position: "absolute", bottom: "20px", left: '15%' }}>
                    <Button style={{ background: "none", border: "none", color: "white" }}>
                      <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} /> {t('Log out')}
                     </Button> 
                  </div>
                  
                </Col>
              <Col>
                <div className=" mt-5" style={{maxHeight:'85vh',overflowY:'auto',minHeight:'85vh'}}>
                  {renderContent()}
                </div>
                {isLoading && 
              <div style={{ display:  'block', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
              </div>
              </div>
            }
              </Col>
            </Row>
          </Container>
        </div>
      );
    };
