require('../putraofcqr/putraofcsettings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const cheerio = require('cheerio')
const yts = require('yt-search')
const ytdl = require('ytdl-core')
const moment = require('moment-timezone')
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const hariiini = moment.tz('Asia/Jakarta').format('DD MMMM YYYY')
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')
const addusrp = JSON.parse(fs.readFileSync('./putraofcjs/database/user.json'))

module.exports = putraofc = async (putraofc, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await putraofc.decodeJid(putraofc.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')

const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await putraofc.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
	
if (!putraofc.public) {
if (!m.key.fromMe) return
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
		
try {
ppuser = await putraofc.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}
//━━━━━━━━━━━━━━━[ FAKE FAKE ]━━━━━━━━━━━━━━━━━//
const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': 'putraofcDev', 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;putraofcDev;;;\nFN:putraofcev\nitem1.TEL;waid=6281545463585:6281545463585\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb,sendEphemeral: true}}}
const reply = (teks) => {
putraofc.sendMessage(m.chat, { text: teks ,
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}
}, { quoted : repPy })
}
//HAYO MAU NGAPAIN//
const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: `${global.namabot}`,
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: `${global.namabot}`
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
//━━━━━━━━━━━━━━━[ DIWNLOAD YTMP3 ]━━━━━━━━━━━━━━━━━//
const downloadMp4 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp4File = getRandom('.mp4')
console.log(color('Download Video With ytdl-core'))
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on('finish', async () => {
await putraofc.sendMessage(m.chat, { video: fs.readFileSync(mp4File), caption: mess.succes, gifPlayback: false }, { quoted: m })
fs.unlinkSync(`./${mp4File}`)
})
} catch (err) {
m.reply(`${err}`)
}
}

const downloadMp3 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp3File = getRandom('.mp3')
console.log(color('Download Audio With ytdl-core'))
ytdl(Link, { filter: 'audioonly' })
.pipe(fs.createWriteStream(mp3File))
.on('finish', async () => {
await putraofc.sendMessage(m.chat, { audio: fs.readFileSync(mp3File), mimetype: 'audio/mp4' }, { quoted: m })
fs.unlinkSync(mp3File)
})
} catch (err) {
m.reply(`${err}`)
}
}
async function sendputraofcMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await putraofc.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
//━━━━━━━━━━━━━━━[ BATAS FAKE ]━━━━━━━━━━━━━━━━━//
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}
function monospace(string) {
return '```' + string + '```'
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

global.addUserPanel = (email, username, expired, _db) => {
var obj_add = {
email: email,
username: username,
expired: expired
}
_db.push(obj_add)
fs.writeFileSync('./putraofcjs/database/user.json', JSON.stringify(_db, null, 3))
}


switch (command) {

case 'menu':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `*Haii ${pushname} 😁👋*

_📍Mau Ngapain? Mau Lihat List Menu_
_Yang Saya Sediakan? Silahkan Click_
_Tombol Di Bawah Ini Untuk_
_Menampilkan Semua List Menu_
_Yang Ada_

*Jangan Lupa Subscribe Youtube Saya*
_https://youtube.com/@Putr4Sulsel_`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "Click Here!",
sections: [{title: "𝙻𝙸𝚂𝚃 𝙼𝙴𝙽𝚄",
rows: [
{title: " 🔏OWNER MENU", rowId: prefix+"create", description: "Menampilkan Menu Khusus Owner"}]},

{title: "𝙿𝚁𝙾𝙳𝚄𝙺 𝚂𝙰𝚈𝙰",
rows: [
{title: " ⚡LIST PANNEL", rowId: prefix+"listpannel", description: "Menampilkan List Pannel Yang Ada"},
{title: " 🌐JASA PEMBUATAN ADMIN PANNEL", rowId: prefix+"adminpanel", description: "Create Server Pterodactyl"},
{title: " ⚒️JASA PEMBUATAN BOT WHATSAPP️", rowId: prefix+"jasabot", description: "Create Bot Whatsapp"},
{title: " 🤖JASA RUNN BOT", rowId: prefix+"jasarun", description: "Membuat Bot Mu On 24 Jam !!"},
{title: " 🗂️ALL SCRIPT BOT WHATSAPP️", rowId: prefix+"listsc", description: "Menjual Semua Script Yang Ada"}]},
],
footer: '𝙿𝚄𝚃𝚁𝙰 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
                buffer = await getBuffer('https://b.top4top.io/m_26198wzi70.mp3')
await putraofc.sendMessage(m.chat, { audio: buffer, ptt: true, mimetype: 'audio/mpeg' }, { quoted: m })
}
break
case 'igku':{
igku = `@putratamv4n
_jan lupa di follow ya_`
m.reply(igku)
}
break
case 'ytku':{
ytku = `https://youtube.com/@Putr4Sulsel
*Jan Lupa Subscribe ya mass*`
m.reply(ytku)
}
break
  case 'ownku':{
  putraofc.sendContact(m.chat, global.owner, m)
  }
    break
case 'sticker': case 's': case 'stickergif': case 'sgif': {
            if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
            m.reply(mess.wait)
                    if (/image/.test(mime)) {
                let media = await quoted.download()
                let encmedia = await putraofc.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
            } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
                let media = await quoted.download()
                let encmedia = await putraofc.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
            } else {
                m.reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
                }
            }
break
case 'done?':{
if (!isCreator) return
bilangdone = `Jika Transaksi Selesai 
Silahkan Ketik Done & Kirim❗

Jika Malas Ketik Done Silahkan Click Tombol Dibawah Ini👇`
let btn_menu = [
{buttonId: `mhmg`, buttonText: { displayText: 'Done Mas✅' }, type: 1 },
]
putraofc.sendMessage(from,
{text: `${bilangdone}`,
buttons: btn_menu})
}
break
case 'mhmg':{
jiren = `「 *TRANSAKSI SELESAI* 」

*🧒PEMBELI :* _${pushname}_
*👤PENJUAL :* _Putra Ofc_
*📆TANGGAL :* _${hariini}_
*🔰SISTEM :* _Tanpa Admin [ Direct ]_
*✅STATUS :* _Selesai / Done_

*_WHATSAPP REAL HANYA_*
_085718498510 PUTRA OFC_
Selain Nomor Di Atas Dinyatakan Clone❗

*TERIMA KASIH TELAH ORDER DI PUTRA SULSEL*
*SEMOGA BISA BERTRANSAKSI KEMBALI DI LAIN HARI❤️*`
let btn_menu = [
{buttonId: `oakanakkzns`, buttonText: { displayText: 'SAMA SAMA' }, type: 1 },
]
putraofc.sendMessage(from,
{text: `${jiren}`,
buttons: btn_menu})
}
break
case 'pay':
case 'payment':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `*SILAHKAN PILIH METODE*
*PEMBAYARAN ANDA*`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "𝙋𝘼𝙔𝙈𝙀𝙉𝙏",
sections: [{title: "━━━━━━━━━━[ 𝙿𝙰𝚈𝙼𝙴𝙽𝚃 ]━━━━━━━━━━",
rows: [
{title: " ✅OVO", rowId: prefix+"ov", description: ""},
{title: " ✅DANA", rowId: prefix+"dn", description: ""},
{title: " ✅QRIS", rowId: prefix+"qr", description: ""}]},
],
footer: 'https://youtube.com/@PutraOFC',
mentions:[global.author, sender]})
}
break
case 'listsewa':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `List Sewa Bot Bug Putra Ofc
Keuntungan?
- Bebas Spam
- Bawa Bot Ke Gc mu [ Maxsimal 1 Grup ]
- anti jeda 5 menit
- Bot On 24 Jam & No Delay

Untuk Fitur Bug Nya Silahkan Cek Di Nomor Bot Wa.me/6285718498510

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘼𝘿𝘼𝙇𝘼𝙃 𝙇𝙄𝙎𝙏 & 𝙃𝘼𝙍𝙂𝘼
𝙎𝙀𝙒𝘼 𝘽𝙊𝙏 𝘽𝙐𝙂 𝙋𝙐𝙏𝙍𝘼 𝙊𝙁𝘾⚡
`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "𝗟𝗜𝗦𝗧 & 𝗛𝗔𝗥𝗚𝗔",
sections: [{title: "𝙻𝙸𝚂𝚃 𝚂𝙴𝚆𝙰 𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲",
rows: [
{title: " 1 MINGGU", rowId: prefix+"pay", description: "Rp 15.000"},
{title: " 1 BULAN", rowId: prefix+"pay", description: "Rp 25.000"},
{title: " 2 BULAN", rowId: prefix+"pay", description: "Rp 35.000"},
{title: " 3 BULAN", rowId: prefix+"pay", description: "Rp 45.000"},
{title: " PERMANEN", rowId: prefix+"pay", description: "Rp 55.000"}]},
],
footer: '𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
}
break
case 'listsc':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `*BERIKUT ADALAH SCRIPT BOT*
*YANG DI JUAL OLEH PUTRA OFC*`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "𝗟𝗜𝗦𝗧 𝗦𝗖𝗥𝗜𝗣𝗧",
sections: [{title: "𝙻𝙸𝚂𝚃 𝚂𝙲𝚁𝙸𝙿𝚃 𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲",
rows: [
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙲𝚁𝙴𝙰𝚃𝙴 𝙿𝙰𝙽𝙽𝙴𝙻", rowId: prefix+"pay", description: "𝚁𝙿 𝟸𝟻.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙲𝚁𝙴𝙰𝚃𝙴 𝙿𝙰𝙽𝙽𝙴𝙻 & 𝙼𝙴𝙽𝚄 𝚂𝚃𝙾𝚁𝙴", rowId: prefix+"pay", description: "𝚁𝙿 𝟻𝟶.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙲𝚁𝙴𝙰𝚃𝙴 𝚆𝙴𝙱 𝙿𝙷𝙸𝚂𝙸𝙽𝙶", rowId: prefix+"pay", description: "𝚁𝙿 𝟸𝟶.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝚄𝙶 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿", rowId: prefix+"pay", description: "𝚁𝙿 𝟸𝟶.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝚄𝙶 & 𝚂𝚃𝙾𝚁𝙴", rowId: prefix+"pay", description: "𝚁𝙿 𝟺𝟶.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙺𝙷𝚄𝚂𝚄𝚂 𝙹𝚄𝙰𝙻𝙰𝙽", rowId: prefix+"pay", description: "𝚁𝙿 𝟷𝟻.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝚄𝙶 𝙿𝙰𝙺 𝚃𝚉𝚈", rowId: prefix+"pay", description: "𝚁𝙿 𝟹𝟶.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙼𝚄𝙻𝚃𝙸 𝙳𝙴𝚅𝙸𝙲𝙴 ", rowId: prefix+"pay", description: "𝚁𝙿 𝟷𝟶.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝚄𝙶 𝙱𝙴𝙱𝙰𝚂 𝚂𝙿𝙰𝙼 𝙰𝙽𝚃𝙸 𝙱𝙰𝙽𝙽𝙴𝙳", rowId: prefix+"pay", description: "𝚁𝙿 𝟼𝟻.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝚄𝙶 + 𝙲𝚁𝙴𝙰𝚃𝙴 𝚆𝙴𝙱 𝙿𝙷𝙸𝚂𝙸𝙽𝙶", rowId: prefix+"pay", description: "𝚁𝙿 𝟻𝟻.𝟶𝟶𝟶"},
{title: " 🔏𝚂𝙲𝚁𝙸𝙿𝚃 𝙲𝚁𝙴𝙰𝚃𝙴 𝙿𝙰𝙽𝙽𝙴𝙻 + 𝚂𝚃𝙾𝚁𝙴 + 𝙱𝚄𝙶𝙼𝙴𝙽𝚄", rowId: prefix+"pay", description: "𝚁𝙿 𝟾𝟶.𝟶𝟶𝟶"}]},
],
footer: '𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
}
break
case 'adminpanelmurah':
case 'adminpannelmurah':{
jiren = `*Admin Pannel Murah !!*
Vps & Domain wajib Bawa Sendiri 
Keuntungan Sama Kaya Yang Mahal

_*Rp 15k ajaa*_`
m.reply(jiren)
}
break
case 'adminpannel':
case 'adminpanel':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `Keuntungan Jadi Admin Pannel?

- Bisa Create Pannel & Di Jual
- Bisa Jadi Kang Jasa Runn Bot on 24 Jam
- Bisa Jadi Kang Jasa Buat Bot 
- Di Jamin Balik Modal


📌
*FREE EGG*
*FREE SC CREATE PANNEL*
*VPS DARI SAYA*
*DOMAIN DARI SAYA*
*INTINYA TINGGAL PAKE SAJA✅*

GARANSI 15 HARI❗


𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘼𝘿𝘼𝙇𝘼𝙃 𝙇𝙄𝙎𝙏 & 𝙃𝘼𝙍𝙂𝘼 
𝙋𝙀𝙈𝘽𝙐𝘼𝙏𝘼𝙉 𝘼𝘿𝙈𝙄𝙉 𝙋𝘼𝙉𝙉𝙀𝙇⚡`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "LIST & HARGA",
sections: [{title: "LIST & HARGA PEMBUATAN ADMIN PANNEL",
rows: [
{title: " 20 GB", rowId: prefix+"pay", description: "RP 50.000 / BULAN"},
{title: " 40 GB", rowId: prefix+"pay", description: "RP 100.000 / BULAN"},
{title: " 80 GB", rowId: prefix+"pay", description: "RP 150.000 / BULAN"}]},
],
footer: '𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
}
break
case 'jasabot':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `*PEMBUATAN BOT WHATSAPP*
-Bebas Req nama owner
-Bebas Req Nama bot
-Bebas Req Nomor Owner
-Sc Bisa Dariku / Darimu

*Keuntungan?*
- Jika Memakai Script Bug Whatsapp Bisa Membuat Grup Murbug & Bisa Ngasilin Cuan Dari Murbug🔥

- Bisa Menyewakan Bot Kalian Ke Buyer Kalian🔥

- Di Jamin Balik Modal🔥

- Intinya Seperti Saya *PUTRA OFC⚡*

*BAHAN YANG DI PERLUKAN CUMAN*
-Nokos Whatsapp

*PROSES PEMBUATAN BOT*
0 - 30Menit Saja

𝙐𝙉𝙏𝙐𝙆 𝙃𝘼𝙍𝙂𝘼 𝙎𝙄𝙇𝘼𝙃𝙆𝘼𝙉 𝘾𝙇𝙄𝘾𝙆 𝙏𝙊𝙈𝘽𝙊𝙇
𝘿𝙄 𝘽𝘼𝙒𝘼𝙃 𝙄𝙉𝙄 𝙐𝙉𝙏𝙐𝙆 𝙈𝙀𝙉𝘼𝙈𝙋𝙄𝙇𝙆𝘼𝙉 𝙇𝙄𝙎𝙏
𝙃𝘼𝙍𝙂𝘼 𝙅𝘼𝙎𝘼 𝙋𝙀𝙈𝘽𝙐𝘼𝙏𝘼𝙉 𝘽𝙊𝙏 𝙒𝙃𝘼𝙏𝙎𝘼𝙋𝙋❗`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "𝗟𝗜𝗦𝗧 𝗛𝗔𝗥𝗚𝗔",
sections: [{title: "LIST & HARGA",
rows: [
{title: " 1 MINGGU", rowId: prefix+"pay", description: "Rp 10.000"},
{title: " 1 BULAN", rowId: prefix+"pay", description: "Rp 15.000"},
{title: " 2 BULAN", rowId: prefix+"pay", description: "Rp 25.000"},
{title: " 3 BULAN", rowId: prefix+"pay", description: "Rp 30.000"},
{title: " Permanen?", rowId: prefix+"pay", description: "130.000"}]},
],
footer: '𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
}
break
case 'jasarun':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `Keuntungan Beli Jasa Runn Bot?

- Membuat Bot Mu On 24 Jam
- Bot Mu Menjadi Fastrespon & No Delay
- Jika Kamu Off Bot Tetap On

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘼𝘿𝘼𝙇𝘼𝙃 𝙇𝙄𝙎𝙏 & 𝙃𝘼𝙍𝙂𝘼 
𝙅𝘼𝙎𝘼 𝙍𝙐𝙉𝙉 𝘽𝙊𝙏⚡`
putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "LIST & HARGA",
sections: [{title: "LIST & HARGA JASA RUNN BOT",
rows: [
{title: " Runn Bot 7 Hari", rowId: prefix+"pay", description: "Rp 10.000"},
{title: " Runn Bot 30 Hari", rowId: prefix+"pay", description: "Rp 20.000"},
{title: " Runn Bot 60 Hari", rowId: prefix+"pay", description: "Rp 30.000"}]},
],
footer: '𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
}
break
case 'listpannel':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let tampilan_nya = `BERIKUT ADALAH 
LIST PANNEL PUTRA OFC`

putraofc.sendMessage(from,
{text: tampilan_nya,
buttonText: "CLICK HERE",
sections: [{title: "𝙇𝙄𝙎𝙏 𝙋𝘼𝙉𝙉𝙀𝙇 *YASS TZY* ",
rows: [
{title: " 📮 1 GB CPU 30%", rowId: prefix+"payment", description: "Rp 5.000 / Bulan"},
{title: " 📮 2 GB CPU 60%", rowId: prefix+"payment", description: "Rp 10.000 / Bulan"},
{title: " 📮 3 GB CPU 80%", rowId: prefix+"payment", description: "Rp 15.000 / Bulan"},
{title: " 📮 4 GB CPU 110%", rowId: prefix+"payment", description: "Rp 20.000 / Bulan"},
{title: " 📮 5 GB CPU 140%", rowId: prefix+"payment", description: "Rp 25.000 / Bulan"},
{title: " 📮 6 GB CPU 170%", rowId: prefix+"payment", description: "Rp 30.000 / Bulan"},
{title: " 📮 7 GB CPU 180%", rowId: prefix+"payment", description: "Rp 35.000 / Bulan"},
{title: " 📮 8 GB CPU 190%", rowId: prefix+"payment", description: "Rp 40.000 / Bulan"},
{title: " 📮 UNLIMITED RAM & CPU", rowId: prefix+"payment", description: "Rp 45.000 / Bulan"}]},
],
footer: 'yass tzy 𝟸𝟶𝟸𝟹',
mentions:[global.author, sender]})
}
break
case 'k':
case 'kick': {
if (!isCreator) return m.reply(mess.owner)
if (!m.isGroup) throw mess.group
if (!isBotAdmins) return m.reply('Jadiin bot admin dong biar bisa')
if (!isGroupAdmins) return m.reply('Fitur ini khusus admin grup')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await putraofc.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}     
break
case 'linklog':{
if (!isCreator) return
linklog = `*Berikut Adalah Link Login Pannel Kami*
https://putraofc.gilzzxd.live`
m.reply(linklog)
}
break
case 'qr': {
putraofc.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/3e73e748a85a382c1b3a2.jpg' }, caption: `Tinggal Scan Ajaa, Jan Lupa Sertakan Bukti tf y` }, { quoted: m })
}
break
case 'ov': {
ovo = `gada banh
A/N *SUGENG*`
m.reply(ovo)
}
break
case 'dn': {
putraofc.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/f2f26d1a6f62aac43710b.jpg' }, caption: `Tinggal Scan Ajaa, Jan Lupa Sertakan Bukti Transfer.` }, { quoted: m })
}
break
case 'proses':{
if (!isCreator) return 
proses = `「 *TRANSAKSI SEDANG DALAM PROSES* 」

_HARAP TUNGGU 1 - 30 MENIT_
_ADMIN SEDANG MEMPROSES TRANSAKSI MU😇_

*SPAM? TELPON? BLOCK❗*

*_${hariini}_*`
let btn_menu = [
{buttonId: `ahay2`, buttonText: { displayText: 'OKE SAYA TUNGGU' }, type: 1 },
]
putraofc.sendMessage(from,
{text: `${proses}`,
buttons: btn_menu})
}
break
case "create":{
let create = `
╭─❏ 『 𝙊𝙒𝙉𝙀𝙍 𝙈𝙀𝙉𝙐 』
║⎙─➤ addusr
║⎙─➤ delusr
║⎙─➤ listusr
║⎙─➤ detusr
║⎙─➤ delsrv
║⎙─➤ listsrv
║⎙─➤ detsrv
┗⬣`
m.reply(create)
}
break
case 'h':
case 'hidetag': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
putraofc.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
            }
            break
case "listusr": {
if (!isCreator) return m.reply(mess.owner)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let users = res.data
let sections = []
for (let user of users) {
let u = user.attributes
let obj = {
title: "-- PANEL",
rows: [
{ title: `${u.id}. ${u.username}`, rowId: `${prefix}detusr ` + u.id, description: u.first_name + ' ' + u.last_name },
]
}
await sections.push(obj)
if (sections.length === 50) {
sections.push({
title: "-- PANEL",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 2`, description: 'Page 2' },
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 3`, description: 'Page 3' },
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 4`, description: 'Page 4' },
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 5`, description: 'Page 5' },
]
})
}
}
await putraofc.sendMessage(m.chat, {
text: "Berikut list user *PANEL*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*PANEL*",
buttonText: `${res.meta.pagination.count} Users`,
sections
},{ quoted : m })
}
  
break
case "delusr": {

if (!isCreator) return m.reply(mess.owner)
let usr = args[0]
if (!usr) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*USER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE USER*')
}
break
case "detusr": {
if (!isCreator) return m.reply(`*Lu Siape? Fitur Ini Khusus Owner Gw!*`)
let usr = args[0]
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json()
if (res.errors) return m.reply('*USER NOT FOUND*')
let u = res.attributes
m.reply(`*${u.username.toUpperCase()} USER DETAILS*

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``)
}
break
case "listsrv": {
if (!isCreator) return m.reply(mess.owner)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let servers = res.data
let sections = []
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let obj = {
title: "-- PANEL VIP --",
rows: [
{ title: `${s.id}. ${s.name}`, rowId: `${prefix}detsrv ` + s.id, description: `Status: ${data.attributes ? data.attributes.current_state : s.status}` },
]
}
await sections.push(obj)
if (sections.length >= 50 && res.meta.pagination.links.next) {
sections.push({
title: "-- PANEL VIP --",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 2`, description: 'Page 2' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 3`, description: 'Page 3' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 4`, description: 'Page 4' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 5`, description: 'Page 5' },
]
})
}
}
await putraofc.sendMessage(m.chat, {
text: "Berikut list server *PANEL VIP*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*PANEL VIP*",
buttonText: `${res.meta.pagination.count} Servers`,
sections
}, { quoted: m })
}
break


 case "addusr": {
if (!isCreator) return m.reply(mess.owner)
let t = text.split(',');
if (t.length < 3) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await putraofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let tks = `
╭─❏ *『 USER INFO 』*
║⎙─➤ *ID* : ${user.id}
║⎙─➤ *USERNAME* : ${user.username}
║⎙─➤ *EMAIL* : ${user.email}
║⎙─➤ *NAME* : ${user.first_name} ${user.last_name}
║⎙─➤ *CREATED AT* :  ${hariini}
┗⬣ *PASSWORD BERHASIL DI KIRIM KE @${u.split`@`[0]}*`

const sections = [
    {
        title: `𝙎𝙀𝙍𝙑𝙀𝙍 𝙋𝙐𝙏𝙍𝘼 𝙊𝙁𝘾`,
                rows: [
                {title: `RAM 1 CPU 30%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,1000/1000,30`,description: "📌Create Server Ram 1 Cpu 30%"},
                {title: `RAM 2 CPU 60%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,2000/2000,60`,description: "📌Create Server Ram 2 Cpu 60%"},
                {title: `RAM 3 CPU 80%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,3000/3000,80`,description: "📌Create Server Ram 3 Cpu 80%"},    
                {title: `RAM 4 CPU 110%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,4000/4000,110`,description: "📌Create Server Ram 4 Cpu 110%"},   
                {title: `RAM 5 CPU 140%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,5000/5000,140`,description: "📌Create Server Ram 5 Cpu 140%"},    
                {title: `RAM 6 CPU 170%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,6000/6000,170`,description: "📌Create Server Ram 6 Cpu 170%"},   
                {title: `RAM 7 CPU 180%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,7000/7000,180`,description: "📌Create Server Ram 7 Cpu 180%"},   
                {title: `RAM 8 CPU 190%✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,8000/8000,190`,description: "📌Create Server Ram 8 Cpu 190%"},    
                {title: `RAM & CPU UNLIMITED ✅`, rowId: `${prefix}addsrv ${user.first_name},bukti tf yg tadi buy pannel jan sampe ilang,${user.id},15,1,0/0,0`,description: "📌Create Server Ram & Cpu Unlimited"},   
                                             
]}]

    const listMessage = {
        text: tks,
        footer: "𝙿𝚄𝚃𝚁𝙰 𝙾𝙵𝙲 𝟸𝟶𝟸𝟹",
        title: "*SUCCESSFULLY ADD USER*",
        buttonText: "Click Here!",
        sections
    }
	
    await putraofc.sendMessage(m.chat, listMessage)
    await putraofc.sendMessage(u, {
        text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
╭─❏ *『 USER INFO 』*
║⎙─➤ *📧EMAIL* : ${email}
║⎙─➤ *👤USERNAME* : ${username}
║⎙─➤ *🔐PASSWORD* : ${password.toString()}
║⎙─➤ *🌐LOGIN* : ${domain}
║⎙─➤ *🛠️TUTORIAL* : youtu.be/OVt5a_5POgM
┗⬣

_📍NOTE : SIMPAN BAIK² AKUN PANNEL INI, KARNA SAYA PUTRA SULSEL TIDAK AKAN MENGIRIMKAN AKUN PANNEL UNTUK KEDUA KALINYA !!_
`,

    })
}
break
case "addsrv": {

if (!isCreator) return m.reply(mess.owner)
let s = text.split(',');
if (s.length < 7) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
m.reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
break
case "delsrv": {

if (!isCreator) return m.reply(mess.owner)
let srv = args[0]
if (!srv) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*SERVER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break
case "detsrv": {

let srv = args[0]
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
if (res.errors) return m.reply('*SERVER NOT FOUND*')
let s = res.attributes
let f2 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f2.json();
let t = data.attributes
m.reply(`*${s.name.toUpperCase()} SERVER DETAILS*

STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'Unlimited' : s.limits.memory + 'MB'}
DISK: ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'Unlimited' : s.limits.disk + 'MB'}
CPU: ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'Unlimited' : s.limits.cpu + '%'}
CREATED AT: ${s.created_at}`)
}
break
case 'play': case 'ytplay': {
if (!text) throw `Example : ${prefix + command} story wa anime`
let yts = require("yt-search")
let search = await yts(text)
let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
let buttons = [
{buttonId: `ytmp3 ${anu.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
{buttonId: `ytmp4 ${anu.url}`, buttonText: {displayText: '► Video'}, type: 1}
]
let buttonMessage = {
image: { url: anu.thumbnail },
caption: `
あ Title : ${anu.title}
あ Ext : Search
あ Id : ${anu.videoId}
🪀 Duration : ${anu.timestamp}
あ Viewers : ${anu.views}
あ Upload At : ${anu.ago}
あ Author : ${anu.author.name}
あ Channel : ${anu.author.url}
あ Description : ${anu.description}
あ Url : ${anu.url}`,
footer: putraofc.user.name,
buttons: buttons,
headerType: 4
}
putraofc.sendMessage(m.chat, buttonMessage, { quoted: m })
}
break
case 'ytmp4': case 'mp4':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp4(text)
}
break
case 'ytmp3': case 'mp3':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp3(text)
}
break
case "setppbot": {
if (!isCreator) return m.reply(mess.owner)
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await putraofc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await putraofc.query({
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
fs.unlinkSync(medis)
m.reply(`Sukses`)
} else {
var memeg = await putraofc.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
m.reply(`Sukses`)
}
}
break
//━━━━━━━━━━━━━━━[ BATAS MENU ]━━━━━━━━━━━━━━━━━//

default:
}
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(mess.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})