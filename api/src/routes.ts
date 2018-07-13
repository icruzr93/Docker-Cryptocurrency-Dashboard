import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users', controller.user.getUsers);
router.get('/users/:id', controller.user.getUser);
router.post('/users', controller.user.createUser);
router.put('/users/:id', controller.user.updateUser);
router.delete('/users/:id', controller.user.deleteUser);

// EXCHANGE ROUTES
router.get('/exchange', controller.exchange.getExchange);
router.get('/exchange/:id', controller.exchange.getSingleExchange);
router.post('/exchange', controller.exchange.createExchange);

router.get('/book/:book', controller.exchange.getBookExchanges);

export { router };