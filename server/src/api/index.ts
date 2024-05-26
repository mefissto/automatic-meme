import express from 'express';
import { v1Routes } from './v1';

export const appRoutes = express.Router();

appRoutes.use('/v1', v1Routes);
