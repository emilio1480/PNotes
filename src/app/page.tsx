export default async function Home() {
	return (
		<div className={"mx-20 grid h-screen grid-cols-1 text-center text-4xl"}>
			<p className={"self-end text-5xl"}>Welcome,</p>
			<p className={"mt-5"}>Use the menu on the left to create a new note or browse your current topics!</p>
		</div>
	);
}
