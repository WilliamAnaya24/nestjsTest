import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tribe } from './tribe.entity';

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  id_repository: number;

  @ManyToOne(() => Tribe)
  tribeId: number;

  @Column('string', { nullable: false, length: 50 })
  name: string;

  @Column('string', { nullable: false, length: 1 })
  state: string;

  @Column('date', { nullable: false })
  create_time: Date;

  @Column('string', { nullable: false, length: 1 })
  status: string;
}
