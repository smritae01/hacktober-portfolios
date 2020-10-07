import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  getAllSkills,
  getSortedPortfoliosData,
  PortfolioMetadata,
} from "./../utils/markdown";
import config from "../config.json";
import { capitalizeFirstLetter } from "./../utils/capitalizeFirstLetter";
import { getSkillColor } from "./../utils/getRandomSkillColor";
import { useEffect, useState } from "react";
import {
  Description,
  H1,
  Img,
  Main,
  NameWrapper,
  PortfolioSkill,
  PortfolioSkills,
  Project,
  ProjectsWrapper,
  Row,
  Skill,
  Skills,
} from "../components/index.styles";

const HomePage: NextPage<{
  projectsData: PortfolioMetadata[];
  skills: string[];
}> = ({ projectsData, skills }) => {
  const [selectedSkill, setSelectedSkill] = useState<null | string>(null);
  const [skillsWithColors, setSkillsWithColors] = useState<
    { color: string; skill: string }[] | null
  >(null);

  if (selectedSkill)
    projectsData = projectsData.filter(data =>
      data.skills.toLowerCase().split(" ").includes(selectedSkill)
    );

  // Converting array to multidimensional array (every array in the array is a row)
  let firstItem = null;
  const data = projectsData
    .map((data, i) => {
      if (i == 0 && projectsData.length > 1) {
        firstItem = data;
        return;
      } else if (projectsData.length === 1) {
        return [data, null];
      } else if ((i + 1) % 2 == 0) {
        try {
          return [firstItem, data];
        } finally {
          firstItem = null;
        }
      } else if (i + 1 === projectsData.length && !firstItem) {
        return [data, null];
      } else if (i + 1 === projectsData.length && firstItem)
        return [firstItem, data];
      else firstItem = data;
    })
    .filter(data => typeof data !== "undefined");

  useEffect(() => {
    setSkillsWithColors(
      skills.map(skill => ({
        color: getSkillColor(),
        skill,
      }))
    );
  }, []);

  return skillsWithColors ? (
    <>
      <Head>
        <title>Portfolios</title>
      </Head>
      <Main>
        <H1>Portfolios</H1>
        <Description>
          {config.description}
          <a href={config.descriptionLink}>{config.descriptionLink}</a>
        </Description>
        <Skills>
          <p>Select skill: </p>
          {skillsWithColors.map(({ skill, color }) => (
            <Skill
              key={skill}
              skillColor={color}
              onClick={() => setSelectedSkill(skill.toLowerCase())}
              selected={skill.toLowerCase() === selectedSkill}
            >
              {capitalizeFirstLetter(skill)}
            </Skill>
          ))}
        </Skills>
        <ProjectsWrapper>
          {data.map((row, i) => (
            <Row key={i}>
              {row.map((portfolio: PortfolioMetadata | null) =>
                portfolio ? (
                  <Project
                    key={portfolio.imgUrl}
                    href={portfolio.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Img src={portfolio.imgUrl} />
                    <NameWrapper>
                      <h2>{portfolio.name}</h2>
                      <PortfolioSkills>
                        <p>Skills: </p>
                        {portfolio.skills.split(" ").map(skill => {
                          return (
                            <PortfolioSkill
                              skillColor={
                                skillsWithColors.find(
                                  el => el.skill === skill.toLowerCase()
                                ).color
                              }
                            >
                              {capitalizeFirstLetter(skill)}
                            </PortfolioSkill>
                          );
                        })}
                      </PortfolioSkills>
                    </NameWrapper>
                  </Project>
                ) : null
              )}
            </Row>
          ))}
        </ProjectsWrapper>
      </Main>
    </>
  ) : null; // TODO: Loading
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const projectsData = getSortedPortfoliosData();
  const skills = getAllSkills();
  console.log("Skills: ", skills);
  console.log("Projectsdata: ", projectsData);
  return {
    props: {
      projectsData,
      skills,
    },
  };
};
