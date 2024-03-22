case 'higgsid':
    case 'dominoid':
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!q) return replyDeface(`Gunakan dengan cara ${prefix + command} *id*\n\n_Contoh_\n\n${command} 513429887`)
axios.get(`https://v1.apigames.id/merchant/M220515ALZM2045XZ/cek-username/higgs?user_id=${q}&signature=6ffbc2d3102edf02c5482bac8c5ab9da`)
.then(({data}) => {
let domino = `*🔎 HIGGS DOMINO 🔍*

ID : ${q}
Nick : ${data.data.username}`
replyDeface(domino)
})
.catch((err) => {
console.log(color('[ ERROR ]', 'red'), err)
replyDeface(mess.error.api)
saipul.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
})
break
