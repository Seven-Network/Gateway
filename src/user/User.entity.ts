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

  @Column()
  verified: string = "0";

  @Column()
  is_creator: string = "0";

  @Column()
  is_developer: boolean = false;

  @Column()
  level: number = 0;

  @Column()
  kill: string = "0";

  @Column()
  death: string = "0";

  @Column()
  assists: string = "0";

  @Column()
  kdr: string = "0.00";

  @Column()
  headshots: string = "0";

  @Column()
  last_match_kills: string = "N/A";

  @Column()
  last_match_headshots: string = "N/A";

  @Column()
  last_match_position: string = "N/A";

  @Column()
  last_match_time: string = "N/A";

  @Column()
  total_game_time: string = "N/A";

  @Column()
  total_games_played: string = "N/A";

  @Column()
  total_games_won: string = "N/A";

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
