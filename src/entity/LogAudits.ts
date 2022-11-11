import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class LogAudits {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    executionId: string

    @Column("text")
    subject: string

    @Column()
    domain: string

    @Column()
    url: string
    
    @Column("text")
    negative_audits: string
    
    @Column()
    startDate:Date

    @Column()
    created_at: Date

    @Column("longtext")
    full_data: string

}