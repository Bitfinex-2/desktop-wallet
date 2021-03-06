import React from "react";

type Props = {
	isFloatingLabel: boolean;
	label: string;
	labelClass: string;
	labelDescription: string;
	labelDescriptionClass?: string;
	labelAddon?: React.ReactNode;
	value: string;
	itemValueClass: string;
	content: React.ReactNode;
	contentClass?: string;
	wrapperClass?: string;
};

export const ListDividedItem = ({
	isFloatingLabel,
	label,
	labelClass,
	labelDescription,
	labelDescriptionClass,
	labelAddon,
	value,
	itemValueClass,
	content,
	contentClass,
	wrapperClass,
}: Props) => (
	<li className={`flex flex-col w-full ${wrapperClass || ""}`} data-testid="list-divided-item__wrapper">
		<div
			className={`flex justify-between ${isFloatingLabel ? "flex-col items-start" : "items-center"}`}
			data-testid="list-divided-item__inner-wrapper"
		>
			<div className="flex flex-col w-full space-y-2">
				<div className="flex items-center justify-between space-x-5">
					<span className={labelClass} data-testid="list-divided-item__label">
						{label}
					</span>
					{labelAddon && <span>{labelAddon}</span>}
				</div>
				{labelDescription && (
					<span
						className={`${labelDescriptionClass || "text-sm font-medium text-theme-neutral"}`}
						data-testid="list-divided-item__label--description"
					>
						{labelDescription}
					</span>
				)}
			</div>
			{value && (
				<div className={`${itemValueClass || ""}`}>
					<span data-testid="list-divided-item__value">{value}</span>
				</div>
			)}
		</div>
		{content && (
			<div className={contentClass || ""} data-testid="list-divided-item__content">
				{content}
			</div>
		)}
	</li>
);
