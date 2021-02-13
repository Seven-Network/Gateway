import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: "0" })
  verified: string;

  @Column({ default: "0" })
  is_creator: string;

  @Column({ default: false })
  is_developer: boolean;
}
