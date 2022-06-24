import { Grid, TextareaAutosize, TextField } from "@mui/material";
import styled from "styled-components";

import img from "../../assets/images/backChat.png";

export const NickName = styled(TextField)`
   & input .aria-invalid {
    box-sizing: border-box;
  }
`;

export const ChatMessages = styled(Grid)`
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;  
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.8;
  width: 100%;
  height: 80%;
  padding: 10px; 
  overflow: auto;
   &::-webkit-scrollbar {
    width: 0;
  }
`;

export const FormChat = styled.form`
  width: 50%;  
  height: 300px;
  position: absolute;
  bottom: 0;
  @media (max-width: 450px) {
    height: 200px
  }
`;

export const AreaMessage = styled(TextareaAutosize)`
  width: 80%;
  resize: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const InsertZone = styled(Grid)`
  height: 20%;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  background-color: #071727;
  align-items: center;
`;