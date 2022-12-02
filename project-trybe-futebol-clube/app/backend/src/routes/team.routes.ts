import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsController = new TeamsController();
const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.getByPk);

export default teamsRouter;
