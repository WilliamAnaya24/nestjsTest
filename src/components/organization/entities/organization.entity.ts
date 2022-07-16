import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('string', { nullable: false })
  name: string;

  @Column('int', { nullable: false })
  status: number;
}
