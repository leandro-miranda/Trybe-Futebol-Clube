import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardControlller = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardControlller.leaderboard);
leaderboardRouter.get('/home', leaderboardControlller.leaderboardHome);
leaderboardRouter.get('/away', leaderboardControlller.leaderboardAway);

export default leaderboardRouter;
