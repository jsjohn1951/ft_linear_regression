import { model, readData, saveModel } from "../../shared/storage.ts";
import { trainModel } from "./maths.ts";
// import { model, readData, saveModel, store } from "./storage.ts";

function main() {
  try {
	readData();
	trainModel();
	console.log();
	console.log('slope - actual training:', model.theta1);
	console.log('y-intercept: - actual training', model.theta0);
	console.log();
	saveModel();

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
