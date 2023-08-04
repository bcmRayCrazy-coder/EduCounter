import { OptionValues } from 'commander';
import { prompt } from 'enquirer';

export interface Config {
    base: number;
    findNumber: number;
    availableNumber: number;
    password: string;
}

export let config: Config = {
    base: 0,
    findNumber: 0,
    availableNumber: 0,
    password: '',
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
    if (!args.base)
        config.base = parseInt(await ask('从哪里开始枚举', '1012000000'));
    else config.base = parseInt(args.base);

    if (!args.findNum)
        config.findNumber = parseInt(await ask('找几次停止', '100'));
    else config.findNumber = parseInt(args.findNum);

    if (!args.availableNumber)
        config.availableNumber = parseInt(
            await ask('找到多少个可用号后停止', '10'),
        );
    else config.availableNumber = parseInt(args.availableNumber);

    if (!args.password) config.password = await ask('寻找账号的密码', '123456');
    else config.password = args.password;
}
