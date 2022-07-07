import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class GeneralInformation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at', select: false })
  deletedAt?: Date;
}
