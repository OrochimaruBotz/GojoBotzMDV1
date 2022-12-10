import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

  
 const ini = await conn.sendContactArray(m.chat, [
    [`${nomorown1}`, `${await conn.getName(nomorown1+'@s.whatsapp.net')}`, `👑 Developer Bot `, `🚫 Don't call me 🥺`, `⁨humanzofficial@gmail.com`, `🇮🇩 Indonesia`, `🚀 https://youtube.com/channel/UC6GPl9xMWL61NAXQb3HBrRw`, `nothing`],
    [`${nomorown2}`, `${await conn.getName(nomorown2+'@s.whatsapp.net')}`, `👑 Creator Bot `, `🚫 Don't call me 🥺`, `⁨humanzofficial@gmail.com`, `🇮🇩 Indonesia`, `🚀 https://youtube.com/channel/UC6GPl9xMWL61NAXQb3HBrRw`, `nothing`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🔥 Bot WhatsApp 🐣`, `📵 Don't spam/call me 😢`, `Nothing`, `🇮🇩 Indonesia`, `🚀 https://chat.whatsapp.com/I0prmYcZhKrCye0kiclzyt`, `🤖 Dont Forget To Donate!`]
  ], fkontak)
  await conn.send2ButtonDoc(m.chat, `Halo kak @${m.sender.split(`@`)[0]} itu nomor owner ku, jangan call/spam yah kak(｡・//ε//・｡)`, wm, 'Menu', '.menu', 'Donasi', '.donasi', ini, { contextInfo: { forwardingScore: fsizedoc, externalAdReply: { body: 'Tes', containsAutoReply: true, mediaType: 1, mediaUrl: hwaifu.getRandom(),  renderLargerThumbnail: true, showAdAttribution: true, sourceId: 'Tes', sourceType: 'PDF', previewType: 'PDF', sourceUrl: sgc, thumbnail: fs.readFileSync('./thumbnail.jpg'), thumbnailUrl: sgc, title: wm}}})
  }
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|pengembang|creator)$/i

export default handler
