import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Exchange } from '../entity/exchange';

export default class ExchangeController {

    public static async getExchange (ctx: BaseContext) {
        const exchanteRepository: Repository<Exchange> = getManager().getRepository(Exchange);
        const exchange: Exchange[] = await exchanteRepository.find();

        ctx.status = 200;
        ctx.body = exchange;
    }

    public static async getSingleExchange (ctx: BaseContext) {
        const exchanteRepository: Repository<Exchange> = getManager().getRepository(Exchange);
        const exchange: Exchange = await exchanteRepository.findOne(+ctx.params.id || 0);

        if (exchange) {
            ctx.status = 200;
            ctx.body = exchange;
        } else {
            ctx.status = 400;
            ctx.body = 'Incorrect information';
        }

    }

    public static async createExchange (ctx: BaseContext) {

        const exchangeRepository: Repository<Exchange> = getManager().getRepository(Exchange);

        const exchangeToBeSaved: Exchange = new Exchange();
        exchangeToBeSaved.last = ctx.request.body.last;
        exchangeToBeSaved.low = ctx.request.body.low;
        exchangeToBeSaved.volume = ctx.request.body.volume;
        exchangeToBeSaved.high = ctx.request.body.high;
        exchangeToBeSaved.book = ctx.request.body.book;
        exchangeToBeSaved.bid = ctx.request.body.bid;
        exchangeToBeSaved.ask = ctx.request.body.ask;

        const errors: ValidationError[] = await validate(exchangeToBeSaved);

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else {
            const exchange = await exchangeRepository.save(exchangeToBeSaved);
            ctx.status = 201;
            ctx.body = exchange;
        }
    }
  }
