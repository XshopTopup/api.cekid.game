case 'cekpln':
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!q) return replyDeface(`Gunakan dengan cara ${prefix + command} *id*\n\n_Contoh_\n\n${command} 513429887`)
axios.get(`curl --location 'https://api.sqpayment.my.id/v3/game/pln/?nomor=32021963072&key=xxxxx'`)
.then(({data}) => {
let domino = `*🔎 PLN 🔍*

ID : ${q}
Nick : ${data.data.username}`
replyDeface(pln)
})
.catch((err) => {
console.log(color('[ ERROR ]', 'red'), err)
replyDeface(mess.error.api)
xshoptopup.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
})
break
