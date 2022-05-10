import { Column, Entity, CreateDateColumn, PrimaryColumn, BeforeInsert, BeforeUpdate, ObjectIdColumn, Unique, Index, ObjectID } from "typeorm";
import crypto from "crypto";
import Security from "../../security";

@Entity("User")
@Unique(["email"])
export class User {
  constructor(user) {
    Object.assign(this, user);
  }

  @ObjectIdColumn()
  id = ObjectID;

  @PrimaryColumn({ type: "varchar", unique: true })
  email = "";

  @Column({ type: "varchar", nullable: true })
  name = "";

  @Column({ type: "varchar" })
  lastName = "";

  @Column({ type: "varchar", nullable: true })
  password = "";

  @Column({ type: "varchar" })
  passwordHashSalt = "";

  @CreateDateColumn({ type: "timestamp" })
  createdAt = Date;

  static hashPassword = async (newPassword) => {
    const hashSalt = crypto.randomBytes(16).toString("hex");
    const password = await Security.encrypt(newPassword, hashSalt).then((pwd) =>{
      return pwd;      
    })
    .catch((error) =>
      Promise.reject(error)
    );

    return { password, hashSalt };
  };

  @BeforeInsert()
  async hashPassword() {
    console.log("hashPassword execute...");
    const { password, hashSalt } = await User.hashPassword(this.password);    
    this.password = password;
    this.passwordHashSalt = hashSalt;
  }

  @BeforeUpdate()
  async hashNewPassword() {
    if (!this.newPassword) return;

    const { password, hashSalt } = User.hashPassword(this.newPassword);
    this.password = password;
    this.passwordHashSalt = hashSalt;
  }

  async verifyIsSamePassword(password) {
    const hash = await Security.encrypt(password, this.passwordHashSalt).then((hashPassword) => {
      return hashPassword;
    })
    .catch(
      (error) => Promise.reject(error)
    );

    if (hash === this.password) return Promise.resolve();

    return Promise.reject();
  }
}
