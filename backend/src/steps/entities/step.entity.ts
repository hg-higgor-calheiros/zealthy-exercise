import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  path: string;

  @Column('simple-array')
  components: string[];
}
