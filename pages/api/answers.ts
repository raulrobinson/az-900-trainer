import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from "../../lib/db";
import { Az900Answers } from "../../entities/Az900Answers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const repository = AppDataSource.getRepository(Az900Answers);
        const rows = await repository.find({
            order: { id: "asc" }, // Ordena por ID de manera ascendente
        });
        if (rows.length > 0) {
            console.log('Total answers:', rows.length);
            return res.status(200).json(rows);
        } else {
            console.error('answers not found');
            return res.status(401).json({ message: 'answers not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener answers' });
    }
}
