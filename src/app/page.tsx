export default async function Home() {
	return (
		<div className="grid min-h-[55svh] grid-cols-1 px-5 text-center text-2xl sm:px-10 sm:text-3xl md:min-h-svh md:px-20 md:text-4xl">
			<p className="self-end text-4xl sm:text-5xl">Welcome,</p>
			<p className="mt-5 leading-tight">Use the menu to create a new note or browse your current topics.</p>
		</div>
	);
}
