import cron from "node-cron";
import app from "@/app";

const startServer = () => {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
  });
};

startServer();
