import { Button } from "primereact/button";
import styled from "styled-components";
import BackIcon from "../../assets/icon/back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { devices } from "../../assets/styles/size";

const Wrapper = styled.div`
  width: 100%;
  min-height: 98vh;
  background-color: white;
  padding: 1em;
  border-radius: 40px;
  display: flex;
  flex-direction: column-reverse;
  @media ${devices.mobileL} {
    flex-direction: row;
    height: 98vh;
  }
`;

const InfoSection = styled.div`
  background: linear-gradient(157deg, #0295d3 1.06%, #92ece6 100%);
  padding: 6em;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  @media ${devices.mobileL} {
    width: 50%;
  }
`;

const FormSection = styled.div`
  padding: 6em;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  @media ${devices.mobileL} {
    width: 50%;
  }
`;

const FormWrapper = ({ children1 = null, children2 = null }) => {
  const history = useNavigate();
  const location = useLocation();
  return (
    <Wrapper>
      <InfoSection>
        {location.pathname !== "/" && (
          <Button
            rounded
            text
            style={{ position: "absolute", top: "10px", left: "10px" }}
            onClick={() => history(-1)}
          >
            <img src={BackIcon} alt="back" width={"10px"} />
          </Button>
        )}
        {children1}
      </InfoSection>
      <FormSection>{children2}</FormSection>
    </Wrapper>
  );
};

export default FormWrapper;
