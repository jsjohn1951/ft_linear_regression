import { readFileSync, writeFile } from "fs";
import { stringify } from "querystring";

export class DataStorage {
  mileage: number[] = [];
  price: number[] = [];
}

export class DataModel {
	theta1: number = 0;
	theta0: number = 0;
}

export let store: DataStorage = new DataStorage();

export let model: DataModel = new DataModel();

/**
 * saveModel
 * @description Saves the newly generated theta0, and theta1 as our model
 */
export function saveModel() {
  writeFile("models/model.json", JSON.stringify(model), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  console.log("Model saved to model.json");
}

/**
 * readData
 * @description reads from the data.csv file and stores info within the exported store
 */
export function readData() {
  const data: string = readFileSync("data.csv", "utf8");
  data
    .trim()
    .split("\n")
    .forEach((line) => {
      const [mileage, price] = line.split(",").map(Number);
      if (mileage && price) {
        store.mileage.push(mileage);
        store.price.push(price);
      }
    });
}
