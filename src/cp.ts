import { appendFile, readFileSync } from "fs";
import { changePassword } from "./account/api";
import { logger } from "./Logger";

function randomPassword(){
    var _charStr = '1234567890qertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    var result = '';
    for (var i = 16; i > 0; --i) result += _charStr[Math.floor(Math.random() * _charStr.length)];
    return result;
}

var file = readFileSync('/Users/mac/Desktop/bc/html/box3/edu/EduCounter/out.txt','utf-8');
var accountInfo:string[] = file.split('\n');
accountInfo.forEach(async(v)=>{
    if(v.length == 0) return;
    var _:string[] = v.split(' ');
    var id = _[0];
    var password = _[1];
    var newPassword = randomPassword();
    var success = await changePassword(id,password,newPassword);
    if(!success)return logger.error('无法更改账号',id,'的密码');
    logger.success('账号',id,'密码更改为',newPassword);
    appendFile('/Users/mac/Desktop/bc/html/box3/edu/EduCounter/accounts.txt',`${id} ${newPassword}`+'\n',()=>{})
    // console.log(id,password)
})