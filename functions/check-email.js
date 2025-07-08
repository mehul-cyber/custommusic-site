export async function onRequestPost(context) {
  try {
    const { email } = await context.request.json();

    // 🔐 Secret emails from Cloudflare env variable
    const allowed = context.env.SECRET_EMAILS || '';
    const secretEmails = allowed
      .split(',')
      .map(e => e.trim().toLowerCase());

    const isSecret = secretEmails.includes(email.toLowerCase());

    return new Response(JSON.stringify({ unlock: isSecret }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ unlock: false, error: 'Invalid request' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    });
  }
}
