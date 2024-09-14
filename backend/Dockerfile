# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the content of the src directory into the container at /app
COPY ./src /app

# Install any necessary dependencies
RUN pip install --no-cache-dir flask flask-cors

# Expose the port Flask will run on
EXPOSE 5000

# Run the Flask application
CMD ["python3", "mock_server.py"]
