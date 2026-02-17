import { linearRegression, trainModel } from "./maths.ts";
import { model, readData, saveModel, store } from "./storage.ts";

function main() {
  try {
	readData();
	// Test to compare with:
	const {theta0, theta1} = linearRegression(store);
	
	trainModel();

	console.log();
	console.log('slope - calculated:', theta1);
	console.log('y-intercept: - calculated', theta0);
	console.log('slope - actual training:', model.theta1);
	console.log('y-intercept: - actual training', model.theta0);
	console.log();
	saveModel();

  } catch (err) {
    console.error("Could not read file:", err);
  }
}

main();
