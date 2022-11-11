import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Log {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    created_at: Date

    @Column("text")
    subject: string

    @Column("longtext")
    data: string

}
