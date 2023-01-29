import express from 'express'
import { addChallenge, getChallenges } from '../controllers/challengeController'

export const challengeRouter = express.Router()

challengeRouter.post("/add", addChallenge)

challengeRouter.get("/get", getChallenges);