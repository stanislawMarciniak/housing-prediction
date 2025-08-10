document.addEventListener("DOMContentLoaded", function () {
  let trainingData = [];
  let currentRowIndex = -1;

  // Fetch the training data
  fetch("/get_training_data")
    .then((response) => response.json())
    .then((data) => {
      trainingData = data;
      console.log("Loaded training data with", trainingData.length, "rows");
    })
    .catch((error) => console.error("Error loading training data:", error));

  const randomBtn = document.getElementById("randomBtn");
  randomBtn.addEventListener("click", function () {
    if (trainingData.length > 0) {
      // Pick a random row from training data
      currentRowIndex = Math.floor(Math.random() * trainingData.length);
      const randomRow = trainingData[currentRowIndex];

      // Fill the form with values from the random row (excluding MEDV which is the target)
      for (const feature in randomRow) {
        if (feature !== "MEDV") {
          const input = document.getElementsByName(feature)[0];
          if (input) {
            input.value = randomRow[feature];
          }
        }
      }

      // Enable the predict button
      checkInputs();
    }
  });

  const predictBtn = document.getElementById("predictBtn");
  const inputs = document.querySelectorAll("input[type='text']");
  inputs.forEach((input) => {
    input.addEventListener("input", checkInputs);
  });

  function checkInputs() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        allFilled = false;
      }
    });
    predictBtn.disabled = !allFilled;
  }

  const predictForm = document.getElementById("predictForm");
  predictForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(predictForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = parseFloat(value);
    });

    fetch("/predict_api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Format the prediction with commas
        const predictedValue = (result * 1000).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        // Create the prediction display
        let predictionHTML = `<p>Predicted Price: $${predictedValue}</p>`;

        // Add actual value comparison if we loaded this from training data
        if (currentRowIndex >= 0 && trainingData[currentRowIndex]) {
          const actualValue = (
            trainingData[currentRowIndex].MEDV * 1000
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          // Remove commas for calculation
          const differenceNum = Math.abs(
            parseFloat(predictedValue.replace(/,/g, "")) -
              parseFloat(actualValue.replace(/,/g, ""))
          );

          const difference = differenceNum.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          const percentDiff = (
            (differenceNum / parseFloat(actualValue.replace(/,/g, ""))) *
            100
          ).toFixed(1);

          predictionHTML += `
            <p>Actual Price: $${actualValue}</p>
            <p>Difference: $${difference} (${percentDiff}%)</p>
          `;

          currentRowIndex = -1;
        }

        document.getElementById("prediction").innerHTML = predictionHTML;
      });
  });
});
