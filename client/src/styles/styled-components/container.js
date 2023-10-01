import styled from "styled-components";

export const Card = styled.div`
  background-color: ${(props) => props?.bg};
`;
export const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.2rem;
`;

export const AvatarIcon = styled.div`
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #de3e1f;
  color: white;
  border-radius: 50%;
`;
