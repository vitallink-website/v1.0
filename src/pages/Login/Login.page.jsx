import FormWrapper from "../../components/FormWrapper/FormWrapper";
import InfoHome from "./components/Info";
import HomeForm from "./components/Form";
import { Container } from "../../components/reusable/Container";

const LoginPage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<InfoHome />}
        children2={<HomeForm />}
      ></FormWrapper>
    </Container>
  );
};

export default LoginPage;
