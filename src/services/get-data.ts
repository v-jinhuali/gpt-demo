export async function getData(url: string) {
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    return response.json();
  } catch (err) {
    return err;
  }
}
