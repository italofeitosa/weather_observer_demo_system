import { Column, Entity,  ObjectIdColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity("Weather")
export class Weather {
  constructor(weather) {
    Object.assign(this, weather);
  }

  @ObjectIdColumn()
  //@PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  city = "";

  @Column("varchar")
  latitude = "";

  @Column("varchar")
  longitude = "";

  @CreateDateColumn("timestamp")
  //@CreateDateColumn({ type: "timestamp" })
  createdAt = "";

}

