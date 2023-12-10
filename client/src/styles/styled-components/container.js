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

export const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 12vh;
  border-radius: 50%;
  background-color: #42526e;
  background-image: url('https://avatars.githubusercontent.com/u/97423069?v=4');
  background-size: cover;
  & .icon{
    width: 25px;
    height: 25px;
    padding: 4px;
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: #7f7cdf;
    border-radius: 50%;
    color: white;
  }
`;

export const Button = styled.button`
  background-color: #817cdf !important; 
  color: white;
  padding: 5px 8px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  width: ${(props)=>props?.width};
  aspect-ratio: 5/1;
`