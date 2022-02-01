import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  company: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  constructor(
    name?: string,
    phone?: string,
    email?: string,
    password?: string,
  ) {
    if (!this.id) this.id = uuidv4();
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.company = null;
    if (!this.created_at) this.created_at = new Date();
    if (!this.updated_at) this.updated_at = new Date();
    this.deleted_at = null;
  }
}
