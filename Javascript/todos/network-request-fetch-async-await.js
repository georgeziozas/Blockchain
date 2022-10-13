const getTodos = async () => {
  const response_luigi = await fetch("todos/luigi.json");
  if (response_luigi.status !== 200) {
    throw new Error("Cannot Fetch the Data");
  }
  const data_luigi = await response.json();

  const response_mario = await fetch("todos/mario.json");
  if (response_luigi.status !== 200) {
    throw new Error("Cannot Fetch the Data");
  }
  const data_mario = await response.json();

  const response_swan = await fetch("todos/swan.json");
  if (response_luigi.status !== 200) {
    throw new Error("Cannot Fetch the Data");
  }
  const data_swan = await response.json();

  return data_luigi, data_mario, data_swan;
};

getTodos()
  .then(
    (data_luigi, data_mario, data_swan) => console.log("resolved:", data_luigi),
    console.log("resolved:", data_mario),
    console.log("resolved:", data_swan)
  )
  .catch((err) => console.log("rejected:", err.message));
