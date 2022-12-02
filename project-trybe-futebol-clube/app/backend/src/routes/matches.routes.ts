import { Router } from 'express';
import { jwtValidate } from '../middlewares/ValidateToken';
import MatchesController from '../controllers/matchesController';
import validateMatches from '../middlewares/ValidadeMatches';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', jwtValidate, validateMatches, matchesController.matcheSaveInProgress);
matchesRouter.patch('/:id/finish', matchesController.changeMatcheInprogrees);
matchesRouter.patch('/:id/', matchesController.changeMatche);

export default matchesRouter;
