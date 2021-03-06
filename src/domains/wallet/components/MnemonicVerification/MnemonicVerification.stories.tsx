import React from "react";

import { MnemonicVerification } from "./MnemonicVerification";

export default { title: "Domains / Wallet / Components / MnemonicVerification" };

export const Default = () => (
	<div className="max-w-lg">
		<MnemonicVerification
			handleComplete={() => console.log(true)}
			mnemonic="ark btc usd bnb eth ltc etc lsk trx dash xtz eur"
			optionsLimit={6}
		/>
	</div>
);

export const SpecificWordPositions = () => (
	<div className="max-w-lg">
		<MnemonicVerification
			handleComplete={() => console.log(true)}
			mnemonic="ark btc usd bnb eth ltc etc lsk trx dash xtz eur"
			wordPositions={[3, 6, 9]}
			optionsLimit={6}
		/>
	</div>
);
