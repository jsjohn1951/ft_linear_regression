import inquirer from "inquirer";
import { model, readData } from "../../shared/storage.ts";

async function main() {
  try {
    readData("models/model.json", "json");
    const input = await inquirer.prompt([
      {
        type: "input",
        name: "mileage",
        message: "What is the mileage?",
        validate: (value) => !isNaN(Number(value)) || "Please enter a number",
      },
    ]);

	console.log('\nFormula:')
	console.log('estimatedPrice(mileage) = theta0 + (theta1 * mileage)\n')
    console.log(
      `price = ${model.theta0} + (${model.theta1} * ${input.mileage})`,
    );
    console.log(
      "estimated price:",
      model.theta0 + model.theta1 * input.mileage,
    );
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
