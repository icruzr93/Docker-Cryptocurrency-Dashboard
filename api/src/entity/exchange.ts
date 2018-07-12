import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Exchange {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 80})
    @Length(4, 80)
    book: string;

    @Column({length: 80})
    @Length(1, 80)
    volume: string;

    @Column({length: 80})
    @Length(1, 80)
    high: string;

    @Column({length: 80})
    @Length(4, 80)
    last: string;

    @Column({length: 80})
    @Length(4, 80)
    low: string;

    @Column({length: 80})
    @Length(4, 80)
    ask: string;

    @Column({length: 80})
    @Length(4, 80)
    bid: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;
}