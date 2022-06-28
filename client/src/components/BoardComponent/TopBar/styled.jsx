import styled from "styled-components";
import { xs } from "../../../util/BreakPoints";

export const TopBar = styled.div`
  height: 52px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0rem 1rem;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.3rem;

  ${xs({
    gap: "0.1rem",
  })}
`;


export const InviteButton = styled.button`
  display: flex;
  border: none;
  height: 2rem;
  color: white;
  padding: 0rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3px;
  background-color: #0079bf;
  cursor: pointer;
  transition: 250ms ease;
  &:hover {
    background-color: #00599f;
  }
`;

