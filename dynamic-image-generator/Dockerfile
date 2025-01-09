# Use the official Bun image as the base image
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Install dependencies (this assumes you're using Bun, which handles the dependencies automatically)
RUN bun install

# Expose the port that your application runs on (if necessary, e.g., 3000 for a web server)
EXPOSE 3000

# Set the command to run your app (same as Nixpacks' --start-cmd)
CMD ["bun", "run", "./src/index.ts"]
