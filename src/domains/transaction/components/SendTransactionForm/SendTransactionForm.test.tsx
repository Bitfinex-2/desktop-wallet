/* eslint-disable @typescript-eslint/require-await */
import { Profile, ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { act, renderHook } from "@testing-library/react-hooks";
import { httpClient } from "app/services";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	env,
	fireEvent,
	getDefaultProfileId,
	render,
	syncFees,
	useDefaultNetMocks,
	waitFor,
	within,
} from "utils/testing-library";

import { SendTransactionForm } from "./";

let profile: Profile;
let wallet: ReadWriteWallet;
const defaultFee = "71538139";

describe("SendTransactionForm", () => {
	beforeAll(async () => {
		profile = env.profiles().findById(getDefaultProfileId());
		wallet = profile.wallets().values()[0];

		await syncFees();
	});

	beforeEach(() => {
		httpClient.clearCache();
	});

	afterAll(() => {
		useDefaultNetMocks();
	});

	it("should render", async () => {
		let rendered: any;
		const { result: form } = renderHook(() => useForm());

		await act(async () => {
			rendered = render(
				<FormProvider {...form.current}>
					<SendTransactionForm profile={profile} networks={env.availableNetworks()} />
				</FormProvider>,
			);
		});

		expect(rendered.container).toMatchSnapshot();
	});

	it("should select fill out form", async () => {
		const { result: form } = renderHook(() => useForm());
		form.current.register("fee");
		form.current.register("senderAddress");
		form.current.setValue("senderAddress", wallet.address());
		form.current.setValue("fee", defaultFee);

		let rendered: any;

		await act(async () => {
			rendered = render(
				<FormProvider {...form.current}>
					<SendTransactionForm profile={profile} networks={env.availableNetworks()} />
				</FormProvider>,
			);
		});

		const { getByTestId } = rendered;

		await act(async () => {
			await waitFor(() => expect(form.current.getValues("fee")).toEqual("71538139"));

			// Fee
			await waitFor(() => expect(getByTestId("InputCurrency")).toHaveValue("0.71538139"));
			const fees = within(getByTestId("InputFee")).getAllByTestId("SelectionBarOption");
			fireEvent.click(fees[1]);
			await waitFor(() => expect(getByTestId("InputCurrency")).not.toHaveValue("0"));

			expect(rendered.container).toMatchSnapshot();
		});
	});

	it("should select a sender & update fees", async () => {
		const { result: form } = renderHook(() => useForm());

		form.current.register("fee");
		form.current.register("network");
		form.current.register("senderAddress");
		form.current.setValue("senderAddress", wallet.address());

		for (const network of env.availableNetworks()) {
			if (network.id() === wallet.networkId() && network.coin() === wallet.coinId()) {
				form.current.setValue("network", network, { shouldValidate: true, shouldDirty: true });

				break;
			}
		}

		let rendered: any;

		await act(async () => {
			rendered = render(
				<FormProvider {...form.current}>
					<SendTransactionForm profile={profile} networks={env.availableNetworks()} />
				</FormProvider>,
			);

			await waitFor(() => expect(rendered.getByTestId("SelectAddress__wrapper")).toBeTruthy());
		});

		const { getByTestId } = rendered;

		await act(async () => {
			await waitFor(() => expect(form.current.getValues("fee")).toEqual("71538139"));

			fireEvent.click(within(getByTestId("sender-address")).getByTestId("SelectAddress__wrapper"));
			await waitFor(() => expect(getByTestId("modal__inner")).toBeTruthy());

			const firstAddress = getByTestId("SearchWalletListItem__select-1");
			fireEvent.click(firstAddress);
			expect(() => getByTestId("modal__inner")).toThrow(/Unable to find an element by/);

			expect(rendered.container).toMatchSnapshot();
		});
	});
});
