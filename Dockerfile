# Use a Node.js base image with Playwright
FROM mcr.microsoft.com/playwright:v1.49.1

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install the project dependencies
RUN npm install
RUN npm i -D monocart-reporter
RUN npm install --save dotenv
RUN npx playwright install --with-deps
RUN npm install -D @playwright/test
# Install Chrome browser for use with Playwright
RUN npx playwright install chrome

# Copy the application code from the host to the container's working directory
COPY . .

# Here, we run the test script defined in package.json (npx run test:chrome)
CMD ["npm", "run", "test:chrome", "--reporter=list"]