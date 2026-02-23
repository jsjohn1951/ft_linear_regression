import { readData, saveVisData, store } from "../../shared/storage.ts";

async function main() {
  try {
    readData();
    readData("models/model.json", "json");
	if (store.mileage.length !== store.price.length)
		throw new Error('missing price or mileage');
    const data = store.mileage.map((val, index) => ({
      x: val,
      y: store.price[index],
    }));
    console.log("store:", data);
	await saveVisData(data);
  } catch (err) {
    console.log("Error:", err);
  }
}

main();
