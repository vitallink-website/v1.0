import FormWrapper from "../../components/FormWrapper/FormWrapper";
import InfoHome from "./components/Info";
import HomeForm from "./components/Form";
import { Container } from "./components/CSS";

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
