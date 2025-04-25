export async function handler(event) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    const { name, email } = JSON.parse(event.body);
  
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "your_fallback_api_key_here"
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name },
        listIds: [4],
        updateEnabled: true
      }),
    });
  
    if (!response.ok) {
      const err = await response.text();
      return { statusCode: response.status, body: err };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Contact added successfully" })
    };
}