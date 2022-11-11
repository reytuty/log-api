import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Log {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    created_at: Date

    @Column()
    subject: string

    @Column()
    data: string

}
