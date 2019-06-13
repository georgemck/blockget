//Some examples:


try{
const DCore = require('dcorejs-lib')
KEY = '5KAnsEPAW6K7v6CRYj5Q2kVVo5ZPhorc34R6xLaL5zKP8AtNRru'

DCore.node = "ws://testnet.dcore.io:8090"
DCore.subscribe('connected', startAfterConnected)

async function startAfterConnected() {
  let bot = new DCore('test-acc',KEY)

  let iam = await DCore.accounts['test-acc'];
  let info = await DCore.db.get_full_accounts([iam.id],false);
  
  console.log(info)
}
} catch(e){
    console.log(e)
}