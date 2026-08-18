export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type"); 
	const file = searchParams.get("file");

	const base =
		type === "cars"
			? process.env.BLOB_CARS_BASE
			: process.env.BLOB_PAINTINGS_BASE;

	if (!base || !file) return new Response("Not found", { status: 404 });

	const res = await fetch(`${base}/${encodeURIComponent(file)}`);
	const buffer = await res.arrayBuffer();

	return new Response(buffer, {
		headers: {
			"Content-Type": res.headers.get("Content-Type"),
			"Cache-Control": "public, max-age=31536000",
		},
	});
}
