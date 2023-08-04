import chalk, { Chalk } from 'chalk';

export class Logger {
    // 是否是静默模式
    mute: boolean = false;
    setMute(mute: boolean) {
        this.mute = mute;
    }

    log(labelColor: Chalk, label: string, args: any[]) {
        if (this.mute) return;
        console.log(
            `${labelColor(`[${label}]`)} ${chalk.white(args.join(' '))}`,
        );
    }

    info(...args: any[]) {
        this.log(chalk.blue, 'i', args);
    }
    warning(...args: any[]) {
        this.log(chalk.hex('#e5a910'), '!', args);
    }
    error(...args: any[]) {
        this.log(chalk.red, 'x', args);
    }
    success(...args: any[]) {
        this.log(chalk.green, '√', args);
    }
    tip(...args: any[]) {
        if (this.mute) return;
        var msg = args.join(' ');
        console.log(chalk`{hex('#666666') [.] ${msg}}`);
    }

    add(...args: any[]) {
        this.log(chalk.green, '+', args);
    }
    remove(...args: any[]) {
        this.log(chalk.red, '-', args);
    }
}

export let logger = new Logger();
