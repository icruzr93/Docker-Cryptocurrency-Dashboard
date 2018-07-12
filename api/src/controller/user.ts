import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';

export default class UserController {

    public static async getUsers (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const users: User[] = await userRepository.find();
        ctx.status = 200;
        ctx.body = users;
    }

    public static async getUser (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const user: User = await userRepository.findOne(+ctx.params.id || 0);

        if (user) {
            ctx.status = 200;
            ctx.body = user;
        } else {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
        }

    }

    public static async createUser (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const userToBeSaved: User = new User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.email = ctx.request.body.email;

        const errors: ValidationError[] = await validate(userToBeSaved);

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else if ( await userRepository.findOne({ email: userToBeSaved.email}) ) {
            ctx.status = 400;
            ctx.body = 'The specified e-mail address already exists';
        } else {
            const user = await userRepository.save(userToBeSaved);
            ctx.status = 201;
            ctx.body = user;
        }
    }

    public static async updateUser (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const userToBeUpdated: User = new User();
        userToBeUpdated.id = +ctx.params.id || 0;
        userToBeUpdated.name = ctx.request.body.name;
        userToBeUpdated.email = ctx.request.body.email;


        const errors: ValidationError[] = await validate(userToBeUpdated);

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else if ( !await userRepository.findOne(userToBeUpdated.id) ) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to update doesn\'t exist in the db';
        } else if ( await userRepository.findOne({ id: Not(Equal(userToBeUpdated.id)) , email: userToBeUpdated.email}) ) {
            ctx.status = 400;
            ctx.body = 'The specified e-mail address already exists';
        } else {
            const user = await userRepository.save(userToBeUpdated);
            ctx.status = 201;
            ctx.body = user;
        }

    }

    public static async deleteUser (ctx: BaseContext) {

        const userRepository = getManager().getRepository(User);

        const userToRemove: User = await userRepository.findOne(+ctx.params.id || 0);
        if (!userToRemove) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
        } else if (+ctx.state.user.id !== userToRemove.id) {
            ctx.status = 403;
            ctx.body = 'A user can only be deleted by himself';
        } else {
            await userRepository.remove(userToRemove);
            ctx.status = 204;
        }

    }

  }
