import { Text } from "../../../components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "../../../assets/svg/hekidesk-transparent.svg";
import { ImageWrapper } from "./CSS";



const LoginBanner = () => {
  return (
    <span>
      <br />
      <br />
      <br />
      <br />
      <Text>Log in to your account and get started.</Text>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
    </span>
  );
};

export default LoginBanner;
