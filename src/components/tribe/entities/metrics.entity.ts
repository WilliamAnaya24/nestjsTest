import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repository } from './repository.entity';

@Entity()
export class Metrics {
  @PrimaryGeneratedColumn()
  id_metric: number;

  @OneToOne(() => Repository, (repository) => repository.id_repository)
  @JoinColumn()
  repository: Repository;

  @Column('float', { nullable: false })
  coverage: number;

  @Column('int', { nullable: false })
  bugs: number;

  @Column('int', { nullable: false })
  vulnerabilities: number;

  @Column('int', { nullable: false })
  hotspot: number;

  @Column('int', { nullable: false })
  code_smells: number;
}
