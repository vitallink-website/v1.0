import React from 'react'
import { Col, Row, Image } from "react-bootstrap";
import profilePhoto from "../../assets/icon/profile.svg";
import bell from "../../assets/icon/bell.svg";

function Profile() {
  return (
    <div>
      <Row className="profile">
        <Col className="profile-col">
        <Image src={bell} alt = "profile" width={25} className='bell-profile'/>
        
        </Col>
        <Col className="profile-col">
          <Image src={profilePhoto} alt = "profile" width={60}/>
        </Col>
        <Col className="profile-col">
          <div className='hello-profile'>
            hello
          </div>
          <div className='name-profile'>
            Nima
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
