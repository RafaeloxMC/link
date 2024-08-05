import { ReactNode } from "react";

export function ContentBox({ children }: { children: ReactNode }) {
	return (
		<div className="relative z-20 flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-3xl backdrop-filter rounded-3xl p-8 w-full max-w-md">
			<div className="flex flex-col justify-center items-center w-full">
				{children}
			</div>
		</div>
	);
}
