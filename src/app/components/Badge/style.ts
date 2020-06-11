import { styled, css } from "twin.macro";

const outline = css`
	box-shadow: 0px 0px 0px 5px white;
`;

const shape = "flex border-2 rounded-full justify-center w-5 h-5 items-center align-middle";
const colors = "bg-theme-background border-transparent";
const position = "absolute";

export const Wrapper = styled.span`
	${outline}
`;

export const defaultClasses = `${shape} ${position} ${colors}`;