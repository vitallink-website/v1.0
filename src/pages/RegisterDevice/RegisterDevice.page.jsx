import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { Container } from "../../components/reusable/Container";
import RegisterForm from "./components/Form";
import RegisterInfo from "./components/Info";

const RegisterDevicePage = () => {
  return (
    <Container>
      <FormWrapper
        children1={<RegisterInfo />}
        children2={<RegisterForm />}
      ></FormWrapper>
    </Container>
  );
};

export default RegisterDevicePage;
