import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import router from './routes';
import envs from './config/global';
import connectDB from './infra/mongo/mongo';

class App {
  public express: Express;
  public sequelize: Sequelize | undefined;

  constructor() {
    this.express = express();
    this.middlewares();
    this.setupRoutes();
    this.database();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private async database(): Promise<void> {
    try {
      await connectDB();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  private setupRoutes(): void {
    this.express.use('/', router);
  }

  public start(port: number): void {
    this.express.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();
const port = envs.PORT ? parseInt(envs.PORT, 10) : 3003;
app.start(port);
