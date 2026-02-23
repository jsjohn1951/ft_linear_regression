import { existsSync, readFileSync, writeFile } from "fs";
import { mkdir } from "fs/promises";
import { DataModel, DataStorage } from "./schema.ts";

export let store: DataStorage = new DataStorage();

export let model: DataModel = new DataModel();

/**
 * saveModel
 * @description Saves the newly generated theta0, and theta1 as our model
 */
export async function saveVisData(
  data: { x: number; y: number }[],
  modelName: string = "data.json",
  dir: string = "programs/moulinette/data",
) {
  await mkdir(`./${dir}`, { recursive: true });
  writeFile(
    `${dir}/${modelName}`,
    JSON.stringify({ points: data, thetas: model }),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    },
  );
  console.log("Data saved to data.json");
}

/**
 * saveModel
 * @description Saves the newly generated theta0, and theta1 as our model
 */
export async function saveModel(
  modelName: string = "model.json",
  dir: string = "models",
) {
  await mkdir(`./${dir}`, { recursive: true });
  writeFile(`${dir}/${modelName}`, JSON.stringify(model), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  console.log("Model saved to model.json");
}

/**
 * readData
 * @description reads from the data.csv file and stores info within the exported store
 */
export function readData(
  file: string = "data.csv",
  type: "csv" | "json" = "csv",
) {
  if (!existsSync(file)) throw new Error("File Not Found!");
  const rawData: string = readFileSync(file, "utf8");
  if (type === "json") {
    const data: DataModel = JSON.parse(rawData);
    model.theta0 = data.theta0;
    model.theta1 = data.theta1;
    return;
  }
  rawData
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
