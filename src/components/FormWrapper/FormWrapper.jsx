import styled from "styled-components";

const Wrapper = styled.div`
  width: 60%;
  height: 90vh;
  background-color: white;
  padding: 10em;
  border-radius: 40px;
  display: flex;
`;

const InfoSection = styled.div`
  background: linear-gradient(157deg, #0295d3 1.06%, #92ece6 100%);
  padding: 50em;
  width: 50%;
  height: 100%;
  border-radius: 30px;
  position: relative;
`;

const FormSection = styled.div`
  padding: 50em;
  width: 50%;
  height: 100%;
  border-radius: 30px;
  position: relative;
`;

const FormWrapper = ({ children1 = null, children2 = null }) => {
  return (
    <Wrapper>
      <InfoSection>{children1}</InfoSection>
      <FormSection>{children2}</FormSection>
    </Wrapper>
  );
};

export default FormWrapper;
