import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import {
	getAllSkills,
	getSortedPortfoliosData,
	PortfolioMetadata,
} from "./../utils/markdown";
import config from "../config.json";
import { capitalizeFirstLetter } from "./../utils/capitalizeFirstLetter";
import { getSkillColor } from "./../utils/getRandomSkillColor";

const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const H1 = styled.h1`
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

const Description = styled.p`
	text-align: center;
	margin-bottom: 10px;
	a {
		color: #262d38;
	}
`;

const Skills = styled.div`
	width: 95%;
	max-width: 1050px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	p:not(:first-of-type) {
		margin-left: 10px;
	}
`;

const Skill = styled.p<{ skillColor: () => string }>`
	background: ${props => props.skillColor()};
  color: white;
  padding: 4px;
  border-radius: 6px;
`;

const ProjectsWrapper = styled.div`
	width: 95%;
	max-width: 1050px;
`;

const Row = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: 650px) {
		flex-direction: column;
	}
`;

const Project = styled.a`
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

const Img = styled.img`
	max-width: 100%;
	float: left;
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
`;

const NameWrapper = styled.div`
	height: 50px;
	background: #465162;
	float: left;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	h2 {
		color: white;
		font-weight: 400;
		font-size: 22px;
		margin-left: 7px;
	}
`;

const HomePage: NextPage<{
	projectsData: PortfolioMetadata[];
	skills: string[];
}> = ({ projectsData, skills }) => {
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

	return (
		<>
			<Head>
				<title>Portfolios</title>
			</Head>
			<Main>
				<H1>Portfolios</H1>
				<Description>
					{config.description}
					<a href={config.descriptionLink}>
						{config.descriptionLink}
					</a>
				</Description>
				<Skills>
					{skills.map(skill => (
						<Skill key={skill} skillColor={getSkillColor}>
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
										</NameWrapper>
									</Project>
								) : null
							)}
						</Row>
					))}
				</ProjectsWrapper>
			</Main>
		</>
	);
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
