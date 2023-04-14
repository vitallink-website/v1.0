import styled from "styled-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import InfoHome from "./components/Info";
import HomeForm from "./components/Form";

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const HomePage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<InfoHome />}
        children2={<HomeForm />}
      ></FormWrapper>
    </Container>
  );
};

export default HomePage;
