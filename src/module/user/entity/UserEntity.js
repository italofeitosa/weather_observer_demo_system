import { Column, Entity, CreateDateColumn, PrimaryColumn, BeforeInsert, BeforeUpdate, ObjectIdColumn, Unique } from "typeorm";
import crypto from "crypto";
import Security from "../../security";

@Entity("User")
@Unique(["email"])
export class User {
  constructor(user) {
    Object.assign(this, user);
  }

  @ObjectIdColumn()
  id = undefined;

  @PrimaryColumn({ type: "varchar", unique: true })
  email = "";

  @Column({ type: "varchar" })
  name = "";

  @Column({ type: "varchar", nullable: true })
  password = "";

  @Column({ type: "varchar" })
  passwordHashSalt = "";

  @CreateDateColumn({ type: "timestamp" })
  createdAt = Date;

  static hashPassword = (newPassword) => {
    const hashSalt = crypto.randomBytes(16).toString("hex");
    const password = Security.encrypt(newPassword, hashSalt).catch((error) =>
      Promise.reject(error)
    );

    return { password, hashSalt };
  };

  @BeforeInsert()
  hashPassword() {
    console.log("hashPassword execute...");
    const { password, hashSalt } = User.hashPassword(this.password);
    this.password = password;
    this.passwordHashSalt = hashSalt;
  }

  @BeforeUpdate()
  hashNewPassword() {
    if (!this.newPassword) return;

    const { password, hashSalt } = User.hashPassword(this.newPassword);
    this.password = password;
    this.passwordHashSalt = hashSalt;
  }

  async verifyIsSamePassword(password) {
    const hash = Security.encrypt(password, this.passwordHashSalt).catch(
      (error) => Promise.reject(error)
    );

    if (hash === this.password) return Promise.resolve();

    return Promise.reject();
  }
}
