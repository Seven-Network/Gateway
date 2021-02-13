import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  passwordHash?: string;

  hash: string;

  success: boolean = true;

  @Column()
  verified: string = "0";

  @Column()
  is_creator: string = "0";

  @Column()
  is_developer: boolean = false;

  @Column()
  level: number = 0;

  @Column()
  kills: string = "0";

  @Column()
  death: string = "0";

  @Column()
  assists: string = "0";

  @Column()
  kdr: string = "0.00";

  @Column()
  headshots: string = "0";

  @Column()
  last_match_kills: string = "0";

  @Column()
  last_match_headshots: string = "0";

  @Column()
  last_match_position: string = "0";

  @Column()
  last_match_time: string = "0";

  @Column()
  total_game_time: string = "0";

  @Column()
  total_games_played: string = "0";

  @Column()
  total_games_won: string = "0";

  @Column()
  coins: string = "0";

  @Column()
  rank: string = "0";

  @Column()
  current_rank: string = "0";

  @Column()
  emoji: string = "Charm-None-Emoji.png";

  @Column()
  completed_quests: string = "0"
}
