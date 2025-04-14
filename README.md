# Boston Housing Price Prediction

This project implements a machine learning model to predict Boston housing prices based on the classic Boston Housing dataset. The application uses a linear regression model trained on various housing features such as crime rate, number of rooms, and accessibility to predict median housing prices.

## Live Demo

The application is hosted and can be accessed at:
[https://house-price-prediction-5ss5.onrender.com/](https://house-price-prediction-5ss5.onrender.com/)

## Project Structure

### Key Files

- **housing-linear-regression.ipynb**: Jupyter notebook containing data analysis and model training.
- **app.py**: Flask web application that serves the prediction model and handles API requests.
- **requirements.txt**: Lists all Python dependencies required for the project.
- **regmodel.pkl**: Serialized trained linear regression model.
- **scaling.pkl**: Serialized StandardScaler used for feature normalization.
- **templates/index.html**: Main HTML page for the web interface.
- **static/**: Directory containing CSS styles and JavaScript for the front-end.
- **Dockerfile**: Configuration for containerizing the application.

### Model Training

The model training process (from housing-linear-regression.ipynb) includes:

- Loading and preprocessing the Boston Housing dataset
- Exploratory data analysis with correlation analysis
- Feature standardization
- Training a linear regression model
- Model evaluation (achieved R² score of 0.711 on test data)
- Serialization of the model and scaler for deployment

## Running the Application

### Using Docker

1. Build the Docker image:

```bash
docker build -t housing-prediction .
```

2. Run the container:

```bash
docker run -p 5000:5000 -e PORT=5000 housing-prediction
```

3. Access the application at `http://localhost:5000`

### Manual Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/housing-prediction.git
cd housing-prediction
```

2. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Run the application:

```bash
python app.py
```

4. Access the application at `http://localhost:5000`

## Data

The Boston Housing dataset includes information about housing in Boston from the 1970s. Note that when looking at predictions, take into account that data is from 1978 when the median house price was around $21,600.
