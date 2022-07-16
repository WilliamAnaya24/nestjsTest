import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column('string', { nullable: false, length: 50 })
  name: string;

  @Column('int', { nullable: false })
  status: number;

  @ManyToOne(() => Organization)
  organization: number;
}
