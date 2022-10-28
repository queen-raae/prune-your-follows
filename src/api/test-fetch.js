export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await response.json();
    res.send(json);
  } catch (error) {
    console.error(error);
    res.send("error");
  }
}
