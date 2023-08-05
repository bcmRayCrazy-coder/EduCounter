import { logger } from '../Logger';
import { config } from '../config';
import { login } from './api';
import fs from 'fs'

async function testAccount(id: string) {
    var token = await login(id, config.password);
    if (!token) return logger.remove(id);
    logger.add(id);
    fs.appendFile(config.outFile,id,()=>{})
}

export default async function findAccount() {
    for (
        let currentId = config.base;
        currentId < config.base + config.findNumber;
        currentId++
    ) {
        await testAccount('edu' + currentId);
    }
}
