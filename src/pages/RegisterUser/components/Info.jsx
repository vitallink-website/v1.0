import { Text } from "../../../components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "../../../assets/svg/hekidesk-transparent.svg";
import { ImageWrapper } from "./CSS";


const RegisterInfo = () => {
  return (
    <span>
      <br />
      <br />
      <Text>Create new account</Text>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
    </span>
  );
};

export default RegisterInfo;
