import { OptionValues } from 'commander';
import { prompt } from 'enquirer';
import { logger } from './Logger';

export interface Config {
    base: number;
    findNumber: number;
    availableNumber: number;
    password: string;
    outFile: string;
    asyncNumber: number;
}

export let config: Config = {
    base: 0,
    findNumber: 0,
    availableNumber: 0,
    password: '',
    outFile: '',
    asyncNumber: 0,
};

async function ask(message: string, initial?: string): Promise<string> {
    var res: { ask: string } = await prompt({
        type: 'input',
        message,
        name: 'ask',
        initial,
    });
    return res.ask;
}

export default async function configure(args: OptionValues) {
    logger.setMute(false);
    if (!args.base) {
        // config.base = parseInt(await ask('从哪里开始枚举', '1012000000'));
        logger.error('请设置base');
        process.exit(1);
    } else config.base = parseInt(args.base);

    if (!args.findNumber) {
        // config.findNumber = parseInt(await ask('找几次停止', '100'));
        logger.error('请设置findNumber');
        process.exit(1);
    } else config.findNumber = parseInt(args.findNumber);

    if (!args.availableNumber) {
        // config.availableNumber = parseInt(
        //     await ask('找到多少个可用号后停止', '10'),
        // );
        logger.error('请设置availableNumber');
        process.exit(1);
    } else config.availableNumber = parseInt(args.availableNumber);

    if (!args.password) {
        // config.password = await ask('寻找账号的密码', '123456');
        logger.error('请设置password');
        process.exit(1);
    } else config.password = args.password;

    if (!args.outFile) {
        // config.password = await ask('输出文件');
        logger.error('请设置outFile');
        process.exit(1);
    } else config.outFile = args.outFile;

    if (!args.asyncNumber) {
        logger.error('请设置asyncNunber');
        process.exit(1);
    } else config.asyncNumber = args.asyncNumber;
}
