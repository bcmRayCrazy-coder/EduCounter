import axios from 'axios';

export async function login(
    identity: string,
    password: string,
): Promise<string | undefined> {
    try {
        // console.log(identity,password)
        var res = await axios.post(
            'https://api.codemao.cn/tiger/v3/web/accounts/login',
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
            },
        );
    } catch (err) {
        return;
    }
    var data = res.data;
    if (!data.auth) return;
    return data.auth.token;
}
