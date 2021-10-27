addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request).catch(err => new Response(err.stack, {status: 500})));
});

async function handleRequest(request: Request) {
    let path = "/" + request.url.split("/")[3];
    let forwardLink = await ShortLink.get(path);
    if (forwardLink === null) return new Response("Link not found.", {status: 404});
    console.log(`${path},${forwardLink},${Date.now()}`);
    return Response.redirect(forwardLink, 302);
}
