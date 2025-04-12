const featureRanges = {
  CRIM: { min: 0.00632, max: 88.9762 },
  ZN: { min: 0.0, max: 100.0 },
  INDUS: { min: 0.46, max: 27.74 },
  CHAS: { min: 0.0, max: 1.0 },
  NOX: { min: 0.385, max: 0.871 },
  RM: { min: 3.561, max: 8.78 },
  AGE: { min: 2.9, max: 100.0 },
  DIS: { min: 1.1296, max: 12.1265 },
  RAD: { min: 1.0, max: 24.0 },
  TAX: { min: 187.0, max: 711.0 },
  PTRATIO: { min: 12.6, max: 22.0 },
  B: { min: 0.32, max: 396.9 },
  LSTAT: { min: 1.73, max: 50.0 },
};
const randomBtn = document.getElementById("randomBtn");
randomBtn.addEventListener("click", function () {
  for (const feature in featureRanges) {
    const min = featureRanges[feature].min;
    const max = featureRanges[feature].max;
    const randomValue = (Math.random() * (max - min) + min).toFixed(3);
    document.getElementsByName(feature)[0].value = randomValue;
  }
  checkInputs();
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
  e.preventDefault();
  const formData = new FormData(predictForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  fetch(predictForm.action, {
    method: predictForm.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }),
  })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("prediction").innerText =
        "Predicted Price: $" + result + "k";
    });
});
