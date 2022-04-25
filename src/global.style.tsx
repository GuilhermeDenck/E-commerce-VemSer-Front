import styled from "styled-components";
import { Theme } from "./theme";
import image from "./images/background-div.jpg";
import { FaSearch } from "react-icons/fa";

export const Container = styled.div`
  width: 100%;
`;

export const ContainerPrincipal = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background: url(${image}) no-repeat center;
  align-items: center;
  justify-content: center;
  gap: 10%;
  height: 100vh;

  @media (max-width: 1190px) {
    display: flex;
    justify-content: center;
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Theme.color.white};
  text-shadow: 0.1em 0.1em 0.2em black;
  align-items: center;
  justify-content: center;
  line-height: 5px;

  @media (max-width: 1190px) {
    display: none;
  }
`;

export const Title = styled.h1<{ size: string; spacing: string }>`
  font-size: ${(props) => props.size};
  letter-spacing: ${(props) => props.spacing};
`;

export const ContainerGetInfo = styled.div`
  width: 600px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 14px;
  box-shadow: 0px 0px 4px 1px ${Theme.color.white};
  background: linear-gradient(
    0.42deg,
    rgba(0, 0, 0, 0.35) 0.39%,
    rgba(0, 0, 0, 0) 101.3%
  );
  backdrop-filter: blur(25px);

  @media (max-width: 700px) {
    width: 400px;
    height: 600px;
  }
`;

export const Input = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  margin-bottom: 10px;

  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 2px solid ${Theme.color.white};

  background: none;
  color: ${Theme.color.white};
  font-size: ${Theme.fontSize};

  ::placeholder {
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
    font-family: "Poppins", sans-serif;
    color: ${Theme.color.white};
    font-size: ${Theme.fontSize};
  }

  :focus {
    outline: none;
  }
`;

export const InputForm = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  border: 1px ${Theme.color.primary} solid;
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  font-family: "Poppins", sans-serif;

  padding: 0 10px;
  box-sizing: border-box;

  :focus {
    outline: none;
  }

  ::placeholder {
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
    font-family: "Poppins", sans-serif;
  }
`;

export const Btn = styled.button<{ width: string }>`
  width: ${(props) => props.width};
  height: 42px;
  background: rgb(0, 113, 191);
  background: radial-gradient(
    circle,
    rgba(0, 113, 191, 1) 20%,
    rgba(2, 50, 85, 1) 100%
  );
  border-radius: 4px;
  outline: none;
  border: none;
  color: ${Theme.color.white};
  cursor: pointer;
`;

export const BtnForm = styled.button<{ width: string }>`
  width: ${(props) => props.width};
  height: 42px;
  background: ${(props) => props.color};
  border-radius: 4px;
  outline: none;
  border: none;
  color: ${Theme.color.white};
`;

export const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: ${Theme.fontSize};
  color: ${Theme.color.white};
  text-align: center;
`;

export const LinkCustom = styled.div`
  list-style: none;
  text-decoration: none;
  background: radial-gradient(
    circle,
    rgba(0, 113, 191, 1) 20%,
    rgba(2, 50, 85, 1) 100%
  );
  color: black;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  a {
    list-style: none;
    text-decoration: none;
  }
`;

export const DivErrorYup = styled.div`
  color: ${Theme.color.danger};
  font-size: 10px;
`;

export const CenterCustom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  color: ${Theme.color.black};
  margin-top: ${Theme.margin};
`;

export const SelectCustom = styled.select<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  :focus {
    outline: none;
  }

  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px ${Theme.color.primary} solid;

  padding: 0 10px;
  box-sizing: border-box;
`;


export const IconSearch = styled(FaSearch)`
  position: absolute;
  left: 73%;
  opacity: 0.5;

  @media (max-width: 1000px) {
    left: 72%;
  }
  @media (max-width: 600px) {
    left: 71%;
  }
  @media (max-width: 400px) {
    display: none;
  }
`;