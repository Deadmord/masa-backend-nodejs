import express from 'express';
import controller from '../controllers/demo.controller';
const router = express.Router();

router.get('/hello-world', controller.getHelloworld);
router.get('/timeout', controller.getWithTimeout);
router.get('/delay/:seconds', controller.getWithDelay);
router.get('/delay-validated/:seconds', controller.getWithDelayValidated);

export default { router }