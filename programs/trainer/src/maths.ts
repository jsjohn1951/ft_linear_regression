import { DataStorage } from "../../shared/schema.ts";
import { model, store } from "../../shared/storage.ts";

// mileage = x, price = y

// ? < -------------- Training Happens here: -------------- >

function fScaledX() {
  const min = Math.min(...store.mileage);
  const max = Math.max(...store.mileage);
  if (max - min === 0) return store.mileage.map(() => 0);
  return store.mileage.map((x) => (x - min) / (max - min || 1));
}

function fNormalize() {
  const min = Math.min(...store.mileage);
  const max = Math.max(...store.mileage);
  const range = max - min || 1;

  model.theta0 -= (model.theta1 * min) / range;
  model.theta1 /= range;
}

/**
 * TRAIN MODEL: Gradient Descent Implementation
 * * CONCEPT:
 * We are trying to find the minimum of the 'Cost Function' (the error).
 * The formulas from the subject represent the 'Partial Derivatives' 
 * of the Mean Squared Error. They tell us the DIRECTION and MAGNITUDE 
 * to move theta0 and theta1 to reduce the error.
 * * FORMULA MAPPING:
 * 1. estimatePrice(mileage[i]) -> (theta1 * x) + theta0
 * (The current prediction for a given mileage)
 * * 2. tmpTheta0 = learningRate * 1/m * Σ(prediction - price)
 * (This calculates the vertical shift needed to center the line)
 * * 3. tmpTheta1 = learningRate * 1/m * Σ((prediction - price) * mileage)
 * (This calculates the rotation/tilt needed for the line)
 * * 4. theta = theta - tmpTheta
 * (The 'Simultaneous Update' step where we actually move the line)
 */
export function trainModel(rate: number = 0.1, iterations: number = 1000000) {
  const scaledX = fScaledX();

  for (let i = 0; i < iterations; i++) {
    let sum0 = 0, sum1 = 0;

    if (i % 10000 === 0) {
      console.log(
        `Iteration ${i}: theta0 = ${model.theta0.toFixed(2)}, theta1 = ${model.theta1.toFixed(2)}`,
      );
    }
    store.price.forEach((value, index) => {
      const prediction = model.theta1 * scaledX[index] + model.theta0;
      const error = prediction - value;

      sum0 += error;
      sum1 += error * scaledX[index];
    });

    const tmpGen = (sumVersion: number) => {
      return rate * (1 / store.price.length) * sumVersion;
    };

    const tmpTheta0 = tmpGen(sum0);
    const tmpTheta1 = tmpGen(sum1);

    model.theta0 -= tmpTheta0;
    model.theta1 -= tmpTheta1;
  }
  fNormalize();
}
