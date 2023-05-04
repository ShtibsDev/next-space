'use client';
type Props = {
	error: Error;
	reset: () => void;
};

export default function UserError({ error, reset }: Props) {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<h1 className="text-3xl">Something went wrong...</h1>
			<p>{error.message}</p>
		</div>
	);
}
