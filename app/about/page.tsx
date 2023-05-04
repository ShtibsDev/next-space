import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us',
	description: 'About NextSpace',
};

export default function Blog() {
	return (
		<>
			<h1 className="text-3xl text-bold">About us</h1>
			<p>We are a social media company that wants to bring people together!</p>
		</>
	);
}
