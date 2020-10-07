import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const H1 = styled.h1`
  font-family: "Open Sans", sans-serif;
  color: #445166;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 170px;
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  text-shadow: #ededed 3px 2px 0;
  position: relative;
  margin: 25px 0;
  &:after {
    content: "Portfolios";
    position: absolute;
    left: 8px;
    top: 9px;
    background-image: -webkit-linear-gradient(
      left top,
      transparent 0%,
      transparent 25%,
      #555 25%,
      #555 50%,
      transparent 50%,
      transparent 75%,
      #555 75%
    );
    background-size: 4px 4px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: -5;
    display: block;
    text-shadow: none;
  }
  @media screen and (max-width: 1050px) {
    font-size: 100px;
  }
  @media screen and (max-width: 630px) {
    font-size: 70px;
  }
  @media screen and (max-width: 500px) {
    font-size: 50px;
  }
`;

export const Description = styled.p`
  text-align: center;
  margin-bottom: 10px;
  a {
    color: #262d38;
  }
`;

export const Skills = styled.div`
  width: 95%;
  max-width: 1050px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p:not(:first-of-type) {
    margin-left: 10px;
  }
`;

export const Skill = styled.p<{ skillColor: string; selected: boolean }>`
  background: ${props => props.skillColor};
  color: white;
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
  border: ${props => (props.selected ? "2px solid black" : "none")};
`;

export const ProjectsWrapper = styled.div`
  width: 95%;
  max-width: 1050px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

export const Project = styled.a`
  margin: 20px 0;
  width: 45%;
  box-shadow: 10px 10px 0 0 #272d37;
  border-radius: 2px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
  @media screen and (max-width: 650px) {
    width: 95%;
  }
`;

export const Img = styled.img`
  max-width: 100%;
  float: left;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const NameWrapper = styled.div`
  height: 80px;
  background: #465162;
  float: left;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: column;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  h2 {
    color: white;
    font-weight: 400;
    font-size: 22px;
    margin-left: 7px;
  }
`;

export const PortfolioSkills = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    color: white;
    &:first-child {
      margin-left: 7px;
    }
  }
`;

export const PortfolioSkill = styled.p<{ skillColor: string }>`
  background: ${props => props.skillColor};
  padding: 4px;
  border-radius: 6px;
  margin-left: 10px;
`;
