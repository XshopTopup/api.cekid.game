case 'cekpln':
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!q) return replyDeface(`Gunakan dengan cara ${prefix + command} *id*\n\n_Contoh_\n\n${command} 513429887`)
axios.get(`https://api.sqpayment.my.id/v3/game/pln/${q}?apikey=${apikey}'`)
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


case 'cekpln':
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!q) return replyDeface(`Gunakan dengan cara ${prefix + command} *id*\n\n_Contoh_\n\n${command} 513429887`)
axios.get(`https://api.sqpayment.my.id/v3/game/pln/?nomor=32021963072&key=b8c1bb290cd5383'}'`)
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
