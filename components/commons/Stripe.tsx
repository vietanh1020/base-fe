import { Input } from "@mui/material";
import { Row } from "react-bootstrap";
import styled from "styled-components";

export const Info = styled(Row)`
  margin-left: 0;
  margin-right: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: 1px solid #e2e9ef;
  border-radius: 6px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  Col {
    margin-right: 0.25rem;
  }
`;

export const FormLabel = styled.label`
  font-size: 15px;
  color: "#30313d";
  margin-bottom: 6px;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  div {
    width: 100%;
  }

  .spacing {
    width: 8%;
  }
`;

export const InputName = styled(Input)`
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 17px 20px;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 3%), 0px 3px 6px rgb(0 0 0 / 2%);
`;

export const CardInputWrapper = styled.div<{
  focus?: boolean;
  err?: boolean;
}>`
  position: relative;
  border: 1px solid;

  border-color: ${(props) => (props.err ? "red" : "#e6e6e6")};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${(props) =>
    props.focus
      ? "0 0 0 0.25rem rgb(13 110 253 / 25%);"
      : "0px 1px 1px rgb(0 0 0 / 3%), 0px 3px 6px rgb(0 0 0 / 2%)"};

  margin-bottom: 16px;

  .icon {
    position: absolute;
    top: 50%;
    left: 80%;
    width: 40px;
    transform: translateY(-50%);
  }
`;
