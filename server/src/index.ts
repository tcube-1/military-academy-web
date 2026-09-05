import { app } from "./app";


const startServer = async () => {
  try {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = () => {
      console.log("Starting graceful shutdown...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
      
      // Force close after 10 seconds
      setTimeout(() => {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
