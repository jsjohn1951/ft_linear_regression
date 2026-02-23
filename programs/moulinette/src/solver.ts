import { DataStorage } from "../../shared/schema.ts";


function sum(arr: number[]) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

function getAvg(arr: number[]): number {
  return sum(arr) / arr.length;
}

function differencesToAverages(x: number[], y: number[]) {
  const avgX = getAvg(x);
  const avgY = getAvg(y);
  return {
	xDifferencesToAverage: x.map((value) => avgX - value),
	yDifferencesToAverage: y.map((value) => avgY - value),
	avgX: avgX,
	avgY: avgY,
  };
}

/**
 * ! @description this function is not used for training.
 * !	it's sole purpose is to provide a real Theta1 and Theta0
 * !	for which we can compare the trained model to.
 * @param storage
 * @returns object containing theta1, theta0
 */
export function linearRegression(storage: DataStorage) {
  const { xDifferencesToAverage, yDifferencesToAverage, avgX, avgY } =
	differencesToAverages(storage.mileage, storage.price);

  const xDifferencesToAverageSquared = xDifferencesToAverage.map(
	(value) => value ** 2,
  );

  const xAndYDifferencesMultiplied = xDifferencesToAverage.map(
	(curr, index) => curr * yDifferencesToAverage[index],
  );
  const SSxx = xDifferencesToAverageSquared.reduce(
	(prev, curr) => prev + curr,
	0,
  );
  const SSxy = xAndYDifferencesMultiplied.reduce(
	(prev, curr) => prev + curr,
	0,
  );
  const slope = SSxy / SSxx;
  const intercept = avgY - slope * avgX;
  return { theta1: slope, theta0: intercept };
}
