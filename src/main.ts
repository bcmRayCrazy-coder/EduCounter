import chalk from 'chalk';
import { program } from 'commander';
import { logger } from './Logger';
import configure, { config } from './config';
import findAccount from './account/account';

console.log(chalk.bold.hex('#9200db')('~开号机~'));

program
    .name('开号机')
    .description('一点也不专业的寻找edu可用账号机器')
    .version('1.0.0')
    .addHelpText('beforeAll', '作者QQ: 975875040')

    .option('-m, --mute', '不提问和显示找到的账号(适用于在服务器运行)')
    .option('-b, --base <baseNum>', '从哪里开始枚举')
    .option('-n, --find-number <num>', '找几次停止')
    .option('-an, --available-number <anum>', '找到多少个可用号后停止')
    .option('-p, --password <pwd>', '寻找账号的密码')
    .option('-a, --async-number <num>', '一次寻找几个账号')
    .option('-o, --out-file <path>', '输出文件')

    .parse();

const args = program.opts();

if (args.mute) {
    logger.tip('机器将在静默模式下运行');
    logger.setMute(true);
}

async function main() {
    await configure(args);
    logger.tip('配置', JSON.stringify(config));
    await findAccount();

    logger.setMute(false);
    logger.success('完成!');
    process.exit();
}

main();
