import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

const portfoliosDirectory = path.join(process.cwd(), "portfolios");

export interface PortfolioMetadata {
  name: string;
  portfolio: string;
  imgUrl: string;
  skills: string;
}

export const getSortedPortfoliosData = () => {
  const fileNames = readdirSync(portfoliosDirectory);

  return fileNames.map(fileName => {
    const fullPath = path.join(portfoliosDirectory, fileName);
    const fileContent = readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContent);

    return matterResult.data as PortfolioMetadata;
  });
};

export const getAllSkills = () => {
  const data = getSortedPortfoliosData();

  let returnData = [];
  data.forEach(data => {
    data.skills
      .toLowerCase()
      .split(" ")
      .forEach(skill => returnData.push(skill));
  });
  return Array.from(new Set(returnData));
};
