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

const InfoHome = () => {
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

export default InfoHome;
