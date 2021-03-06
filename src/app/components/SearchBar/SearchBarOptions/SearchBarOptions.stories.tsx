import { withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { SearchBarOptions } from "./SearchBarOptions";

export default { title: "App / Components / SearchBar / SearchBarOptions", decorators: [withKnobs] };

export const Default = () => {
	const options = [
		{ label: "Wallet", value: "wallet" },
		{ label: "Plugin", value: "plugin" },
		{ label: "Delegate", value: "delegate" },
	];
	const selectedOption = null;

	return <SearchBarOptions options={options} selectedOption={selectedOption} onSelect={(option: any) => void 0} />;
};
