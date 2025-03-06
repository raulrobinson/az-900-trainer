import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("az_900_answers_spanish", { schema: "azure_training", synchronize: false })
export class Spanish {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 2000 })
    answer!: string;

    @Column({ type: "varchar", length: 600, nullable: true })
    pa!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    ra!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    pb!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    rb!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    pc!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    rc!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    pd!: string | null;

    @Column({ type: "varchar", length: 600, nullable: true })
    rd!: string | null;

    @Column({ type: "boolean", nullable: true })
    a!: boolean | null;

    @Column({ type: "boolean", nullable: true })
    b!: boolean | null;

    @Column({ type: "boolean", nullable: true })
    c!: boolean | null;

    @Column({ type: "boolean", nullable: true })
    d!: boolean | null;
}