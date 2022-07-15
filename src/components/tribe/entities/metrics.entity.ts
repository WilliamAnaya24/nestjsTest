import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Repository } from './repository.entity';

@Entity()
export class Metrics {
  @PrimaryColumn()
  @OneToOne(() => Repository)
  @JoinColumn()
  repository: number;

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
