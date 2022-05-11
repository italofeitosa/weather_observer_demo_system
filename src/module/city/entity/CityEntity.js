import { Column, Entity, CreateDateColumn, PrimaryColumn, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity("City")
export class City  {

    constructor(city) {
        Object.assign(this, city);
    }

    @ObjectIdColumn()
    id = undefined;

    @Column({ type: "varchar" })
    name = "";
  
    @PrimaryColumn({ type: "varchar" })
    latitude = "";  
    
    @Column({ type: "varchar" })
    longitude = "";
  
    @Column({ type: "varchar" })
    country = "";
  
    @Column({ type: "varchar" })
    state = "";
  
    @Column({ type: "varchar" })
    email = "";

    @Column({ type: "varchar" })
    current_temp = "";

    @Column({ type: "varchar" })
    variation_temp = "";
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt = Date;

    @UpdateDateColumn({ type: "timestamp" })
    createdAt = Date;

}