addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  let path = "/" + request.url.split("/")[3];
  let forwardLink = await ShortLink.get(path);
  console.log(`${path},${forwardLink},${Date.now()}`)
  return Response.redirect(forwardLink, 302);
}
