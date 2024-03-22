"use strict";
const { WASocket, proto, getContentType, downloadContentFromMessage, decodeJid, generateWAMessageFromContent, generateWAMessage } = require('@adiwajshing/baileys')
const axios = require('axios').default
const { PassThrough } = require('stream')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const FormData = require('form-data')
const chalk = require('chalk')
const fs = require('fs')
const Math_js = require('mathjs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ms = require('parse-ms')
const toMS = require("ms");
const xzons = require("xzons-api");
const Digiflazz = require('digiflazz')
const digiflazz = new Digiflazz('dunageegG0Oo', '71e6b435-9e1c-5d52-986b-8dc7d015d407');
const { exec, spawn } = require("child_process");
let { sizeFormatter } = require("human-readable");
let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

//lib/utils
const _sewa = require("../utils/sewa");
const _jadiown = require("../utils/jadiowner");
const afkg = require("../utils/afk");
const { antiSpam } = require('../utils/antispam')
const { allMenu, ownmenu } = require('../utils/help')
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('../utils/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('../utils/setleft');
const { addResponList, delResponList, resetListAll, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../utils/respon-list');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('../utils/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('../utils/setdone');
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require("../utils/setopen");
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require("../utils/setclose");
const { isSetBot, addSetBot, removeSetBot, changeSetBot, getTextSetBot } = require('../utils/setbot');
const { getBuffer, serialize, getRandom, fetchJson, runtime } = require("../utils/myfunc");
const { sleep, generateProfilePicture } = require("../utils/myfunc2");
const { smsg, parseMention } = require('../utils/mysim')
let mess = JSON.parse(fs.readFileSync('./utils/mess.json'));
//database
let jadiowner = JSON.parse(fs.readFileSync('./database/jadiowner.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let set_bot = JSON.parse(fs.readFileSync('./database/set_bot.json'));
let _afks = JSON.parse(fs.readFileSync('./database/afg.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let set_open = JSON.parse(fs.readFileSync('./database/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./database/set_close.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let pricelist = JSON.parse(fs.readFileSync('./database/pricelist.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let antilinkall = JSON.parse(fs.readFileSync('./database/antilinkall.json'))
let merchant = `M220727KFJO5114EX`;
let secret = `698b4aa092bb2653ee1050a1bfa95668ea7e7e5569ab1c2fcd0318f6aeedf25c`;
let sign = `signature`;
//END
/**
 *
 * @param { string } text
 * @param { string } color
 */
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

/**
 * @param {WASocket} sock
 * @param {proto.IWebMessageInfo} msg
 */
 // Bandwidth
async function checkBandwidth() {
    let ind = 0;
    let out = 0;
    for (let i of await require("node-os-utils").netstat.stats()) {
        ind += parseInt(i.inputBytes);
        out += parseInt(i.outputBytes);
    }
    return {
        download: format(ind),
        upload: format(out),
    };
}

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async (KingOfBear, msg, m, rm, welcome, left, set_welcome_db, set_left_db) => {
    const { ownerNumber, ownnumber, ownerName, pathimg, logoafk, botName, youtubeName, youtube, apikey, owncek, footer } = require('../config.json')
    const extendedText = getContentType
    const saipul = KingOfBear
    const gaya = '```'
    const gy = '```'
    m = serialize(KingOfBear, msg)
    rm = smsg(KingOfBear, msg)
    let thumb = fs.readFileSync(pathimg)
    let thum = fs.readFileSync(pathimg)
    let thumafk = fs.readFileSync(logoafk)
    let dev = "6285380779466@s.whatsapp.net"
    const time = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    const tanggal = moment().tz("Asia/Jakarta").format("dddd, ll")
    const jam = moment().format("HH:mm:ss z")
    let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
    var fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
    const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)
    if (msg.key && msg.key.remoteJid === 'status@broadcast') return
    if (!msg.message) return

    const type = getContentType(msg.message)
    const quotedType = getContentType(msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null
    if (type == 'ephemeralMessage') {
        msg.message = msg.message.ephemeralMessage.message
        msg.message = msg.message.ephemeralMessage.message.viewOnceMessage
    }
    if (type == 'viewOnceMessage') {
        msg.message = msg.message.viewOnceMessage.message
    }

    const botId = KingOfBear.user.id.includes(':') ? KingOfBear.user.id.split(':')[0] + '@s.whatsapp.net' : KingOfBear.user.id

    const botNumber = await KingOfBear.decodeJid(KingOfBear.user.id)
    const from = msg.key.remoteJid
    const body = type == 'conversation' ? msg.message?.conversation : msg.message[type]?.caption || msg.message[type]?.text || ''
    const chata = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage" && msg.message.templateButtonReplyMessage.selectedId) ? msg.message.templateButtonReplyMessage.selectedId : (type == "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == "messageContextInfo") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const responseMessage = type == 'listResponseMessage' ? msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || '' : type == 'buttonsResponseMessage' ? msg.message?.buttonsResponseMessage?.selectedButtonId || '' : ''
    const isGroup = from.endsWith('@g.us')
    const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''

    var sender = isGroup ? msg.key.participant : msg.key.remoteJid
    sender = sender.includes(':') ? sender.split(':')[0] + '@s.whatsapp.net' : sender
    const senderName = msg.pushName
    const senderNumber = sender.split('@')[0]
    const pushname = msg.pushName

    const groupMetadata = isGroup ? await KingOfBear.groupMetadata(from) : null
    const groupName = groupMetadata?.subject || ''
    const groupMembers = groupMetadata?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)

    const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#/$%^&.+-,\\\©^]/.test(chata)
    const prefix = isCmd ? body[0] : ''
    const isGroupAdmins = groupAdmins.includes(sender)
    const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isOwner = [`${ownerNumber}`,"6285380779466@s.whatsapp.net","6281293152995@s.whatsapp.net","6281217015312@s.whatsapp.net"].includes(sender) ? true : false
    const isDev = dev.includes(sender) 
    const Xcommand = chata.toLowerCase().split(' ')[0] || ''
    const XisCmd = Xcommand.startsWith(prefix)
    
    let command = isCmd ? chata.slice(1).trim().split(' ').shift().toLowerCase() : ''
    let responseId = msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.message?.buttonsResponseMessage?.selectedButtonId || null
    let args = body.trim().split(' ').slice(1)
    let full_args = body.replace(command, '').slice(1).trim()
    let q = args.join(" ")
    
    const isAfkOn = afkg.checkAfkUser(sender, _afks)
    const isJadiowner = _jadiown.checkSewaGroup2(from, jadiowner)
    const isAntiLink = antilink.includes(from) ? true : false
    const isAntiLinkAll = antilinkall.includes(from) ? true : false
    const isAntiWame = antiwame.includes(from) ? true : false
    const isPricelist = pricelist.includes(from) ? true : false
    const isSewa = _sewa.checkSewaGroup(from, sewa)
    const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
    const isLeft = isGroup ? left.includes(from) ? true : false : false
    const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
    const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
    const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
    mention != undefined ? mention.push(mentionByReply) : []
    const mentionUser = mention != undefined ? mention.filter(n => n) : []
    let mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
    const numberQuery = q.replace(new RegExp('[()+-/ +/]', 'gi'), '') + '@s.whatsapp.net'
    const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false

    async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        
        async function sendStickerFromUrl(from, url, packname1 = stc.packname, author1 = stc.author, options = {}) {
        	var names = Date.now() / 10000;
        	var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	            });
        	};
            exif.create(packname1, author1, `sendstc_${names}`)
        	download(url, './temp/' + names + '.png', async function () {
                let filess = './temp/' + names + '.png'
        	    let asw = './temp/' + names + '.webp'
        	    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
        	        exec(`webpmux -set exif ./temp/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        saipul.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
        	        })
                })
        	})
        }
        
        let randomString = 'NS'
		let charSet = "ABCDEF0123456789"
		for (let i = 0; i < 15; i++) {
		let randomPoz = Math.floor(Math.random() * charSet.length)
		randomString += charSet.substring(randomPoz, randomPoz + 1)
	    }
        
        const sendFileFromUrl = async (from, url, caption, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headerd["content-type"]
            let type = mime.split("/")[0]+"Message"
            if (mime.split("/")[0] === "image") {
               var img = await getBuffer(url)
               return saipul.sendMessage(from, { image: img, caption: caption }, options)
            } else if (mime.split("/")[0] === "video") {
               var vid = await getBuffer(url)
               return saipul.sendMessage(from, { video: vid, caption: caption }, options)
            } else if (mime.split("/")[0] === "audio") {
               var aud = await getBuffer(url)
               return saipul.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
            } else {
               var doc = await getBuffer(url)
               return saipul.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
            }
        }
        
        //jeda time
        setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                saipul.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                saipul.sendMessage(i.id, { text: `Waktu Jeda Telah Selesai` }))
                .catch((err) =>
                saipul.sendMessage(i.id, { text: 'Error' }))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)
        
        saipul.createMessage = async (jidnya, kontennya, optionnya) => {
            return await generateWAMessage(jidnya, kontennya, {...optionnya,userJid: saipul.authState.creds.me.id,upload: saipul.waUploadToServer})
            }

    const isImage = type == 'imageMessage'
    const isVideo = type == 'videoMessage'
    const isAudio = type == 'audioMessage'
    const isSticker = type == 'stickerMessage'
    const isContact = type == 'contactMessage'
    const isLocation = type == 'locationMessage'

    const isQuoted = type == 'extendedTextMessage'
    const isQuotedImage = isQuoted && quotedType == 'imageMessage'
    const isQuotedVideo = isQuoted && quotedType == 'videoMessage'
    const isQuotedAudio = isQuoted && quotedType == 'audioMessage'
    const isQuotedSticker = isQuoted && quotedType == 'stickerMessage'
    const isQuotedContact = isQuoted && quotedType == 'contactMessage'
    const isQuotedLocation = isQuoted && quotedType == 'locationMessage'

    var mediaType = type
    var stream
    if (isQuotedImage || isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        mediaType = quotedType
        msg.message[mediaType] = msg.message.extendedTextMessage.contextInfo.quotedMessage[mediaType]
        stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', '')).catch(console.error)
    }
    
    //SEWA WAKTU
_sewa.expiredCheck(saipul, sewa)
   
    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

function hitungmundur(bulan, tanggal) {
            let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        
        var { download, upload } = await checkBandwidth();
        let mundur = hitungmundur(7, 9)
        var menunya = allMenu(ucapanWaktu, pushname, mundur, upload, download, ownerName, youtubeName, botName, jam, tanggal, isOwner, sender, prefix)
        
    const reply = async (text) => {
        return KingOfBear.sendMessage(from, { text: text.trim() }, { quoted: msg })
    }
    
    function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        
        const isUrl = (url) => {
        	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        
        const sendContact = (jid, numbers, name, quoted, mn) => {
        	let number = numbers.replace(/[^0-9]/g, '')
        	const vcard = 'BEGIN:VCARD\n' 
        	+ 'VERSION:3.0\n' 
        	+ 'FN:' + name + '\n'
        	+ 'ORG:;\n'
        	+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
        	+ 'END:VCARD'
        	return saipul.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
        }
        
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        
        async function getGcName(groupID) {
            try {
                let data_name = await saipul.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '*Group Tidak Ada*'
            }
        }
    
    function mentions(teks, mems = [], id) {
        	if (id == null || id == undefined || id == false) {
        	    let res = saipul.sendMessage(from, { text: teks, mentions: mems })
        	    return res
        	} else {
                let res = saipul.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }
        

const sendOrder = async(jid, text, orid, img, itcount, title, sellers, tokens, ammount) => {
const order = generateWAMessageFromContent(jid, proto.Message.fromObject({
 "orderMessage": {
"orderId": orid, // Ganti Idnya
"thumbnail": img, // Ganti Imagenya
"itemCount": itcount, // Ganti Item Countnya
"status": "INQUIRY", // Jangan Diganti
"surface": "CATALOG", // Jangan Diganti
"orderTitle": title, // Ganti Titlenya
"message": text, // Ganti Messagenya
"sellerJid": sellers, // Ganti sellernya
"token": tokens, // Ganti tokenya
"totalAmount1000": ammount, // Ganti Total Amountnya
"totalCurrencyCode": "IDR", // Terserah
}
}), { userJid: jid })
saipul.relayMessage(jid, order.message, { messageId: order.key.id})
}
 
//MULAI AFK
	if (isGroup) {
		for (let x of mentionUser) {
		    if (afkg.checkAfkUser(x, _afks)) {
			const getId = afkg.getAfkId(x, _afks)
			const getReason = afkg.getAfkReason(getId, _afks)
			const getTime = afkg.getAfkTime(getId, _afks)
			//if (riz.message.extendedTextMessage != undefined){ 
	        try {
            var afpk = await saipul.profilePictureUrl(mentionUser[0], 'image')
            } catch {
            var afpk = 'https://i.ibb.co/Twkhgy9/images-4.jpg'
            }
            var thumeb = await getBuffer(afpk)
			const cptl = `*ꞌꞋ ࣪𓂃 ִֶָ Admin Afk ִֶָ 𓂃 ࣪ꞌꞋ*

O  Saat Ini @${mentionUser[0].split("@")[0]} Sedang Offline/Afk
O *Alasan*  : ${getReason}
O *Afk Sejak* : ${getTime}`
      saipul.sendMessage(from, { text: cptl, contextInfo:{ mentionedJid: [mentionUser], externalAdReply:{ title: `SEDANG OFFLINE`, body: "Mode Afk Aktif", thumbnail: thumafk, sourceUrl: `https://wa.me/${x}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}}, { quoted: m });
      //sendMess(x, `Assalamualaikum\n\n_Ada Yg Mencari Kamu Saat Kamu Offline/Afk_\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nDi Group : ${groupName}\nPesan : ${chata}`)
      }}
      //KEMBALI DARI AFK
	  if (afkg.checkAfkUser(sender, _afks)) {
      const getTime = afkg.getAfkTime(sender, _afks)
	  const getReason = afkg.getAfkReason(sender, _afks)
	  const ittung = ms(await Date.now() - getTime)
      try {
      var afpkk = await saipul.profilePictureUrl(mentionUser[0], 'image')
      } catch {
      var afpkk = 'https://i.ibb.co/Twkhgy9/images-4.jpg'
      }
      var thumbw = await getBuffer(afpkk)
	  const pep = `*${pushname}* Telah Kembali Dari Afknya!`
      saipul.sendMessage(from, { text: pep, contextInfo:{ mentionedJid: [sender], externalAdReply:{ title: `KEMBALI ONLINE`, body: "Mode Afk Nonaktif", thumbnail: thumafk, sourceUrl: `https://wa.me/${sender}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}}, { quoted: m });
	  _afks.splice(afkg.getAfkPosition(sender, _afks), 1)
	  fs.writeFileSync('./database/afkg.json', JSON.stringify(_afks))
	  }
	  }

    const replyDeface = (teks) => {
            return saipul.sendMessage(from, {
                text: teks, contextInfo: {
                    externalAdReply: {
                        title: `${botName}`,
                        body: `Multi Device`,
                        mediaType: 2,
                        thumbnail: thumb,
                        sourceUrl: `https://wa.me/${owncek}`
                    }
                }
            }, { quoted: msg })
        }
        
        if (chata.startsWith("®") && isDev) {
            console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            exec(chata.slice(2), (err, stdout) => {
                if (err) return replyDeface(`${err}`)
                if (stdout) replyDeface(`${stdout}`)
            })
            }
        
        if (chata.startsWith(">") && isDev) {
	        console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
        try {
            let evaled = await eval(chata.slice(2))
            if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
            replyDeface(`${evaled}`)
        } catch (err) {
            replyDeface(`${err}`)
        }
        }
        
        
        var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var date = new Date();
    var thisDay = date.getDay(),
    thisDay = myDays[thisDay];
        
        saipul.readMessages([msg.key])
        
        saipul.sendPresenceUpdate('available', from)
        
// Detect Group Invite
if (m.mtype === 'groupInviteMessage') {
var eyeye = `*Jika Ingin Bot Masuk Ke Group Mu Silahkan Sewabot Dengan Ketik :* #owner`
saipul.sendMessage(from, {text: eyeye, contextInfo:{externalAdReply:{
title: `${ucapanWaktu} ${pushname}`,
body: "WPSBOT",
thumbnail: thum,
mediaType:1,
renderLargerThumbnail: false,
showAdAttribution: true,
mediaUrl: 'https://chat.whatsapp.com/KDdzjWThf9s0F9jDTU7VU1',
sourceUrl: 'https://chat.whatsapp.com/KDdzjWThf9s0F9jDTU7VU1'
}}}, {quoted:m})
}

//AntiLink
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
replyDeface(`*「 LINKGROUP DETECTOR 」*\n\n karena kamu melanggar aturan group, yaitu menggirim link group kamu akan di kick dari group! bye bye:)`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('chat.whatsapp.com/')) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
replyDeface(`*「 LINKGROUP DETECTOR 」*\n\n karena kamu melanggar aturan group, yaitu menggirim link group kamu akan di kick dari group! bye bye:)`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}

//AntiSpam
if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
console.log(color('[SPAM]', 'red'), color(jam, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
return replyDeface('「 ❗ 」Sabar Bang 5 Detik/Command')
}
        
if (isCmd && antiSpam.isFiltered(from) && isGroup) {
console.log(color('[SPAM]', 'red'), color(jam, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
return replyDeface('「 ❗ 」Sabar Bang 5 Detik/Command')
}

if (isCmd && !isOwner) antiSpam.addFilter(from)

//Antilinkwame
if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (chata.match(/(wa.me)/gi)) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
replyDeface(`*「  LINK WA ME DETECTOR 」*\n\nSepertinya kamu mengirimkan link wa me, maaf kamu akan di kick`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match(/(https:\/\/wa.me)/gi)) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
replyDeface(`*「 LINK WA ME DETECTOR 」*\n\nSepertinya kamu mengirimkan link wa me, maaf kamu akan di kick`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLinkAll && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('https://')) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
reply(`*「 LINK DETECTOR 」*\n\n karena kamu melanggar aturan group, yaitu menggirim link kamu akan di kick dari group! bye bye:)`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLinkAll && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('http://')) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
reply(`*「 LINK DETECTOR 」*\n\n karena kamu melanggar aturan group, yaitu menggirim link kamu akan di kick dari group! bye bye:)`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLinkAll && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('.com')) {
if (!isBotGroupAdmins) return replyDeface(`*Selama Bot Bukan Admin Kirim Lah Link Sesuka Mu*`)
reply(`*「 LINK DETECTOR 」*\n\n karena kamu melanggar aturan group, yaitu menggirim link kamu akan di kick dari group! bye bye:)`)
saipul.groupParticipantsUpdate(from, [sender], "remove")
}
}
// Store Respon
        if (!isCmd && isGroup && isAlreadyResponList(from, chata, db_respon_list)) {
        var get_data_respon = getDataResponList(from, chata, db_respon_list)
        if (get_data_respon.isImage === false) {
        saipul.sendMessage(from, { text: sendResponList(from, chata, db_respon_list) }, {
        quoted: msg
        })
        } else {
        saipul.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
        quoted: msg
        })
        }
        }
    switch (command) {
    	
case 'help':
case 'fitur':
let buttonns = [
{ buttonId: `${prefix}owner`, buttonText: {displayText: '🧑‍🎤Owner'}, type: 1}
]
let buttonMessage = {
document: fs.readFileSync("./temp/wps.mp4"),
mimetype: "video/mp4",
fileName: ucapanWaktu + " " + pushname,
fileLength: 924,
caption: menunya,
footer: `${botName}`,
buttons: buttonns,
headerType: 4,
contextInfo:{externalAdReply:{
title: `${botName}`,
body: "Bot Multi Device",
thumbnail: thum,
thumbnailUrl: 'https://telegra.ph/Astore-11-17-3',
sourceUrl: `https://wa.me/${owncek}`,
mediaUrl: `https://wa.me/${owncek}`,
renderLargerThumbnail: true,
showAdAttribution: true,
mediaType: 1
}}
}
saipul.sendMessage(from, buttonMessage, { quoted: msg })
break

case 'ownmenu':
saipul.sendMessage(from, { text: ownmenu, contextInfo:{ externalAdReply:{ title: `WPSBOT`, body: "Jangan Lupa Subscribe", thumbnail: thum, sourceUrl: 'https://www.youtube.com/channel/UCnEDBoCZqiR2mipASKVkOaQ', mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}}, { quoted: m });
break

case 'afk': 
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
              if (!isGroup) return 
              if (isAfkOn) return reply('Kalo Mau Afk Jangan Nimbrung di sini')
              const reason = q ? q : '*No Pesan*'
              afkg.addAfkUser(sender, time, reason, _afks)
              const aluty = `*ꞌꞋ ࣪𓂃 ִֶָ Admin Afk ִֶָ 𓂃 ࣪ꞌꞋ*

${pushname} Sekarang Offline/Afk
O *Alasan*  : ${reason}
O *Mulay Afk* : ${time}`
              //saipul.sendMessage(from, aluty, text)
              saipul.sendMessage(from, { text: aluty, contextInfo:{ externalAdReply:{ title: `MODE AFK ON`, body: "Saat Ini Kamu Afk", thumbnail: thumafk, sourceUrl: `https://wa.me/${sender}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}}, { quoted: m });
              break

    	// Store Menu
        case 'menu': case 'list':        
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message di database`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}`,
                buttonText: 'Click Here!',
                footer: `*WPSBOT*\n\n⏳ ${jam}\n📆 ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
           saipul.sendMessage(from, listMsg)
            //sendOrder(from, listMsg, "3836", thum, 2022, "MENU PRICELIST", `${owncek}@s.whatsapp.net`, "AR6ebQf7wTuyXrVneA0kUMMbQe67ikT6LZrwT2uge7wIEw==", "9783")
            break
        case 'addlist':        
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/stickers/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`*Sukses Set List Massage*\n*Kata Kunci :* *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`*Sukses Set List Massage*\n*Kata Kunci :* *${args1}*`)
            }
            break
        case 'dellist':        
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sekses Delete List *${q}*`)
            break
case 'resetlistall':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum Ada List Di Group Ini`)
            resetListAll(from, db_respon_list)
            reply(`Sekses Delete All List*`)
            break
case 'dellist2':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            var uturu = q.split("@")[0]
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, uturu, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, uturu, db_respon_list)
            reply(`Sekses Delete List *${q}*`)
            break
        case 'updatelist': case 'update':        
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/stickers/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses Updatelist : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses Updatelist : *${args1}*`)
            }
            break
case 'jeda': {
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (!args[0]) return replyDeface(`kirim ${command} waktu\nContoh: ${command} 30m\n\nlist waktu:\ns = detik\nm = menit\nh = jam\nd = hari`)
            opengc[from] = { id: from, time: Date.now() + toMS(args[0]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            saipul.groupSettingUpdate(from, "announcement")
            .then((res) => replyDeface(`Jeda Dulu Ya Group Akan Di Buka Dalam ${args[0]} Lagi`))
            .catch((err) => replyDeface('Error'))
            }
            break
case 'kalkulator':
         case 'hitung':
         case 'total':
         case 'hasil':
         if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
         if (!q) return reply(`( + ) = Untuk Tambah-Tambahan\n( - ) = Untuk Kurang-Kurangan\n( * ) = Untuk Kali-Kalian\n( / ) = Untuk Bagi-Bagian\n\nContoh\n/kalkulator 40+20`)
         var tteks = `Hasil : ${Math_js.evaluate(q)}`
         replyDeface(tteks)
         break 
        case 'p': case 'proses':
            if (!isPrem) return
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            let proses = `O━• *Transaksi Proses* •━O

${gy}🎉 Status : Pending
🎊 Mohon Di Tunggu
📆 ${tanggal}
⏰ ${jam}${gy}

✎📜 Pesanan : 
${rm.quoted.text}

📜 *Pesanan @${rm.quoted.sender.split("@")[0]} Pending Mohon Di Tunggu*
━O━O━••••••••••••━O━O━`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
                mentions(getTextP.replace('@pesanan', rm.quoted.text).replace('user', rm.quoted.sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [rm.quoted.sender], true);
            } else {
                mentions(proses, [rm.quoted.sender], true)
            }
            break

        case 'd': case 'done':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            let sukses = `O━• *Transaksi Sukses* •━O

${gy}🎉 Status : Sukses
📆 ${tanggal}
⏰ ${jam}${gy}

✎📜 Pesanan : 
${rm.quoted.text}

📜 *Pesanan @${rm.quoted.sender.split("@")[0]} Sukses*
━O━O━••••••••••••━O━O━`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('@pesanan', rm.quoted.text).replace('user', rm.quoted.sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [rm.quoted.sender], true);
            } else {
                mentions(sukses, [rm.quoted.sender], true)
            }
            break
        case 'setproses': case 'setp':
        if (isPricelist) return reply(`Fitur Pricelist Disable Untuk Melihat Fitur Ketik ${prefix}help`)
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`*Ini Hanya Contoh*\n${prefix}setp Pesanan Proses\n@jam\n@tanggal\nPesanan : @pesanan\n\nPesanan @user Sedang Di Proses `)
            if (isSetProses(from, set_proses)) return replyDeface(`Sudah Ada Setp Sebelumnya`)
            //addCountCmd(`${prefix}setproses`, sender, _cmd)
            addSetProses(q, from, set_proses)
            replyDeface(`Sukses Set Proses!`)
            break
        case 'changeproses': case 'updatep':
        if (isPricelist) return reply(`Fitur Pricelist Disable Untuk Melihat Fitur Ketik ${prefix}help`)
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`*Ini Hanya Contoh*\n${prefix}updatep Pesanan Proses\n@jam\n@tanggal\nPesanan : @pesanan\n\nPesanan @user Sedang Di Proses`)
            //addCountCmd(`${prefix}changeproses`, sender, _cmd)
            if (isSetProses(from, set_proses)) {
                changeSetProses(q, from, set_proses)
                replyDeface(`Sukses Update Set Proses`)
            } else {
                addSetProses(q, from, set_proses)
                replyDeface(`Sukses Update Set Proses`)
            }
            break
        case 'delsetproses': case 'delsetp':
        if (isPricelist) return reply(`Fitur Pricelist Disable Untuk Melihat Fitur Ketik ${prefix}help`)
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetProses(from, set_proses)) return replyDeface(`Belum ada set proses di sini..`)
            //addCountCmd(`${prefix}delsetproses`, sender, _cmd)
            removeSetProses(from, set_proses)
            replyDeface(`Sukses Delete Set Proses`)
            break
        case 'setdone': case 'setd':
        if (isPricelist) return reply(`Fitur Pricelist Disable Untuk Melihat Fitur Ketik ${prefix}help`)
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`*Ini Hanya Contoh*\n${prefix}setd Pesanan Sukses\n@jam\n@tanggal\nPesanan : @pesanan\n\nPesanan @user Sukses`)
            if (isSetDone(from, set_done)) return replyDeface(`Sudah Ada Setd Sebelumnya`)
            //addCountCmd(`${prefix}setdone`, sender, _cmd)
            addSetDone(q, from, set_done)
            replyDeface(`Sukses Setd!`)
            break
        case 'changedone': case 'updated':
        if (isPricelist) return reply(`Fitur Pricelist Disable Untuk Melihat Fitur Ketik ${prefix}help`)
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`*Ini Hanya Contoh*\n${prefix}updated Pesanan Sukses\n@jam\n@tanggal\nPesanan : @pesanan\n\nPesanan @user Sukses`)
            //addCountCmd(`${prefix}changedone`, sender, _cmd)
            if (isSetDone(from, set_done)) {
                changeSetDone(q, from, set_done)
                replyDeface(`Sukses Update Setd`)
            } else {
                addSetDone(q, from, set_done)
                replyDeface(`Sukses Update Setd`)
            }
            break
        case 'delsetdone': case 'delsetd':
        if (isPricelist) return reply(`Fitur Pricelist Disable Untuk Melihat Fitur Ketik ${prefix}help`)
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetDone(from, set_done)) return replyDeface(`Belum ada set done di sini..`)
            //addCountCmd(`${prefix}delsetdone`, sender, _cmd)
            removeSetDone(from, set_done)
            replyDeface(`Sukses Delete Setd`)
            break
//SETBOT
case 'setbot':
    case 'setmenu':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`*Ini Hanya Contoh*\n${prefix}setbot Halo Silahkan Ketik #menu Untuk Melihat List Di Group Ini`)
            if (isSetBot(from, set_bot)) return replyDeface(`Sudah Ada Menu Sebelumnya, silahkan ketik ${prefix}updatemenu`)
            //addCountCmd(`${prefix}setbot`, sender, _cmd)
            addSetBot(q, from, set_bot)
            replyDeface(`Sukses Respon Menu!`)
            break
        case 'changebot': case 'updatesetbot': case 'updatemenu':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`*Ini Hanya Contoh*\n${prefix}updatesetbot Hai Kak Silahkan Ketik #menu Untuk Melihat List`)
            //addCountCmd(`${prefix}changebot`, sender, _cmd)
            if (isSetBot(from, set_bot)) {
                changeSetBot(q, from, set_bot)
                replyDeface(`Sukses Update Respon Menu`)
            } else {
                addSetBot(q, from, set_bot)
                replyDeface(`Sukses Update Respon Menu`)
            }
            break
        case 'delsetbot': case 'delsetb':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetBot(from, set_bot)) return replyDeface(`Belum ada setbot di sini..`)
            //addCountCmd(`${prefix}delsetbot`, sender, _cmd)
            removeSetBot(from, set_bot)
            replyDeface(`Sukses Delete Respon Bot`)
            break
case 'add':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins) return replyDeface(mess.GrupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (groupMembers.length == 257) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 0) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await saipul.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                ////addCountCmd(`${prefix}add`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (m.isQuotedMsg) {
                number = m.quotedMsg.sender
                var cek = await saipul.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                ////addCountCmd(`${prefix}add`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            break
case 'kick':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins) return replyDeface(mess.GrupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                ////addCountCmd(`${prefix}kick`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [number], "remove")
                .then( res => replyDeface(jsonformat(res)))
                .catch((err) => replyDeface(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = m.quotedMsg.sender
                ////addCountCmd(`${prefix}kick`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [number], "remove")
                .then( res => replyDeface(jsonformat(res)))
                .catch((err) => replyDeface(jsonformat(err)))
            } else {
                replyDeface(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            break
        case 'promote':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins) return replyDeface(mess.GrupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                ////addCountCmd(`${prefix}promote`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => replyDeface(mess.error.api))
            } else if (m.isQuotedMsg) {
                ////addCountCmd(`${prefix}promote`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [m.quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${m.quotedMsg.sender.split("@")[0]} sebagai admin`, [m.quotedMsg.sender], true) })
                .catch(() => replyDeface(mess.error.api))
            } else {
                replyDeface(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            break
        case 'demote':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins) return replyDeface(mess.GrupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                ////addCountCmd(`${prefix}demote`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => replyDeface(mess.error.api))
            } else if (m.isQuotedMsg) {
                ////addCountCmd(`${prefix}demote`, sender, _cmd)
                saipul.groupParticipantsUpdate(from, [m.quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${m.quotedMsg.sender.split("@")[0]} sebagai member biasa`, [m.quotedMsg.sender], true) })
                .catch(() => replyDeface(mess.error.api))
            } else {
                replyDeface(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            break
        
case 'owner': case 'sewabot':
            sendContact(from, ownnumber.split('@s.whatsapp.net')[0], ownerName, msg)
            // saipul.sendContact(from, ownerNumber.map( i => i.split("@")[0]), msg)
            .then((res) => saipul.sendMessage(from, { text: '*Jika Ingin Sewabot Silahkan Hubungi Owner Ku*' }, {quoted: res}))
            break

case 'getlink':
              if (!isOwner) return reply(`Command ${command} Hanya Khusus Owner`)
              if(!q)return reply('*Sertai Id Group*')
              var linkgc = await saipul.groupInviteCode(`${q}`)
              reply('https://chat.whatsapp.com/'+linkgc)
              break
case 'list2':
              reply(`*PAYMENT CEK DESCRIPSI*\n\nALL PRICELIST KLIK LINK\nhttps://bit.ly/3Qn3Z8E`)
              break

case 'sc': {
let runnya = `⬣━━━ꕥ〔 *SEWA BOT STORE* 〕ꕥ━━━⬣
✾ Silahkan Hubungi https://wa.me/6281293152995
                
                
✾ *15K:* /BULAN, PERTAMA SEWA (satu group)
✾ *10K:* /BULAN, LANJUT SEWA (satu group)
                
✾ *Sewa Bot* http://sewabot.epizy.com
✾ *Payment* http://paymentt.epizy.com
                

✾ *YOUTUBE OFFICIAL*
https://youtube.com/@play_gamers3162?si=2n7T3Er8eTzx7RNP

⬣━━━ꕥ〔 *2023 • ASTBOT* 〕ꕥ━━━⬣`
replyDeface(runnya)    
let vn = `https://github.com/saipulanuar/Api-Github/raw/main/audio/script.mp3`
saipul.sendMessage(from, {audio: await getBuffer(vn), mimetype:'audio/mpeg', ptt:true }, {quoted:m})}

case 'addsewa':
            if (!isOwner) return 
            if (args.length < 1) return 
            if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
            var url = args[0]
            url = url.split('https://chat.whatsapp.com/')[1]
            if (!args[1]) return replyDeface(`Waktunya?`)
            var data = await saipul.groupAcceptInvite(url)
            if (_sewa.checkSewaGroup(data, sewa)) return replyDeface(`Bot sudah disewa oleh grup tersebut!`)
            _sewa.addSewaGroup(data, args[1], sewa)
            replyDeface(`Success Add Sewa Group!`)
            break

case 'addsw':
case 'sewawps':
case 'perpanjang':
              if (!isOwner) return reply(`Command ${command} Hanya Khusus Owner`)
              if (args.length < 1) return reply(`Penggunaan :\n*${prefix}addsewa 15k 30d*\n*Ini Hanya Contoh*`)
              _sewa.addSewaGroup(from, args[1], sewa)
              reply(`Success Add Sewa\nDi Group ${await getGcName(x.id)}\n\n${prefix}checksewa untuk cek durasi sewa`)
              break

case 'delsewa':
              if (!isOwner) return replyDeface(mess.OnlyOwner)
              if (!isGroup) return replyDeface(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
              if (!isSewa) return replyDeface(`Bot tidak disewa di Grup ini`)
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
              replyDeface(`Sukses`)
              break

        case 'delsw':
            if (!isOwner) return replyDeface(mess.OnlyOwner)
            if (!isGroup) return replyDeface(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
            if (!isSewa) return replyDeface(`Bot tidak disewa di Grup ini`)
            sewa.splice(_sewa.getSewaPosition(args[0], sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
            replyDeface(`Sukses`)
            break

case 'checksewa': case 'ceksewa':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isSewa) return replyDeface(`Bot tidak di sewa group ini!`)
            let ceksewa = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            let sewanya = `*Expire :* ${ceksewa.days} Hari - ${ceksewa.hours} Jam - ${ceksewa.minutes} Menit`
            replyDeface(sewanya)
            break

case 'listsewa':
if (!isOwner) return replyDeface(mess.OnlyOwner)
            let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`
            let data_array = [];
            for (let x of sewa) {
                ////addCountCmd(`${prefix}listsewa`, sender, _cmd)
                list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
                if (x.expired === 'PERMANENT') {
                    let ceksewa = 'PERMANENT'
                    list_sewa_list += `*Expire :* PERMANENT\n\n`
                } else {
                    let ceksewa = ms(x.expired - Date.now())
                    list_sewa_list += `*Expire :* ${ceksewa.days} Hari - ${ceksewa.hours} Jam - ${ceksewa.minutes} Menit - ${ceksewa.seconds} second\n\n`
                }
            }
            saipul.sendMessage(from, { text: list_sewa_list }, { quoted: msg })
            break

case 'setppgrup': case 'setppwps':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            //addCountCmd(`${prefix}setppgrup`, sender, _cmd)
            var media = await downloadAndSaveMediaMessage('image', `ppgc.jpeg`)
            if (args[0] == `/panjang`) {
            	var { img } = await generateProfilePicture(media)
            	await saipul.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	replyDeface(`Sukses`)
            } else {
                await saipul.updateProfilePicture(from, { url: media })
                .then( res => {
                    replyDeface(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => replyDeface(mess.error.api))
            }
            } else {
			    replyDeface(`Kirim/balas gambar dengan caption ${command}`)
            }
            break

        case 'setpp': case 'setppbot':
if (!isOwner) return replyDeface("Khusus owner tod!")
if (isImage || isQuotedImage) {
            //addCountCmd(`${prefix}setppgrup`, sender, _cmd)
            var media = await downloadAndSaveMediaMessage('image', `ppbot.jpeg`)
            if (args[0] == `/panjang`) {
                var { img } = await generateProfilePicture(media)
                await saipul.query({
                    tag: 'iq',
                    attrs: {
                        to: botNumber,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
                replyDeface(`Sukses`)
            } else {
                await saipul.updateProfilePicture(from, { url: media })
                .then( res => {
                    replyDeface(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => replyDeface(mess.error.api))
            }
            } else {
                replyDeface(`Kirim/balas gambar dengan caption ${command}`)
            }
break


     //SANTET MENU SANTET MENU SANTET MENU SANTET MENU SANTET MENU
case 'wps':
if (!isOwner) return replyDeface("Khusus owner tod!")
if (!q) return replyDeface(`*Contoh*\n\n${prefix}wps 62 8123-4568-9012`)
var tosend = q.split("|")[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net"
if (Input == ownerNumber) return replyDeface('Tidak Bisa, Karena Itu Nomer Owner')
let kgdhwus = await saipul.onWhatsApp(tosend)
if (kgdhwus.length == 0) return replyDeface(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
var jumlah = '30'
for (let i = 0; i < jumlah; i++) {
saipul.sendMessage(tosend, {
text: '', 
templateButtons: [
{ callButton: { displayText: `P`, phoneNumber: ``}},
{ urlButton: { displayText: `P`, url: `https://wa.me/`}},
{ urlButton: { displayText: `P`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `P`, id: ``}},
{ quickReplyButton: { displayText: `P`, id: ``}},
{ quickReplyButton: { displayText: `P`, id: ``}},
]})
await sleep(1000)
}
replyDeface(`Sukses`)
break
     //SANTET MENU SANTET MENU SANTET MENU SANTET MENU SANTET MENU



        case 'setnamegrup': case 'setnamegc': case 'setname':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (args.length < 0) return replyDeface(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} Support ${ownerName}`)
            //addCountCmd(`${prefix}setnamegc`, sender, _cmd)
            await saipul.groupUpdateSubject(from, q)
            .then( res => {
                replyDeface(`Sukses`)
            }).catch(() => replyDeface(mess.error.api))
            break
        case 'setdesc': case 'setdescription':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (args.length < 0) return replyDeface(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} New Description by ${ownerName}`)
            //addCountCmd(`${prefix}setdesc`, sender, _cmd)
            await saipul.groupUpdateDescription(from, q)
            .then( res => {
                replyDeface(`Sukses`)
            }).catch(() => replyDeface(mess.error.api))
            break

case 'revoke':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins) return replyDeface(mess.GrupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            await saipul.groupRevokeInvite(from)
            .then( res => {
                replyDeface(`Sukses menyetel tautan undangan grup ini`)
            }).catch(() => replyDeface(mess.error.api))
            break
        case 'hidetag':
        case 'h':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            saipul.sendMessage(from, { text: q ? q : m.quotedMsg.chats, mentions: mem })
            break
          case 'tagall': {
          if (!isGroup) return replyDeface(mess.OnlyGrup)
          if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
let teks = `      〘 *👥 Tag All* 〙
 
 ➲ *Pesan : ${q ? q : 'Order Oy Order'}*\n\n`
                for (let mem of participants) {
                teks += `⭔ @${mem.id.split('@')[0]}\n`
                }
                saipul.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
                }
                break
        case 'delete': case 'del': case 'd':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!m.isQuotedMsg) return replyDeface(`Balas chat dari bot yang ingin dihapus`)
            if (!m.quotedMsg.fromMe) return replyDeface(`Hanya bisa menghapus chat dari bot`)
            saipul.sendMessage(from, { delete: { fromMe: true, id: m.quotedMsg.id, remoteJid: from }})
            break
        

case 'welcome':
                    if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
					if (!isOwner && !isGroupAdmins) return reply(`Command ${command} Hanya Khusus Admin`)
					if (!isBotGroupAdmins) return reply(`*Jadi Kan Bot Admin Sebelum Menggunakan*`)
					if (args.length < 1) return reply(`Untuk Mengaktifkan Ketik 1\nContoh : ${prefix}welcome 1\n\nUntuk Nonaktifkan Welcome Ketik 0\nContoh : ${prefix}welcome 0`)
					if (Number(args[0]) === 1) {
					if (isWelcome) return reply('welcome sudah aktif')
					welcome.push(from)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
					reply('Done Mengaktifkan welcome✅')
					saipul.sendMessage(from, { text: `*Welcome Online*` })
					} else if (Number(args[0]) === 0) {
					if (!isWelcome) return reply('Mode welcome sudah disable')
					let anu1 = antiwame.indexOf(from)
					welcome.splice(anu1, 1)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
					reply('Sukes menonaktifkan welcome di group ini ✔️')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
        case 'leave':
        case 'left':
                    if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
					if (!isOwner && !isGroupAdmins) return reply(`Command ${command} Hanya Khusus Admin`)
					if (!isBotGroupAdmins) return reply(`*Jadi Kan Bot Admin Sebelum Menggunakan*`)
					if (args.length < 1) return reply(`Untuk Mengaktifkan Ketik 1\nContoh : ${prefix}leave 1\n\nUntuk Nonaktifkan Leave Ketik 0\nContoh : ${prefix}leave 0`)
					if (Number(args[0]) === 1) {
					if (isLeft) return reply('left sudah aktif')
					left.push(from)
					fs.writeFileSync('./database/left.json', JSON.stringify(left))
					reply('Done Mengaktifkan left✅')
					saipul.sendMessage(from, { text: `*Left Online*` })
					} else if (Number(args[0]) === 0) {
					if (!isLeft) return reply('Mode left sudah disable')
					let anu1 = antiwame.indexOf(from)
					left.splice(anu1, 1)
					fs.writeFileSync('./database/left.json', JSON.stringify(left))
					reply('Sukes menonaktifkan left di group ini ✔️')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break

        case 'price':
                    if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
					if (!isOwner) return reply(`Command ${command} Hanya Khusus Admin`)
					if (args.length < 1) return reply(`Untuk Mengaktifkan Ketik 1\nContoh : ${prefix}price 0\n\nUntuk Nonaktifkan Pricelist Ketik 1\nContoh : ${prefix}pricelist 1`)
					if (Number(args[0]) === 0) {
					if (isPricelist) return reply('Pricelist sudah aktif')
					pricelist.push(from)
					fs.writeFileSync('./database/pricelist.json', JSON.stringify(pricelist))
					reply('Done Mengaktifkan Pricelist Group✅')
					saipul.sendMessage(from, { text: `Done Mengaktifkan Pricelist Group` })
					} else if (Number(args[0]) === 1) {
					if (!isPricelist) return reply('Pricelist sudah disable')
					let anu1 = pricelist.indexOf(from)
					pricelist.splice(anu1, 1)
					fs.writeFileSync('./database/pricelist.json', JSON.stringify(pricelist))
					reply('Sukes menonaktifkan Pricelist group di group ini ✔️')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break

              case 'antilink':
                    if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
					if (!isOwner && !isGroupAdmins) return reply(`Command ${command} Hanya Khusus Admin`)
					if (!isBotGroupAdmins) return reply(`*Jadi Kan Bot Admin Sebelum Menggunakan Fitur Antilink*`)
					if (args.length < 1) return reply(`Untuk Mengaktifkan Ketik 1\nContoh : ${prefix}antilink 1\n\nUntuk Nonaktifkan Antilink Ketik 0\nContoh : ${prefix}antilink 0`)
					if (Number(args[0]) === 1) {
					if (isAntiLink) return reply('anti link group sudah aktif')
					antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					reply('Done Mengaktifkan Antilink Group✅')
					saipul.sendMessage(from, { text: `Perhatian kepada seluruh member anti link group aktif apabila anda mengirim link group anda akan di kick dari group` })
					} else if (Number(args[0]) === 0) {
					if (!isAntiLink) return reply('Mode anti link group sudah disable')
					let anu1 = antilink.indexOf(from)
					antilink.splice(anu1, 1)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					reply('Sukes menonaktifkan anti link group di group ini ✔️')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break

case 'antilink':
                    if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
					if (!isOwner && !isGroupAdmins) return reply(`Command ${command} Hanya Khusus Admin`)
					if (!isBotGroupAdmins) return reply(`*Jadi Kan Bot Admin Sebelum Menggunakan Fitur Antilink*`)
					if (args.length < 1) return reply(`Untuk Mengaktifkan Ketik 1\nContoh : ${prefix}antilink 1\n\nUntuk Nonaktifkan Antilink Ketik 0\nContoh : ${prefix}antilink 0`)
					if (Number(args[0]) === 1) {
					if (isAntiLinkAll) return reply('anti link all group sudah aktif')
					antilinkall.push(from)
					fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkall))
					reply('Done Mengaktifkan Antilink all Group✅')
					saipul.sendMessage(from, { text: `Perhatian kepada seluruh member anti link group aktif apabila anda mengirim link group anda akan di kick dari group` })
					} else if (Number(args[0]) === 0) {
					if (!isAntiLinkAll) return reply('Mode anti link all group sudah disable')
					let anu1 = antilink.indexOf(from)
					antilinkall.splice(anu1, 1)
					fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkall))
					reply('Sukes menonaktifkan anti link all group di group ini ✔️')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
				
case 'antilinkwame':
                    if (!isGroup) return reply(`Bot Hanya Respon Di Dalam Group`)
					if (!isOwner && !isGroupAdmins) return reply(`Command ${command} Hanya Khusus Admin`)
					if (!isBotGroupAdmins) return reply(`*Jadi Kan Bot Admin Sebelum Menggunakan Fitur Antilink*`)
					if (args.length < 1) return reply(`Untuk Mengaktifkan Ketik 1\nContoh : ${prefix}antiwame 1\n\nUntuk Nonaktifkan Antiwame Ketik 0\nContoh : ${prefix}antiwame 0`)
					if (Number(args[0]) === 1) {
					if (isAntiWame) return reply('antiwame group sudah aktif')
					antiwame.push(from)
					fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
					reply('Done Mengaktifkan antiwame Group✅')
					saipul.sendMessage(from, { text: `Perhatian kepada seluruh member antiwame aktif apabila anda mengirim link antiwame anda akan di kick dari group` })
					} else if (Number(args[0]) === 0) {
					if (!isAntiWame) return reply('Mode antiwame group sudah disable')
					let anu1 = antiwame.indexOf(from)
					antiwame.splice(anu1, 1)
					fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
					reply('Sukes menonaktifkan antiwame group di group ini ✔️')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
        case 'open': case 'buka':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            saipul.groupSettingUpdate(from, 'not_announcement')
            .then((res) => {
            let opengc = `O━• *Group Open* •━O

📜 *Group Telah Di Buka Oleh Admin* @${sender.split("@")[0]}

${gaya}🎊 Group Open
📆 ${tanggal}
⏰ ${jam}${gaya}

━O━O━••••••••••••━O━O━`
            const tettOpen = getTextSetOpen(from, set_open);
            if (tettOpen !== undefined) {
            mentions(tettOpen.replace('admin', sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [sender], true);
            } else {
            mentions(opengc, [sender], true)
            }
            })
			break

        case 'close': case 'tutup':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
		    saipul.groupSettingUpdate(from, 'announcement')
		    .then((res) => {
			let closegc = `O━• *Group Close* •━O

📜 *Group Telah Di Tutup Oleh Admin* @${sender.split("@")[0]}

${gaya}🎊 Group Tutup
📆 ${tanggal}
⏰ ${jam}${gaya}

━O━O━••••••••••••━O━O━`
            const textClose = getTextSetClose(from, set_close);
            if (textClose !== undefined) {
            mentions(textClose.replace('admin', sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [sender], true);
            } else {
            mentions(closegc, [sender], true)
            }
            })
            .catch((err) => replyDeface('Error'))
		    break

        case 'setopen':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_open*\n\n_Contoh_\n\n${command} Group telah di buka`)
            if (isSetOpen(from, set_open)) return replyDeface(`Set Open already active`)
            addSetOpen(q, from, set_open)
            replyDeface(`Successfully set Open!`)
            break
        case 'updateopen':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_open*\n\n_Contoh_\n\n${command} Group telah di buka`)
            if (isSetOpen(from, set_open)) {
                changeSetOpen(q, from, set_open)
                replyDeface(`Sukses change set Open teks!`)
            } else {
                addSetOpen(q, from, set_open)
                replyDeface(`Sukses change set Open teks!`)
            }
            break
        case 'delsetopen':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetOpen(from, set_open)) return replyDeface(`Belum ada set Open di sini..`)
            removeSetOpen(from, set_open)
            replyDeface(`Sukses delete set Open`)
            break
        case 'setclose':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_close*\n\n_Contoh_\n\n${command} Group telah di tutup`)
            if (isSetClose(from, set_close)) return replyDeface(`Set Close already active`)
            addSetClose(q, from, set_close)
            replyDeface(`Successfully set Close!`)
            break
        case 'updateclose':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_close*\n\n_Contoh_\n\n${command} Group telah di tutup`)
            if (isSetClose(from, set_close)) {
                changeSetClose(q, from, set_close)
                replyDeface(`Sukses change set Close teks!`)
            } else {
                addSetClose(q, from, set_close)
                replyDeface(`Sukses change set Close teks!`)
            }
            break
        case 'delsetclose':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetClose(from, set_close)) return replyDeface(`Belum ada set Close di sini..`)
            removeSetClose(from, set_close)
            replyDeface(`Sukses delete set Close`)
            break

        case 'setwelcome':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @nama, Selamat datang di @grup`)
            if (isSetWelcome(from, set_welcome_db)) return replyDeface(`Sudah Ada Setwelcone Sebelumnya`)
            addSetWelcome(q, from, set_welcome_db)
            //addCountCmd(`${prefix}setwelcome`, sender, _cmd)
            replyDeface(`Sukses Setwelcome!`)
            break
        case 'updatewelcome':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @nama, Selamat datang di @grup`)
            if (isSetWelcome(from, set_welcome_db)) {
                //addCountCmd(`${prefix}changewelcome`, sender, _cmd)
                changeSetWelcome(q, from, set_welcome_db)
                replyDeface(`Sukses change set welcome teks!`)
            } else {
                //addCountCmd(`${prefix}changewelcome`, sender, _cmd)
                addSetWelcome(q, from, set_welcome_db)
                replyDeface(`Sukses Update Setwelcome`)
            }
            break
        case 'delwelcome':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return replyDeface(`Belum Ada Setwelcone Sebelumnya`)
            removeSetWelcome(from, set_welcome_db)
            //addCountCmd(`${prefix}delsetwelcome`, sender, _cmd)
            replyDeface(`Sukses Delete Setwelcome`)
            break
        case 'setleave':
        case 'setleft':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @nama, Selamat tinggal dari @grup`)
            if (isSetLeft(from, set_left_db)) return replyDeface(`Sudah Ada Setleave Sebelumnya`)
            //addCountCmd(`${prefix}setleft`, sender, _cmd)
            addSetLeft(q, from, set_left_db)
            replyDeface(`Sukses Setleave`)
            break
        case 'updateleave':
        case 'updateleft':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!q) return replyDeface(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @nama, Selamat tinggal dari @grup`)
            if (isSetLeft(from, set_left_db)) {
                //addCountCmd(`${prefix}updateleft`, sender, _cmd)
                changeSetLeft(q, from, set_left_db)
                replyDeface(`Sukses Update Setleave`)
            } else {
                //addCountCmd(`${prefix}updateleft`, sender, _cmd)
                addSetLeft(q, from, set_left_db)
                replyDeface(`Sukses Update Setleave`)
            }
            break
        case 'delsetleft':
        case 'delleave':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GrupAdmin)
            if (!isSetLeft(from, set_left_db)) return replyDeface(`Belum Ada SetLeave Sebelumnya`)
            //addCountCmd(`${prefix}delsetleft`, sender, _cmd)
            removeSetLeft(from, set_left_db)
            replyDeface(`Sukses Delete Setleave`)
            break
        case 'linkgrup': case 'link': case 'linkgc':
            if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            var url = await saipul.groupInviteCode(from).catch(() => replyDeface(mess.error.api))
            url = 'https://chat.whatsapp.com/'+url
            replyDeface(url)
            break
case 'toimg': case 'toimage': case 'tovid': case 'tovideo':
if (!isGroup) return replyDeface(mess.OnlyGrup)
            //if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return replyDeface(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isQuotedSticker) return replyDeface(`Reply stikernya!`)
            var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            var buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            var rand1 = 'temp/'+getRandom('.webp')
            var rand2 = 'temp/'+getRandom('.png')
            fs.writeFileSync(`./${rand1}`, buffer)
            if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                //addCountCmd(`${prefix}toimg`, sender, _cmd)
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                    fs.unlinkSync(`./${rand1}`)
                    if (err) return replyDeface(mess.error.api)
                    saipul.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                    //limitAdd(sender, limit)
                    fs.unlinkSync(`./${rand2}`)
                })
            } else {
                replyDeface(mess.wait)
                //addCountCmd(`${prefix}tovid`, sender, _cmd)
                webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    saipul.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: msg })
                    //limitAdd(sender, limit)
                })
            }
            break
        case 'tomp3': case 'toaudio':
        if (!isGroup) return replyDeface(mess.OnlyGrup)
            //if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return replyDeface(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isVideo || isQuotedVideo) {
                let media = await downloadAndSaveMediaMessage('video', `./temp/${sender}.mp4`)
                replyDeface(mess.wait)
                //addCountCmd(`${prefix}tomp3`, sender, _cmd)
                let ran = './temp/'+getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                    fs.unlinkSync(media)
                    if (err) return replyDeface('Gagal :V')
                    saipul.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3` }, { quoted: msg })
                    //limitAdd(sender, limit)
                    fs.unlinkSync(media)
                    fs.unlinkSync(ran)
                })
            } else {
                replyDeface(`Kirim/reply video dengan caption ${command}`)
            }
            break
        case 'ttp':
        if (!isGroup) return replyDeface(mess.OnlyGrup)
            //if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return replyDeface(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 0) return replyDeface(`Gunakan dengan cara ${command} text\n\nContoh : ${command} saipul`)
            if (q.length > 75) return replyDeface(`Teksnya terlalu panjang`)
            //addCountCmd(`${prefix}ttp`, sender, _cmd)
            var pth = await getBuffer(`https://api.xteam.xyz/ttp?file&text=${encodeURIComponent(q)}`)
            fs.writeFileSync(`./temp/${sender}.png`, pth)
            var media = `./temp/${sender}.png`
            await ffmpeg(`${temp}`)
            .input(temp)
            .on('start', function (cmd) {
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(temp)
                replyDeface(mess.error.api)
            })
            .on('end', function () {
                exec(`webpmux -set exif ./temp/data.exif ./temp/${sender}.webp -o ./temp/${sender}.webp`, async (error) => {
                    if (error) return replyDeface(mess.error.api)
                    saipul.sendMessage(from, { sticker: fs.readFileSync(`./temp/${sender}.webp`) }, {quoted: msg})
                    //limitAdd(sender, limit)
                    fs.unlinkSync(media)
                    fs.unlinkSync(`./temp/${sender}.webp`)
                })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(`./temp/${sender}.webp`)
            break
        case 'attp':
        if (!isGroup) return replyDeface(mess.OnlyGrup)
            //if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return replyDeface(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 0) return replyDeface(`Gunakan dengan cara ${command} text\n\nContoh : ${command} saipul`)
            if (q.length > 75) return replyDeface(`Teksnya terlalu panjang`)
            //addCountCmd(`${prefix}attp`, sender, _cmd)
            var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            var rand2 = 'temp/'+getRandom('.webp')
            fs.writeFileSync(`./${rand2}`, data)
            exec(`webpmux -set exif ./temp/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                saipul.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                //limitAdd(sender, limit)
                fs.unlinkSync(`./${rand2}`)
            })
            break
        case 'emojimix': case 'mixemoji':
        if (!isGroup) return replyDeface(mess.OnlyGrup)
            //if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return replyDeface(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 0) return replyDeface(`Gunakan dengan cara ${command} emoji1+emoji2\n\nContoh : ${command} 😅+😝`)
            var emo1 = q.split("+")[0]
            var emo2 = q.split("+")[1]
            if (!isEmoji(emo1) || !isEmoji(emo2)) return replyDeface(`Itu bukan emoji!`)
            //addCountCmd(`${prefix}emojimix`, sender, _cmd)
            fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
            .then(data => {
                sendStickerFromUrl(from, data.results[0]. url, packname, author, { quoted: msg })
                //limitAdd(sender, limit)
            }).catch((e) => replyDeface(mess.error.api))
            break

case 'sticker':
        case 's':
        if (!isGroup) return replyDeface(mess.OnlyGrup)
            if (!isImage && !isQuotedImage && !isVideo && !isQuotedVideo) return reply(`Kirim media dengan caption ${prefix + command} atau tag media yang sudah dikirim`)
            var stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', ''))
            let stickerStream = new PassThrough()
            if (isImage || isQuotedImage) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                    })
                    .on('end', function () {
                        console.log('Finish')
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .writeToStream(stickerStream)
                KingOfBear.sendMessage(from, { sticker: { stream: stickerStream } })
            } else if (isVideo || isQuotedVideo) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                    })
                    .on('end', async () => {
                        KingOfBear.sendMessage(from, { sticker: { url: `./temp/stickers/${sender}.webp` } }).then(() => {
                            fs.unlinkSync(`./temp/stickers/${sender}.webp`)
                            console.log('Finish')
                        })
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .save(`./temp/stickers/${sender}.webp`)
            }
            break

// Search Menu
case 'ffid':
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!args[0]) return reply(`Example : \n${prefix + command} 7067443107`)
if (!Number(args[0])) return reply("Hanya angka")
let dede = await xzons.nickff(args.join(" "))
var epep = `*🔎 FREE FIRE 🔍*\n\nID : ${q}\nNICK :  ${dede.username}`
reply(epep)
break
case 'mlid':
if (!isGroup) return replyDeface(mess.OnlyGrup)
var args1 = q.split("/")[0]
var args2 = q.split("/")[1]                
if (!q) return reply(`Example : \n${prefix + command} 1285064241/2840`)
if (!Number(args1) && !Number(args2)) return reply("Hanya angka")
let deede = await xzons.nickml(args1, args2)
var mlb = `*🔎 MOBILE LEGENDS 🔍*

ID : ${q}
Nick : ${deede.userName}`
reply(mlb)
break
case 'pubgid':
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!q) return replyDeface(`Gunakan dengan cara ${prefix + command} *id*\n\n_Contoh_\n\n${command} 1234567890`)
axios.get(`https://api.lolhuman.xyz/api/pubg/${q}?apikey=${apikey}`)
.then(({data}) => {
let pubg = `*🔎 PUBG MOBILE 🔍*

ID : ${q}
Nick : ${data.result}`
replyDeface(pubg)
})
.catch((err) => {
console.log(color('[ ERROR ]', 'red'), err)
replyDeface(mess.error.api)
saipul.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
})
break
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

case 'listadmin':
            if (!isGroup) return 
            let teks = `List Admin Group ${groupMetadata.subject}\nTotal : ${groupAdmins.length}\n\n`
            let no = 0
            for (let admon of groupAdmins) {
            no += 1
            teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
            }
            mentions(teks, groupAdmins, true)
            break

case 'setthumb':
if (!isOwner) return reply(`*Khusus Owner*`)
let medifa = await downloadAndSaveMediaMessage('image', `./temp/logo.jpg`)
replyDeface(`*Sukses SetThumb*`)
break

case 'setvideo':
if (!isOwner) return reply(`*Khusus Owner*`)
let mediaa = await downloadAndSaveMediaMessage('video', `./temp/saipul.mp4`)
replyDeface(`*Sukses SetThumbVideo*`)
break

case 'saldo':
    if (!isOwner) return reply(mess.OnlyOwner)
let saldo = await digiflazz.cekSaldo();
let saldoku = await JSON.stringify(saldo.deposit)
let katasaldo = `*Saldo ${botName}*\n\nSisa Saldo : ${saldoku}`;
reply(`${katasaldo}`)
break

case 'order':
    case 'pulsa':
        case 'ml':
            case 'pln':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 1) return reply(`Penggunaan : ${prefix}order kode 085380779466`)
let deposit = await digiflazz.transaksi(args[0], args[1], `${randomString}`);
reply(`*[ Transaksi ${deposit.status} ]*

_Please Wait 40 Seconds_
`)
console.log(deposit)
await sleep(30000)
case 'cekorderan':
    let depositt = await digiflazz.transaksi(args[0], args[1], `${deposit.ref_id}`);
    reply(`O━━━• *[ Transaksi ${depositt.status} ]* •━━━O

    *ᴥ︎︎︎ Kode :* ${args[0]}
    *ᴥ︎︎︎ Tujuan :* ${depositt.customer_no}
    *ᴥ︎︎︎ Jam :* ${jam}
    *ᴥ︎︎︎ Tanggal :* ${tanggal}
    *ᴥ︎︎︎ Ket/SN :* ${depositt.sn}
    
    *Terimakasih Sudah Order*
    
    *━━O━O━••••••••••••━O━O━━*
    `)
    console.log(deposit)
break

case 'mla':
    if (!q) return reply(`Penggunaan : ${prefix}mla 86 816533498 12243`)
    if (!isOwner) return  reply(`Perintah ini hanya bisa digunakan oleh owner bot`)
  axios.get(`https://v1.apigames.id/transaksi/http-get-v1?merchant=${merchant}&secret=${secret}&produk=ML${args[0]}&tujuan=${args[1]}${args[2]}&ref=${randomString}`)
  .then(({data}) => {
  let epep = `O━━━• *[ Transaksi ${data.data.status} ]* •━━━O

  *ᴥ︎︎︎ GAME* : Mobile Legends A
  *ᴥ︎︎︎ USER ID* : ${args[1]} (${args[2]})
  *ᴥ︎︎︎ ITEM* : ${args[0]} Diamonds 
  *ᴥ︎︎︎ TIME* : ${jam}
  *ᴥ︎︎︎ DATE* : ${tanggal}
  *ᴥ︎︎︎ SN* : ${data.data.sn}
  
  *TerimaKasih Sudah Order*
  
  *━━O━O━••••••••••••━O━O━━*
  
  `;
  console.log(data)
  reply(epep)
    })
    .catch((err) => {
    reply(`Akun belom terkoneksikan`);
    });
    break

case 'react': {
if (!isGroup) return replyDeface(mess.OnlyGrup)
if (!m.isQuotedMsg) return reply("Reply pesanya!")
if (!args[0]) return reply("Masukan emoji react!")
var isBot = m.quotedMsg.sender === botNumber
saipul.sendMessage(from, { react: { text: args[0], key: { remoteJid: from, fromMe: isBot, id: m.quotedMsg.id } } })
}
break
        default:
if ((budy) && ["Prosesc", "cP"].includes(budy) && !isCmd) {
if (!isGroup) return
if (!isOwner && !isGroupAdmins) return
let proses = `O━• *Transaksi Proses* •━O

${gy}🎉 Status : Pending
?? Mohon Di Tunggu
📆 ${tanggal}
⏰ ${jam}${gy}

✎📜 Pesanan : 
${rm.quoted.text}

📜 *Pesanan @${rm.quoted.sender.split("@")[0]} Pending Mohon Di Tunggu*
━O━O━••••••••••••━O━O━`
const getTextP = getTextSetProses(from, set_proses);
if (getTextP !== undefined) {
mentions(getTextP.replace('@pesanan', rm.quoted.text).replace('user', rm.quoted.sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [rm.quoted.sender], true);
} else {
mentions(proses, [rm.quoted.sender], true)
}
}

if ((budy) && ["Donec", "cD"].includes(budy) && !isCmd) {
if (!isGroup) return
if (!isOwner && !isGroupAdmins) return
let sukses = `O━• *Transaksi Sukses* •━O

${gy}🎉 Status : Sukses
📆 ${tanggal}
⏰ ${jam}${gy}

✎📜 Pesanan : 
${rm.quoted.text}

📜 *Pesanan @${rm.quoted.sender.split("@")[0]} Sudah Sukses*
━O━O━••••••••••••━O━O━`
const getTextD = getTextSetDone(from, set_done);
if (getTextD !== undefined) {
mentions(getTextD.replace('@pesanan', rm.quoted.text).replace('user', rm.quoted.sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [rm.quoted.sender], true);
} else {
mentions(sukses, [rm.quoted.sender], true)
}
}

if ((budy) && ["Menu", "List", "list", "menu"].includes(budy) && !isCmd) {
if (!isGroup) return 
const getTextBot = getTextSetBot(from, set_bot);
if (getTextBot !== undefined) {
saipul.sendMessage(from, { text: getTextBot })
} else {
saipul.sendMessage(from, { text: `Belum ada menu, silahkan ketik ${prefix}setmenu listmenu nya
` })
}
}
          
    }
}
