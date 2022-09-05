import express from 'express';
import controller from '../controllers/demo.controller';
const router = express.Router();

router.get('/hello-world', controller.getHelloworld);

export default { router }