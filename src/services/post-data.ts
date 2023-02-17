export async function postData(url: string, payload: {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const responseData = await response.json();
    return { data: responseData };
  } catch (err) {
    return Promise.reject(err);
  }
}
