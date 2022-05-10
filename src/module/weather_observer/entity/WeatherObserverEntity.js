import { Column, Entity,  ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity("WeatherObserver")
export class WeatherObserver {
  constructor(weather) {
    Object.assign(this, weather);
  }

  @ObjectIdColumn()
  //@PrimaryGeneratedColumn()
  id = undefined;

  @Column({ type: "varchar", nullable: true })
  current_temp = "";

  @Column({ type: "varchar" })
  previous_temp = "";

  @Column({ type: "varchar" })
  temp_max = "";

  @Column({ type: "varchar" })
  temp_min = "";

  @Column({ type: "varchar", nullable: true })
  temp_max_variaton = "";

  @Column({ type: "varchar", nullable: true })
  temp_min_variaton = "";

  @Column({ type: "varchar", nullable: true })
  id_city = "";

  @CreateDateColumn("timestamp")
  createdAt = "";
  
  @UpdateDateColumn("timestamp")
  updatedAt = "";

}

