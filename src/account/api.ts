import axios from 'axios';
import {wrapper} from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import { logger } from '../Logger';

const service = axios.create({
    withCredentials: true,
    baseURL: 'https://api.codemao.cn',
    timeout: 5000,
});
wrapper(service);
const cookieJar = new tough.CookieJar();

export async function login(
    identity: string,
    password: string,
): Promise<string | undefined> {
    try {
        // console.log(identity,password)
        var res = await service.post(
            '/tiger/v3/web/accounts/login',
            {
                pid: '65edCTyg',
                identity,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                },
                jar:cookieJar
            },
        );
    } catch (err) {
        return;
    }
    var data = res.data;
    if (!data.auth) return;
    return data.auth.token;
}

export async function changePassword(
    identity: string,
    oldPassword: string,
    password: string,
) {
    var token = await login(identity, oldPassword);
    if (!token) {
        logger.error('无法更改', identity, '的密码: 用户不存在或密码错误!');
        return false;
    }
    try {
        var res = await service.patch(
            '/tiger/v3/web/accounts/password',
            {
                old_password: oldPassword,
                password,
                confirm_password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                },
                jar:cookieJar
            },
        );
        return true;
    } catch {
        return false;
    }
}
