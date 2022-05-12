import { Column, Entity, CreateDateColumn, PrimaryColumn, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity("Report")
export class Report  {

    constructor(report) {
        Object.assign(this, report);
    }

    @ObjectIdColumn()
    id = undefined;

    @Column({ type: "varchar" })
    city_name = "";

    @Column({ type: "varchar" })
    id_city = "";
  
    @PrimaryColumn({ type: "varchar" })
    email = "";
    
    @Column({ type: "varchar" })
    variation_temp = "";

    @Column({ type: "varchar" })
    current_temp = "";

    @Column({ type: "varchar" })
    diff_temp = "";

    @Column({ type: "timestamp" })
    observe_date = Date;   
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt = Date;

}