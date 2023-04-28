import styled from "styled-components";
import { Text } from "../../../components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "../../../assets/svg/hekidesk-transparent.svg";

const ImageWrapper = styled.span`
  position: absolute;
  bottom: -20px;
  right: -80px;
  width: 300px;
  height: auto;
  overflow: hidden;
`;

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
