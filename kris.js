/*Pembuat Script
- KrisBotz
==========
Credit Jangan Di Hapus Hargai Pembuat
==========

Ubah Daftar Harga Sesuai Ke Untungan Anda*/

require('./Pengaturan/Admin/settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")
const axios = require('axios')
const FileType = require('file-type')
const fetch = require('node-fetch')
const crypto = require('crypto')
const fs = require('fs')
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');

const util = require('util')
const chalk = require('chalk')
const short = require('short-uuid');
const moment = require('moment-timezone');
const md5 = require('md5');
const { clockString, tanggal, getTime, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat, reSize, generateProfilePicture } = require('./Pengaturan/function/myfunc')
const level_prem = JSON.parse(fs.readFileSync('./Pengaturan/database/premium.json'))
const afk = require('./Pengaturan/function/afk');
const _afk = JSON.parse(fs.readFileSync('./Pengaturan/database/afk.json'));
const ban = JSON.parse(fs.readFileSync('./Pengaturan/database/banned.json'));
const isBanned = JSON.parse(fs.readFileSync('./Pengaturan/database/banned.json'));
const antilink = JSON.parse(fs.readFileSync('./Pengaturan/database/antilink.json'));

const db_respon_list = JSON.parse(fs.readFileSync('./Pengaturan/database/db_list.json'));
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./Pengaturan/function/function_list');
const { getProduk } = require('./Pengaturan/function/getpro')
const { color, bgcolor } = require('./Pengaturan/function/color')

global.tanggalserver = `${moment.tz('Asia/Jakarta').format('DD/MM/YY')}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`; 

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })


global.keytri = ' '//apikey
    global.privateKey = ' ' //private key
 global.merchantcode = ' '

global.db = JSON.parse(fs.readFileSync('./Pengaturan/database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
...(global.db || {})
}

//━━━━━━━━━━━━━━━[ PREFIX ]━━━━━━━━━━━━━━━━━//

module.exports = kris = async (kris, m, chatUpdate, store) => {
try {
        const gakbisaowner = `${owner}@s.whatsapp.net`
        const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        const budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const { type, quotedMsg, mentioned, now, fromMe } = m
        const isCmd = body.startsWith(prefix)
        const from = m.key.remoteJid
        const isBanned = ban.includes(m.sender)  
        const pushname = m.pushName || "No Name"
        const botNumber = await kris.decodeJid(kris.user.id)
         
         const groupMetadata = m.isGroup ? await kris.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
         
         const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const groupMembers = m.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
         
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const qmsg = (quoted.msg || quoted)
        const mime = (quoted.msg || quoted).mimetype || ''
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
        const tanggal = moment().tz("Asia/Jakarta").format("ll")
		const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const tanggal3 = moment().tz('Asia/Jakarta').locale('id').format('dddd, D MMMM YYYY');
		const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z')
		   const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')    
            
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const isOwner = [`${owner}@s.whatsapp.net`] == sender ? true : ["6285786211623@s.whatsapp.net"].includes(sender) ? true : false
        const isLevel = level_prem.includes(sender)
        const senderNumber = sender.split('@')[0]   
        const arg = budy.trim().substring(budy.indexOf(" ") + 1);
        const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);	       
try {

ppnyaimg = await kris.sendMessage(m.sender, 'image')
} catch (err) {
ppnyaimg = 'https://telegra.ph/file/558480616af8c2f9efa9f.jpg'
}
ppnyaimg = await reSize(ppnyaimg, 300, 300)

if (!kris.public) {
if (!m.key.fromMe) return
}
const reply = (teks) => {kris.sendMessage(from, { text: teks }, { quoted: m })}
    
var mdu = ['red','green','yellow','blue','magenta','cyan','white']
var halalu = mdu[Math.floor(Math.random() * mdu.length)]
var mdo = ['red','green','yellow','blue','magenta','cyan','white']
var halalo = mdo[Math.floor(Math.random() * mdo.length)]
var mdi = ['red','green','yellow','blue','magenta','cyan','white']
var halali = mdi[Math.floor(Math.random() * mdi.length)]
var mda = ['red','green','yellow','blue','magenta','cyan','white']
var halala = mda[Math.floor(Math.random() * mda.length)]
var mde = ['red','green','yellow','blue','magenta','cyan','white']
var halale = mde[Math.floor(Math.random() * mde.length)]

if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(' 𝙺𝚛𝚒𝚜𝙱𝚘𝚝𝚣 '), color(`[ PESAN MASUK ]`, `${halalu}`), color(`FROM`, `${halalo}`), color(`${pushname}`, `${halali}`), color(`Text :`, `${halala}`), color(`${body}`, `${halale}`))
}
    
    
    
async function sendkrisMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await kris.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

let rn = ['recording','composing']
let jd = rn[Math.floor(Math.random() * rn.length)];

if (command) {
kris.sendPresenceUpdate(jd, from)
kris.readMessages([m.key])
}
function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function acakindong(min, max = null) {
  if (max !== null) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
  return Math.floor(Math.random() * min) + 1
  }
}

const isAntiLink = m.isGroup ? antilink.includes(from) : false
if (m.isGroup && isAntiLink && !isOwner && !isAdmins && isBotAdmins){
            if (chath.includes(`https://chat.whatsapp.com`)) {
                await kris.sendMessage(from, { delete: m.key })
                reply(`🛡 *GROUP LINK DETECTOR* 🛡\n\nBudayakan baca Deskribsi mas, mari saling menghargai`)
                let number = sender
kris.groupParticipantsUpdate(from, [number], "remove")
            }
    }
    
// Addlist
if (!isCmd && m.isGroup && isAlreadyResponList(from, chath, db_respon_list)) {
      var get_data_respon = getDataResponList(from, chath, db_respon_list)
      if (get_data_respon.isImage === false) {
      kris.sendMessage(from, { text: sendResponList(from, chath, db_respon_list) }, { quoted: m })
    } else {
      kris.sendMessage(m.chat, { caption: get_data_respon.response, image: { url: get_data_respon.image_url }, mentions: [m.sender] });
    }
}

function toRupiah(angka) {
  var angkaStr = angka.toString();
  var angkaTanpaKoma = angkaStr.split('.')[0];
  var angkaRev = angkaTanpaKoma.toString().split('').reverse().join('');
  var rupiah = '';
for (var i = 0; i < angkaRev.length; i++) {
if (i % 3 == 0) rupiah += angkaRev.substr(i, 3) + '.';
}
return '' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

var schedule = {
  fajr: {
    hour: 5,
    minute: 0
  },
  dhuhr: {
    hour: 12,
    minute: 0
  },
  asr: {
    hour: 15,
    minute: 0
  },
  maghrib: {
    hour: 18,
    minute: 0
  },
  isha: {
    hour: 19,
    minute: 0
  }
}
  //Fungsi untuk mengirim notifikasi
function sendNotification(schedule) {
  //Kode untuk mengirim notifikasi
  console.log("Notifikasi berhasil dikirim sesuai jadwal: " + schedule)    
    }
const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return kris.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    const byte = randomBytes[i] % chars.length;
    result += chars.charAt(byte);
  }

  return result.toLowerCase();
}

    const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? kris.sendMessage(from, {text: teks.trim(), jpegThumbnail: global.krismenu}, text, { sendEphemeral: true, contextInfo: { mentions: memberr } }) : kris.sendMessage(from, {text: teks.trim(), jpegThumbnail: global.krismenu}, text, { sendEphemeral: true, quoted: m, contextInfo: { mentions: memberr } })
}
    
const randomString = generateRandomString(5);


function boolToString(value) {
  return value ? 'iyah' : 'tidak';
}



const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}


const fetchJson = async (url, options) => {
  try {
      options ? options : {}
      const res = await axios({
          method: 'GET',
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          },
          ...options
      })
      return res.data
  } catch (err) {
      return err
  }
}

function toLvl(input) {
  if (typeof input === 'number') {
    return (input / 100) + 1;
  } else if (typeof input === 'string') {
    const inputNumber = parseFloat(input.replace(',', '.'));
    if (!isNaN(inputNumber)) {
      return (inputNumber / 100) + 1;
    }
  }
  return "Masukan tidak valid";
}

const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: 'kris Bot',
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: 'Creator kris'
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
      
var list_produk = JSON.parse(fs.readFileSync('./Pengaturan/database/datadigiflaz.json'))
     
var user = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'))
const profitt = JSON.parse(fs.readFileSync("./Pengaturan/database/profit.json"));
const profit = profitt.profit;
const point = profitt.profit;    
const cek = (satu, dua) => { 
let x1 = false
Object.keys(user).forEach((i) => {
if (user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return user[x1].id }
if (satu == "layanan"){ return user[x1].layanan }
if (satu == "saldo"){ return user[x1].saldo }
if (satu == "harga"){ return user[x1].harga }
if (satu == "tujuan"){ return user[x1].tujuan }
if (satu == "reff"){ return user[x1].reff }
if (satu == "deposit"){ return user[x1].deposit }
if (satu == "reff_deposit"){ return user[x1].reff_deposit }
if (satu == "desc"){ return user[x1].desc }
if (satu == "status"){ return user[x1].status }    
if (satu == "kode_layanan"){ return user[x1].kode_layanan }
if (satu == "level"){ return user[x1].level }
if (satu == "username"){ return user[x1].username }
if (satu == "email"){ return user[x1].email }
if (satu == "status_deposit"){ return user[x1].status_deposit}
}
if (x1 == false) { return null } 
}
let sett = (satu, dua, tiga) => { 
Object.keys(user).forEach((i) => {
if (user[i].id == dua){
if (satu == "+saldo")
{ user[i].saldo += tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "-saldo"){
user[i].saldo -= tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "harga"){ user[i].harga = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))} 
 if (satu == "status"){ user[i].status = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "layanan"){ user[i].layanan = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "tujuan"){ user[i].tujuan = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "desc"){ user[i].desc = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "kode_layanan"){ user[i].kode_layanan = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "reff"){ user[i].reff = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "deposit"){ user[i].deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "reff_deposit"){ user[i].reff_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "level"){ user[i].level = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "username"){ user[i].username = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "email"){ user[i].email = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "status_deposit"){ user[i].status_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
}})
}

const daftarr = (nama, email) => {
if(cek("id", m.sender) == null){
user.push({id: m.sender, username: "", email: "", saldo:0, point:0,level: "member", layanan:"", harga:0, tujuan:"", kode_layanan: "", desc: "", reff: "", status: true, deposit: 0, reff_deposit: "", status_deposit: true})
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))
sett("username", m.sender, nama) 
sett("email", m.sender, email) 
let te = `_Selamat, Kamu sudah terdaftar sebagai member,_
*berikut adalah data akun kamu:*

_Nama Pengguna: ${nama}_
_Nama: ${email}_ 
_No. HP: ${sender.split("@")[0]}_
_Level : ${cek("level", m.sender)}_

Untuk Melihat List Produk Silahkan Ketik Salah Satu Dibawah Ini:
Menu
Store
.menu
.store

_Terimakasih.._`
kris.sendMessage(m.chat, {text: `${te}`},{quoted: m})
 let objj = []
fs.writeFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`, JSON.stringify(objj))  
let objja = []
fs.writeFileSync(`./Pengaturan/database/riwayat/deposit/${m.sender}.json`, JSON.stringify(objja)) 
}
}




    

function getList(kategori, brand, type) {
let tek = `「 *${toko}* 」\n_➖ LAYANAN ${brand.toUpperCase()} ➖_\n`;
list_produk.forEach(function(product) {
list_produk.sort((a, b) => a.price - b.price);
if (product.category === kategori) {
if (product.brand === brand) {
if (product.type === type) {
const status = product.seller_product_status;
const seller = status ? '✅' : '⛔';  

const harga = isLevel ? product.price * profit.premium : product.price * profit.member;   
   tek += `
${seller}${product.buyer_sku_code.replace("", "")} ( ${product.product_name} ) =
${formatmoney(harga)}`;
    }}
}});

let listProduct21 = `🛒 Cara Pembelian: Hubungi admin atau ketik : caratopup
 
🖥 Nama Bot: ${server}
☎️ Tlpn/WA: ${owner}
🔰 Telegram: ${telegram}
🔰 Channel Telegram: ${channel}\n\n_${toko}_`;
reply(`${tek}\n\n${listProduct21}`) 
}

function getPaket(kategori, brand) {
let tek = `「 *${toko}* 」\n_➖ LAYANAN ${brand.toUpperCase()} ➖_\n`;
list_produk.forEach(function(product) {
list_produk.sort((a, b) => a.price - b.price);
if (product.category === kategori) {
if (product.brand === brand) {
const status = product.seller_product_status;
const seller = status ? '✅' : '⛔';  

const harga = isLevel ? product.price * profit.premium : product.price * profit.member;   
   tek += `
${seller}${product.buyer_sku_code.replace("", "")} ( ${product.product_name} ) =
${formatmoney(harga)}`;
    }}
});

let listProduct21 = `🛒 Cara Pembelian: Hubungi admin atau ketik : caratopup
 
🖥 Nama Bot: ${server}
☎️ Tlpn/WA: ${owner}
🔰 Telegram: ${telegram}
🔰 Channel Telegram: ${channel}\n\n_${toko}_`;
reply(`${tek}\n\n${listProduct21}`) 
}

function order(produk, tujuan, refferensi) {
for(let i of list_produk){
if(i.buyer_sku_code == produk){ 
const har = isLevel ? i.price * profit.premium : i.price * profit.member;    


if(har > cek("saldo", m.sender)) return reply(`Maaf,saldo kamu tidak cukup untuk membeli produk itu Silahkan Deposit Terlebih Dahulu.`)

let nama_produkk = i.product_name
descc = i.desc
sett("harga", m.sender, har)
sett("layanan", m.sender, nama_produkk)
sett("status", m.sender, false)
sett("tujuan", m.sender, tujuan)
sett("kode_layanan", m.sender, produk)
sett("desc", m.sender, descc)
sett("reff", m.sender, refferensi)
}
}
const ha = cek("harga", m.sender) 
const sa = cek("saldo", m.sender) 
let an = `_🛍️ORDER CONFIRMATION_

_››  ID Produk :_ ${cek("kode_layanan", m.sender)}
_››  Layanan :_ ${cek("layanan", m.sender)}
_››  Penerima :_ ${cek("tujuan", m.sender)}
_››  Total :_ ${formatmoney(ha)}
_››  Saldo Anda :_ ${formatmoney(sa)}
_››  Note :_ ${cek("desc", m.sender)}

Ketik *${prefix}yes* untuk Melanjutkan Transaksi
Ketik *${prefix}batal* untuk Membatalkan pesanan`
if(cek("layanan", m.sender) == "") return reply(`Maaf kak,produk *${produk}* tidak ditemukan\nSilahkan liat kode produk di *${prefix}Store*`)
m.reply(an)
 var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
}  
}


if (command) {
kris.sendPresenceUpdate(jd, from)
kris.readMessages([m.key])
}

//FITUR CASE BY KRIS
switch (command) {
 case 'bijak':{
var tt_res = await fetchJson(`https://nodejs-restapi--anjayawet.repl.co/api/bijak?apikey=djEYDC4d`)
reply(`*Kata Bijak*

_${tt_res.result}_`)
}
break      
case 'motivasi':{

var tt_resa = await fetchJson(`https://nodejs-restapi--anjayawet.repl.co/api/motivasi?apikey=djEYDC4d`)

reply(`*Motivasi*

_${tt_resa.result}_`)

}

break        
case 'quotes':{

var tt_res = await fetchJson(`https://nodejs-restapi--anjayawet.repl.co/api/quotes?apikey=djEYDC4d`)

reply(`*Quotes*

_${tt_res.quotes} #${tt_res.author}_`)

}

break        
case 'updateprofit': {
  if (!isOwner) return;
const p = q.split(' ');
const data = JSON.parse(fs.readFileSync("./Pengaturan/database/profit.json"));

if (p[0] === 'member' || p[0] === 'premium') {
  const newValue = toLvl(p[1]);
  if (isNaN(newValue)) {
    return reply('Harap masukkan angka yang valid.');
  }
  data.profit[p[0]] = newValue;
  data.output[p[0]] = p[1] +'%'
  fs.writeFileSync("./Pengaturan/database/profit.json", JSON.stringify(data, null, 2));
  reply(`Profit untuk tipe pengguna "${p[0]}" berhasil diupdate menjadi ${q}%.`);
} else {
  reply('Tipe pengguna tidak valid. Gunakan salah satu dari "dev", "gold", "silver", atau "user".\n\nContoh Penggunaan\n.updateprofit user 10(yaitu keuntungan 10%)');
}
}
break;
 case 'profile':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
const trx = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))      
const depo = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/deposit/${m.sender}.json`))      
var sodo = `${cek("saldo", m.sender)}`
var prof = `
      *PROFILE ANDA*
 
_Username :_ ${cek("username", m.sender)}
_Saldo :_ ${formatmoney(sodo)}
_Level :_ ${cek("level", m.sender)}
_Nama :_ ${cek("email", m.sender)}
_Phone :_ ${sender.split("@")[0]}
_Total Trx :_ *${trx.length}*
_Total Deposit :_ *${depo.length}*
`
reply(prof) 
}
break      
case 'bataldepo':{
if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
if(cek("status_deposit", m.sender) == true) return reply(`Maaf,tidak ada orderan yang sedang kaka proses.`)
reply(`Deposit Dengan ID: ${cek("reff_deposit", m.sender)} berhasi di batalkan`) 
sett("deposit", m.sender, 0) 
sett("reff_deposit", m.sender, "")  
sett("status_deposit", m.sender, true)  
}
break
case 'batal':{
if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
if(cek("status", m.sender) == true) return reply(`Maaf,tidak ada orderan yang sedang kaka proses.`)
sett("status", m.sender, true)
sett("layanan", m.sender, "")
sett("harga", m.sender, 0)
sett("tujuan", m.sender, "")  
sett("desc", m.sender, "")  
sett("reff", m.sender, "") 
sett("kode_layanan", m.sender, "")  

function pickrandom() {
  var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var symbolLength = symbols.length;
  var randomString = '';
  for (var i = 0; i < 6; i++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  randomString += '';
  for (var j = 0; j < 4; j++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  return randomString;
}
let kode = pickrandom()
let echa = `🗯️ SUKSES MEMBATALKAN PESANAN DENGAN ID TRANSAKSI :
_${kode}_`
m.reply(echa)
}
break                
case 'tambah': {
  const [num_one, num_two] = text.split(' ').map(Number);

  if (!num_one || !num_two) {
    return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
  }

  const result = num_one + num_two;
  reply(`Hasilnya adalah *${result}*`);
break;
}
case 'kurang': {
  const [num_one, num_two] = text.split(' ').map(Number);

  if (!num_one || !num_two) {
    return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
  }

  const result = num_one - num_two;
  reply(`Hasilnya adalah *${result}*`);
break;
}   
case 'kali': {
  const [num_one, num_two] = text.split(' ').map(Number);

  if (!num_one || !num_two) {
    return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
  }

  const result = num_one * num_two;
  reply(`Hasilnya adalah *${result}*`);
break;
}
case 'bagi': {
  const [num_one, num_two] = text.split(' ').map(Number);

  if (!num_one || !num_two) {
    return reply(`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`);
  }

  const result = num_one / num_two;
  reply(`Hasilnya adalah *${result}*`);
break;
}
case 'setprem': {
if (!isOwner) return reply(mess.owner)

var no_prem = text.split(" ")[0]
if (!no_prem) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} no`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await kris.onWhatsApp(prrkek)
if(cek("level", prrkek) == "premium") return reply(`Akun Tersebut Sudah Level Premium Jika Anda Inggin Mengubahnya ke level member silahkan ketik #setmember`)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
level_prem.push(prrkek)
fs.writeFileSync('./Pengaturan/database/premium.json', JSON.stringify(level_prem))
sett("level", prrkek, "premium") 
reply(`Nomor ${prrkek} Menjadi Level Premium!`)
var prm = `Halo Kak ${cek("username", no_prem + "@s.whatsapp.net")} Level Akun Anda Sekarang *Premium*`
kris.sendMessage(no_prem + "@s.whatsapp.net", {text:prm}) 
}
break        

case 'topup':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
if (cek("status", m.sender) == false) return reply(`Maaf Tidak bisa melanjutkan karena sebelumnya sudah ada transaksi silahkan di batalkan dulu jika ingin trx ulang dengan cara ketik #batal`) 
let sal = `
`
if(!text) return reply(sal)
let refferensi = short.generate()
let produk = text.split(" ")[0]
let tujuan = text.split(" ")[1]
order(produk, tujuan, refferensi, )
}
break

        case 'menu':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)        
const trx = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))      
const depo = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/deposit/${m.sender}.json`))     
var jan = cek("saldo", m.sender)
var men = `Halo ${cek("username", m.sender)}

═══▣ ${toko} ▣═══
   ━━━━━━━━━━━━━━━━

╭─❒ 「 User Info 」 
├  Username : ${cek("username", m.sender)}
├  Level    : *${cek("level", m.sender)}*
├  Saldo   : ${formatmoney(jan)}
├  Total Transaksi : *${trx.length}*
├  Total Deposit : *${depo.length}*
✪═════════════════✪

Silahkan Ketik Salah Satu Command Dibawah Ini:
≫ Store ( Menampilkan Menu Produk dan Harga )
≫ Profile ( Mengecek Profil Anda )
≫ Deposit ( Deposit Manual )
≫ Listdeposit ( Riwayat Deposit )
≫ Listtrx ( Riwayat Transaksi )
≫ Lainnya

_${toko}_`
 
        reply(men) 
            }
        break
case 'store': case 'topupmenu':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)    
const trx = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))
var slo = cek("saldo", m.sender)
var sto = `Halo ${cek("username", m.sender)}

❍ Saldo : ${formatmoney(slo)}
❍ Role : ${cek("level", m.sender)}
❍ Total Pesanan : ${trx.length}
-----------------------------------
Silahkan pilih Menu yang kak *${cek("username", m.sender)}* inginkan, hanya ketik pilihan topup yang telah disediakan ( yang ddidalam tanda kurung tidak perlu diketik )
-----------------------------------
Silahkan Ketik	:

❍ Topupgames ( Kategori Games ) 
❍ Tokpln ( Kategori Token PLN ) 
❍ Hargapulsa ( Kategori Pulsa ) 
❍ Hargakuota ( Kategori Paket data ) 

_${toko}_
`
reply(sto) 
}
break
case 'topupgames':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)    
const trx = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))
var slo = cek("saldo", m.sender)
var sto = `Halo ${cek("username", m.sender)}

❍ Saldo : ${formatmoney(slo)}
❍ Role : ${cek("level", m.sender)}
❍ Total Pesanan : ${trx.length}
-----------------------------------
Silahkan pilih Menu yang kak *${cek("username", m.sender)}* inginkan, hanya ketik pilihan topup yang telah disediakan ( yang ddidalam tanda kurung tidak perlu diketik )
-----------------------------------
Silahkan Ketik	:

❍ ML ( Mobile Legends ) 
❍ MLWP ( Mobile Legends WDP )
❍ HOK ( Honor of Kings )
❍ HOKWC ( Honor of Kings WC )
❍ PUBGM ( Pubg Mobile ) 
❍ GI ( Genshin Impact ) 
❍ HSR ( Honkai Star Rail )
❍ Valorant ( Valorant ) 
❍ PB ( Point Blank )
❍ FFM ( Free Fire Max )
❍ FFMM ( Free Fire Max Membership )
❍ FF ( Free Fire ) 
❍ CODM ( Call Of Duty Mobile ) 

_${toko}_
`
reply(sto)
}
break
case 'hargakuota':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)    
const trx = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))
var slo = cek("saldo", m.sender)
var sto = `Halo ${cek("username", m.sender)}

❍ Saldo : ${formatmoney(slo)}
❍ Role : ${cek("level", m.sender)}
❍ Total Pesanan : ${trx.length}
-----------------------------------
Silahkan pilih Menu yang kak *${cek("username", m.sender)}* inginkan, hanya ketik pilihan topup yang telah disediakan ( yang ddidalam tanda kurung tidak perlu diketik )
-----------------------------------
Silahkan Ketik	:

❍ Paketind ( Indosat ) 
❍ Paketsmr ( Smartfren ) 
❍ Paketaxis ( Axis ) 
❍ Paketxl ( XL ) 
❍ Pakettri ( Tri ) 
❍ Paketbyu ( B.yu ) 
❍ Pakettsel ( Telkomsel ) 
_${toko}_
`
reply(sto) 
}
break
case 'hargapulsa':{
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)    
const trx = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))
var slo = cek("saldo", m.sender)
var sto = `Halo ${cek("username", m.sender)}

❍ Saldo : ${formatmoney(slo)}
❍ Role : ${cek("level", m.sender)}
❍ Total Pesanan : ${trx.length}
-----------------------------------
Silahkan pilih Menu yang kak *${cek("username", m.sender)}* inginkan, hanya ketik pilihan topup yang telah disediakan ( yang ddidalam tanda kurung tidak perlu diketik )
-----------------------------------
Silahkan Ketik	:

❍ Pulsaind ( Indosat ) 
❍ Pulsasmr ( Smartfren ) 
❍ Pulsaaxis ( Axis ) 
❍ Pulsaxl ( XL ) 
❍ Pulsatri ( Tri ) 
❍ Pulsabyu ( B.yu ) 
❍ Pulsatsel ( Telkomsel ) 
_${toko}_
`
reply(sto) 
}
break
case 'tokpln': {
  const kategori = 'PLN'
  const brand = 'PLN'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break  
case 'ff': {
  const kategori = 'Games'
  const brand = 'FREE FIRE'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'gi': {
  const kategori = 'Games'
  const brand = 'Genshin Impact'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break  
case 'codm': {
  const kategori = 'Games'
  const brand = 'Call of Duty MOBILE'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break  
case 'valorant': {
  const kategori = 'Games'
  const brand = 'Valorant'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break  
case 'pubgm': {
  const kategori = 'Games'
  const brand = 'PUBG MOBILE'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'ml': {
  const kategori = 'Games'
  const brand = 'MOBILE LEGENDS'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break  
case 'mlwp': {
  const kategori = 'Games'
  const brand = 'MOBILE LEGENDS'
  const type = 'Membership'
getList(kategori, brand, type, )
}
break       
case 'pb': {
  const kategori = 'Games'
  const brand = 'POINT BLANK'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'hsr': {
  const kategori = 'Games'
  const brand = 'Honkai Star Rail'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'hok': {
  const kategori = 'Games'
  const brand = 'Honor of Kings'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'hokwc': {
  const kategori = 'Games'
  const brand = 'Honor of Kings'
  const type = 'Membership'
getList(kategori, brand, type, )
}
break       
case 'ffm': {
  const kategori = 'Games'
  const brand = 'Free Fire Max'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'ffmm': {
  const kategori = 'Games'
  const brand = 'Free Fire Max'
  const type = 'Membership'
getList(kategori, brand, type, )
}
break  
case 'pulsaind': {
  const kategori = 'Pulsa'
  const brand = 'INDOSAT'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break       
case 'pulsatsel': {
  const kategori = 'Pulsa'
  const brand = 'TELKOMSEL'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break         
case 'pulsaxl': {
  const kategori = 'Pulsa'
  const brand = 'XL'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break         
case 'pulsasmr': {
  const kategori = 'Pulsa'
  const brand = 'SMARTFREN'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break         
case 'pulsaaxis': {
  const kategori = 'Pulsa'
  const brand = 'AXIS'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break         
case 'pulsabyu': {
  const kategori = 'Pulsa'
  const brand = 'B.yu'
  const type = 'Umum'
getList(kategori, brand, type, )
}
break         
case 'pascabayar': {
  const kategori = 'Pascabayar'
  const brand = 'PLN PASCABAYAR'
getPaket(kategori, brand, )
}
break       
case 'paketind': {
  const kategori = 'Data'
  const brand = 'INDOSAT'
  const type = 'Umum'
getPaket(kategori, brand, type, )
}
break       
case 'pakettsel': {
  const kategori = 'Data'
  const brand = 'TELKOMSEL'
  const type = 'Umum'
getPaket(kategori, brand, type, )
}
break         
case 'paketxl': {
  const kategori = 'Data'
  const brand = 'XL'
  const type = 'Umum'
getPaket(kategori, brand, type, )
}
break         
case 'paketsmr': {
  const kategori = 'Data'
  const brand = 'SMARTFREN'
  const type = 'Umum'
getPaket(kategori, brand, type, )
}
break         
case 'paketaxis': {
  const kategori = 'Data'
  const brand = 'AXIS'
  const type = 'Umum'
getPaket(kategori, brand, type, )
}
break         
case 'paketbyu': {
  const kategori = 'Data'
  const brand = 'B.yu'
  const type = 'Umum'
getPaket(kategori, brand, type, )
}
break         
 case 'listtrx': {
  if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
   const usra = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))    
   var slo = cek("saldo", m.sender)
 let no = 1         
teks = `Halo ${cek("username", m.sender)}\n\n❍ Saldo : ${formatmoney(slo)}\n❍ Role : ${cek("level", m.sender)}\n❍ Total Pesanan : ${usra.length}\n\n`  
for (let kris of usra) {
teks += `*○ ${no++}* ${kris}\n`
}
kris.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": usra } })
}
break         
case 'listdeposit': {
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
   const usra = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/deposit/${m.sender}.json`))    
   var slo = cek("saldo", m.sender)
 let no = 1         
teks = `Halo ${cek("username", m.sender)}\n\n❍ Saldo : ${formatmoney(slo)}\n❍ Role : ${cek("level", m.sender)}\n❍ Total Deposit : ${usra.length}\n\n`  
for (let kris of usra) {
teks += `*○ ${no++}* ${kris}\n`
}
kris.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": usra } })
}
break         
case 'daftar':{
if(cek("id", m.sender) == m.sender) return reply(`Anda Sudah Terdaftar Di Database`)
const nama = text.split("@")[0]
const email = text.split("@")[1]
if (!nama || !email) return reply(mess.daftar) 
daftarr(nama, email) 
 }
 break  
 case 'deposit': {
  if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
let reff_deposi = require("crypto").randomBytes(5).toString("hex").toUpperCase()
if(cek("status_deposit", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #bataldepo.`)
 let jumlah_nya = text.split("|")[0]
if (!jumlah_nya) return reply(`Format Salah\n\nContoh : deposit 1500`)

var nilai_depo = Number(jumlah_nya)
var nilai_persen = `${pajak}`
var nilai_bagi = Number(nilai_persen)
var nilai_pajak = nilai_depo / nilai_bagi
sett("deposit", m.sender, nilai_depo - nilai_pajak)
sett("reff_deposit", m.sender, reff_deposi)
sett("status_deposit", m.sender, false)  
let txt = `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

》 ID :  ${cek("reff_deposit" ,m.sender)}
》 Jumlah Bayar :  ${formatmoney(nilai_depo)}
》 Payment : Qris Alpayment
》 Biaya Layanan : ${formatmoney(nilai_pajak)}
》 Saldo DiTerima : ${formatmoney(nilai_depo - nilai_pajak)} 

Jika sudah melakukan pembayaran silahkan kirim bukti berupa gambar transfer dengan caption #bukti

${toko}`
kris.sendMessage(from, {image:qrisdonate, caption:txt}) 
    }
break
case 'bukti':{
if(cek("status_deposit", m.sender) == true) return reply(`Tidak ada deposit yg sedang berlangsung`)
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)
if (!quoted) return reply(`Kirim/Reply Gambar Dengan Caption *${prefix + command}*`)
if (/image/.test(mime)) {
let media = await quoted.download()
m.reply(`Bukti berhasil terkirim ke owner,silahkan menunggu konfirmasi`)
let data_depo = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"})
var jmln = cek("deposit", m.sender)
var nilai_depo = Number(jmln)
var nilai_persen = `${pajak}`
var nilai_bagi = Number(nilai_persen)
var nilai_pajak = nilai_depo / nilai_bagi
let idny = m.sender.split("@")[0]
let buktii = `「 *DEPOSIT USER* 」
⭔ID:  ${cek("reff_deposit" ,m.sender)}
⭔Nomer: ${sender.split('@')[0]}
⭔Payment: Qris Alpayment
⭔Tanggal: ${data_depo + jam}
⭔Jumlah Deposit: ${formatmoney(nilai_depo + nilai_pajak)}
⭔Saldo Diterima: ${formatmoney(nilai_depo)}

Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi dengan 

#acc ${sender.split('@')[0]}
#tolak ${sender.split('@')[0]}`
kris.sendMessage(global.owner+'@s.whatsapp.net', {image: media, caption: buktii},{quoted: null})
}
else {
reply(`Kirim/Reply Gambar Dengan Caption *${prefix + command}*`)
}
}
break        
case "acc": {
if(cek("status_deposit", m.sender) == true) return reply(`Tidak ada deposit yg sedang berlangsung`)
let tgl_dep = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"})
let nopl = text.split("|")[0]
if (!nopl) return reply(`Contoh #yes nomor`) 
let jjl = `${nopl + "@s.whatsapp.net"}`
var jml = cek("deposit", jjl) 
var nilai_depo = Number(jml)
sett("+saldo", jjl, nilai_depo)
let jmlnn = `${tgl_dep}\n_Jumlah :_ ${formatmoney(nilai_depo)}\n_Status :_ Berhasil ✅`
reply(`Deposit Nominal ${formatmoney(nilai_depo)} Berhasil Di Acc`) 
kris.sendMessage(jjl, {text:`Halo Kak Deposit Anda Berhasil Di Acc \n${formatmoney(nilai_depo)}`}) 
sett("deposit", m.sender, 0)
sett("reff_deposit", m.sender, "")
sett("status_deposit", nopl+"@s.whatsapp.net", true)     
usra.push(jmlnn)
fs.writeFileSync(`./Pengaturan/database/riwayat/deposit/${jjl}.json`, JSON.stringify(usra))   
} 
break
case "tolak": {
if(cek("status_deposit", m.sender) == true) return reply(`Tidak ada deposit yg sedang berlangsung`)
let tgl_dep = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"})
let nopl = text.split("|")[0]
if (!nopl) return reply(`Contoh #yes nomor`) 
let jjl = `${nopl + "@s.whatsapp.net"}`
var jml = cek("deposit", jjl) 
var nilai_depo = Number(jml)
let jmlnn = `${tgl_dep}\n_Jumlah :_ ${formatmoney(nilai_depo)}\n_Status :_ Berhasil ✅`
reply(`Deposit Nominal ${formatmoney(nilai_depo)} Berhasil Di Tolak`) 
kris.sendMessage(jjl, {text:`Halo Kak deposit Dengan Nominal ${formatmoney(nilai_depo)} Kami Tolak karena tidak ada data yang cocok dengan bukti tersebut`}) 
sett("deposit", m.sender, 0)
sett("reff_deposit", m.sender, "")
sett("status_deposit", nopl+"@s.whatsapp.net", true)      
usra.push(jmlnn)
fs.writeFileSync(`./Pengaturan/database/riwayat/deposit/${jjl}.json`, JSON.stringify(usra))   
}
break
        case 'yes': {    
 if(cek("id", m.sender) == null) return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`)   
if(cek("status", m.sender) == true) return reply(`Tidak ada pesanan sebelumnya silahkan melakukan pembelian produk kembali.`)  
let kode_buyer = `${cek("kode_layanan", m.sender)}`
const usr = JSON.parse(fs.readFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`))    
let tujuan = `${cek("tujuan", m.sender)}` 
let harga = `${cek("harga", m.sender)}` 
let tgl_trx= `${tanggal + jam}` 
sett("-saldo", m.sender, harga)
let referdf = `${cek("reff", m.sender)}` 
let ref_no = `${sender.split('@')[0]}`
let namaproduk = `${cek("layanan", m.sender)}`
let nomor = `${tujuan}`
let harga_produk = `${harga}`
let kode_produk= `${kode_buyer}`

var hrga = Number(harga_produk)
const signature = crypto.createHash('md5')
.update(digiuser + digiapi + referdf)
.digest('hex');
var config = {
method: 'POST',
url: 'https://api.digiflazz.com/v1/transaction',
data: {
"username": digiuser,
"buyer_sku_code": kode_buyer,
"customer_no": tujuan,
"ref_id": referdf,
"sign": signature
}
};
axios(config)
.then(async res => {
m.reply(`*「 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 」*`)

    let status = res.data.data.status;  
    console.log(status)        
while (status !== 'Sukses') {
await sleep(1000); 
const response = await axios(config);
const jmlnn2 = `_${tanggal + jam}_\n_Layanan :_ ${namaproduk}\n_Harga :_ ${formatmoney(harga_produk)}\n_Catatan :_ ${response.data.data.sn}\n_Status :_ ${response.data.data.status}`
status = response.data.data.status; 
              if (status == "Gagal") {
             sett("+saldo", m.sender, hrga) 
              
              reply(`           _${toko}_\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( ${response.data.data.status} )\n══════════════════════\n_Tujuan :_ ${nomor}\n_Layanan :_ ${namaproduk}\n_Harga :_ ${formatmoney(harga_produk)}\n_Mess :_ ${response.data.data.message}`) 
kris.sendMessage(nomorKu, {text:`*Transaksi Gagal Produk:* ${namaproduk}\n${response.data.data.message}`}) 

                 usr.push(jmlnn2)
fs.writeFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`, JSON.stringify(usr))   
              break;
              }
              
if (status == "Sukses") {
reply(`           _${toko}_\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( ${response.data.data.status} )\n══════════════════════\n_ID: ${tanggal + jam}_\n_Layanan :_ ${namaproduk}\n_Data :_ ${tujuan}\n_Harga :_ ${formatmoney(harga_produk)}\n_Catatan :_ ${response.data.data.sn}`)
usr.push(jmlnn2)
fs.writeFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`, JSON.stringify(usr))   
           
break;
              }
            }
          })
          .catch(error => {
            if (error.response) {   
               sett("+saldo", m.sender, hrga)           
 reply(`           _${toko}_\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( ${error.response.data.data.status} )\n══════════════════════\n_Tujuan :_ ${nomor}\n_Layanan :_ ${namaproduk}\n_Harga :_ ${formatmoney(harga_produk)}\n_Mess :_ ${error.response.data.data.message}`) 
kris.sendMessage(nomorKu, {text:`*Transaksi Gagal Produk:* ${namaproduk}\n${error.response.data.data.message}`}) 
const jmlnn2 = `_${tanggal + jam}_\n_Layanan :_ ${namaproduk}\n_Harga :_ ${formatmoney(harga_produk)}\n_Catatan :_ ${error.response.data.data.sn}\n_Status :_ ${error.data.data.status}`


 usr.push(jmlnn2)
fs.writeFileSync(`./Pengaturan/database/riwayat/trx/${m.sender}.json`, JSON.stringify(usr))                 
            }
   });
sett("layanan", m.sender, "")
sett("harga", m.sender, 0)
sett("tujuan", m.sender, "")  
sett("desc", m.sender, "")  
sett("reff", m.sender, "") 
sett("kode_produk", m.sender, "")  
sett("status", m.sender, true)
     
 
}
break      
        case 'getharga': {
 if (!isOwner) return reply(mess.owner) 
var kak = `${digiuser}`
var lak = `${digiapi}`
reply(`Bot Sedang Memperoses silahkan cek di console gagal/Sukses`) 
getProduk(digiuser, digiapi,)
}
break
case 'saldotoru': {
if (m.isGroup) return m.reply('Fitur Khusus Private Chat')
if (!isOwner) return m.reply("Fitur khusus owner!")
const crypto = require("crypto")
const axios = require("axios")
let third = 'depo';
let hash = crypto.createHash('md5')
  .update(digiuser + digiapi + third)
  .digest('hex');

var config = {
  method: 'POST',  // Set the HTTP method to POST
  url: 'https://api.digiflazz.com/v1/cek-saldo',  // Set the target URL
  data: {
    "cmd": "deposit",
    "username": digiuser,
    "sign": hash
}
};

axios(config)
  .then(function (response) {
    if (response.data.data){
    m.reply(`*「 CEK SALDO DIGIFLAZ 」*

› STATUS DIGIFLAZZ : *TERHUBUNG*
› SALDO SERVER : *${formatmoney(response.data.data.deposit)}*\n`)
  } else {
  m.reply(`*「 AKUN DIGIFLAZZ 」*\n
*Server Terputus Mohon Untuk Mengecek Providernya Kembali*.\n`)
}
  })
}
break			   
case 'afk': {
    if (!m.isGroup) return reply("Fitur Ini Khusus Group!");
    if (!isAdmins) throw mess.admin
    
	const cooldowns = new Map();              
    const now = Date.now();
    const cooldownTime = 5000; // Batas waktu antara eksekusi perintah AFK dalam milidetik (misalnya, 5 detik)

    if (cooldowns.has(m.sender)) {
        const lastExecutionTime = cooldowns.get(m.sender);
        const remainingTime = lastExecutionTime + cooldownTime - now;
        if (remainingTime > 0) {
            return m.reply(`Tunggu beberapa saat sebelum menggunakan perintah AFK lagi. (Sisa Waktu: ${msToDate(remainingTime)})`);
        }
    }

    let reason = text ? text : 'Nothing.';
    afk.addAfkUser(m.sender, Date.now(), reason, _afk);
    kris.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, m);
    cooldowns.set(m.sender, now); // Catat waktu terakhir pengguna menjalankan perintah AFK
break;
};               
case 'getip': {
  if (!isOwner) return reply(mess.owner) ;
  m.reply("My public IP address is: " + ipserver);
break;
};              
case 'restart': {
  if (!isOwner) {
    return m.reply(mess.owner);
  }
  await m.reply(`_Restarting ${packname}_`);
  try {
    await kris.sendMessage(from, {text: "*_Succes_*"});
    await sleep(3000);
    exec(`npm start`);
  } catch (err) {
    exec(`node index.js`);
    await sleep(4000);
    m.reply('*_Sukses_*');
  }
break;
};

case 'join': {
	if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!isOwner) return reply(mess.owner) 
    if (!text) throw 'Masukkan Link Group!'
    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
    m.reply(mess.wait)
    let result = args[0].split('https://chat.whatsapp.com/')[1]
    await kris.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)));
break;
}                    
case 'kick': case 'k': {
	if (!m.isGroup) throw (mess.group) 
    if (!isBotAdmins) throw (mess.botAdmin) 
    if (!isAdmins) return reply(mess.admin) 
    var number;
		if (mentionUser.length !== 0) {
        number = mentionUser[0]
        kris.groupParticipantsUpdate(from, [number], "remove")
        } else if (m.isQuotedMsg) {
          number = m.quotedMsg.sender
          kris.groupParticipantsUpdate(from, [number], "remove")
        } else {
          m.reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
        }
break;
};
case 'add': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) return reply(mess.group) 
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
      let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
      await kris.groupParticipantsUpdate(m.chat, users, 'add');
break;
};
case "listuser" : {
  if (!isOwner) return reply(mess.owner) 
  teks = '*_List User :)_*\n\n'
  for (let pengguna of user) {
    teks += `- ${pengguna}\n`
  }
  teks += `\n*_Total User : ${user.length}_*`
  kris.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": user } });
break;
};    

case 'ping': {
  if (!isOwner) return reply(mess.owner) ;
  const used = process.memoryUsage();
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
    return cpu;
  });

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total;
    last.speed += cpu.speed / length;
    last.times.user += cpu.times.user;
    last.times.nice += cpu.times.nice;
    last.times.sys += cpu.times.sys;
    last.times.idle += cpu.times.idle;
    last.times.irq += cpu.times.irq;
    return last;
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  });

  let timestamp = speed();
  let latensi = speed() - timestamp;
  neww = performance.now();
  oldd = performance.now();
  respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_
${oldd - neww} _miliseconds_

Runtime: ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
  `.trim();

  m.reply(respon);
break;
};
case 'asmaulhusna': {
	m.reply(mess.wait)
    let fetch = await fetchJson(`https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json`)
    let caption = `*Asmaul Husna*\n\n`
    for (let i of fetch) {
    caption += `⭔ No : ${i.index}\n`
    caption += `⭔ Arab : ${i.arabic}\n`
    caption += `⭔ Latin : ${i.latin}\n`
    caption += `⭔ Indonesia : ${i.translation_id}\n`
    caption += `⭔ English : ${i.translation_en}\n\n`
    }
    kris.sendText(m.chat, caption, m)
break;
};
case 'ban' : {
	if (!text) return reply(`Example : ${prefix + command} 62xxxxxxxxxxx`) 
	if (!isOwner) return reply(mess.owner) 
	bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
    ban.push(bnnd)
	fs.writeFileSync('./Pengaturan/database/banned.json', JSON.stringify(ban))
	m.reply(`${bnnd}`);
break;
};             
case 'unban' : {
	if (!text) return reply(`Example : ${prefix + command} 62xxxxxxxxxxx`) 
	if (!isOwner) return reply(mess.owner) 
	bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
    unp = ban.indexOf(bnnd)
    ban.splice(unp, 1)
	fs.writeFileSync('./Pengaturan/database/banned.json', JSON.stringify(ban))
	m.reply(`${bnnd}`);
break;
};             
case 'listban': case 'lisbanned': {
	if (!isOwner) return reply(mess.owner) 
    teks = '*List Banned*\n\n'
    for (let medog of ban) {
    teks += `- ${medog}\n`
    }
    teks += `\n*Total Banned : ${ban.length}*`
    kris.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": ban } });
break;
};
case "hidetag": case "h": {
	if (!m.isGroup) return reply(mess.group)
    if (!isAdmins) return reply(mess.admin)
    kris.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m });
break;
};
case 'grup': {
  if (!m.isGroup) {
    return m.reply(mess.group);
  }
  if (!isBotAdmins) {
    return m.reply(mess.botAdmin);
  }
  if (!isAdmins) {
    return m.reply(mess.admin);
  }

  const action = args[0]; // 'close' untuk menutup atau 'open' untuk membuka
  
  if (action === 'close') {
    await kris.groupSettingUpdate(m.chat, 'announcement')
      .then(() => m.reply('_Successful Closing The Group_'))
      .catch((err) => m.reply(jsonformat(err)));
  } else if (action === 'open') {
    await kris.groupSettingUpdate(m.chat, 'not_announcement')
      .then(() => m.reply('_Successful Opening The Group_'))
      .catch((err) => m.reply(jsonformat(err)));
  } else {
    reply('Gunakan "close" untuk menutup grup atau "open" untuk membukanya.');
  };
break;
};             
case 'antilink': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins) return m.reply(mess.admin);
  if (!isBotAdmins) return m.reply("Jadikan saya Admin dulu ya :)");
  
  const action = args[0]; // 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan
  
  if (action === 'on') {
    antilink.push(from);
    fs.writeFileSync('./Pengaturan/database/antilink.json', JSON.stringify(antilink, null, 2));
    reply(`✅ Sukses mengaktifkan fitur antilink di group *${groupMetadata.subject}*`);
  } else if (action === 'off') {
    const index = antilink.indexOf(from);
    if (index !== -1) {
      antilink.splice(index, 1);
      fs.writeFileSync('./Pengaturan/database/antilink.json', JSON.stringify(antilink, null, 2));
      reply(`✅ Sukses menonaktifkan fitur antilink di group *${groupMetadata.subject}*`);
    } else {
      reply(`Fitur antilink tidak aktif di group *${groupMetadata.subject}*.`);
    }
  } else {
    reply('Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan fitur antilink.');
  };
break;
};           
case 'p': case 'proses': {
	if (!m.isGroup) return (`Hanya Dapat Digunakan digroup`)
	if (!isAdmins) return m.reply(mess.admin)
	if (!m.quoted) return reply(`Reply pesanannya!`)
	let proses = `O━• Transaksi Pending •━O\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${m.quoted.text}\n\nPesanan @${m.quoted.sender.split("@")[0]} sedang di proses!\n\n━O━O━••••••••••••━O━O━`
	kris.sendText(m.chat, proses, m);
break;
};             
case 'd': case 'done': {
	if (!m.isGroup) return (`Hanya Dapat Digunakan Gi Group`)
	if (!isAdmins) return m.reply(mess.admin)
	if (!m.quoted) return reply(`Reply pesanannya!`)
	let sukses = `O━• Transaksi Sukses •━O\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih atas orderannya @${m.quoted.sender.split("@")[0]}🙏\n\n━O━O━••••••••••••━O━O━`
	kris.sendText(m.chat, sukses, m);
break;
};             
case 'linkgroup': case 'linkgc': case 'gclink': case 'grouplink':{
	if (!m.isGroup) throw reply(`Fitur Ini Khusus Group`)
	if (!isBotAdmins) throw reply(`Bot Bukan Admin`)
let response = await kris.groupInviteCode(m.chat)
kris.sendText(m.chat, `Nama Grub : *${groupMetadata.subject}*\n\nDeskribsi : ${groupMetadata.desc}\n\nLink : https://chat.whatsapp.com/${response}`, m, { detectLink: true });
break;
};
case 's': case 'sticker': {
  if (isBanned) {
    return m.reply(`*You Have Been Banned*`);
  }
  if (isGroup) throw mess.private

  if (/image/.test(mime)) {
    m.reply(mess.wait);
    let media = await kris.downloadMediaMessage(qmsg);
    let encmedia = await kris.sendImageAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author
    });
    await fs.unlinkSync(encmedia);
  } else if (/video/.test(mime)) {
    m.reply(`Proses`);
    if (qmsg.seconds > 11) {
      return m.reply('Maksimal 10 detik!');
    }
    let media = await kris.downloadMediaMessage(qmsg);
    let encmedia = await kris.sendVideoAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author
    });
    await fs.unlinkSync(encmedia);
  } else {
    m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`);
  }
break;
};

//━━━━━━━━━━━━━━━[ FITUR STORE ]━━━━━━━━━━━━━━━━━//              
case 'list': {
    if (!m.isGroup) {
        return m.reply(`Fitur khusus Grub! Fitur topup Otomatis? ketik .menu`);
    }
    if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
    if (!isAlreadyResponListGroup((m.isGroup ? m.chat : botNumber), db_respon_list)) return reply(`Belum ada list message yang terdaftar di group/chat ini`)

    db_respon_list.sort((a, b) => a.key.localeCompare(b.key)); // Mengurutkan list sesuai abjad

    let teks = `${ucapanWaktu} Kak *${m.pushName}*👋.\n\n🛒 ${groupMetadata.subject}\n📆 ${tanggal3}\n⏰ ${wayah}\n\n=================================\n\n`;

    for (let i of db_respon_list) {
        if (i.id === (m.isGroup ? m.chat : botNumber)) {
            teks += `› ${i.key}\n`;
        }
    }

    teks += `\n=================================\n\nUntuk melihat detail produk, silahkan kirim nama produk yang ada pada list di atas. Misalnya kamu ingin melihat detail produk dari ${db_respon_list[0].key}, maka kirim pesan ${db_respon_list[0].key} kepada bot`;

    kris.sendMessage(m.chat, { text: teks, mentions: [m.sender] }, { quoted: m });
break;
}
case "addlist": {
  if (!m.isGroup) {
    return m.reply(mess.group);
  }
  if (!isBotAdmins) {
    return m.reply(mess.botAdmin);
  }
  if (!isAdmins) {
    return m.reply(mess.admin);
  }
  let text1 = text.split("@")[0];
  let text2 = text.split("@")[1];
  if (!text.includes("@")) {
    return m.reply(`Gunakan dengan cara ${prefix + command} *_Judul@Isinya_*`);
  }
  if (isAlreadyResponList(from, text1, db_respon_list)) {
    return m.reply(`List dengan key *${text1}* telah tersedia digrup ini`);
  }
  if (isImage || isQuotedImage) {
  let media = await downloadAndSaveMediaMessage('image', `./Pengaturan/database/${sender}`)
  var njay = await imgbb(imgbbapi, media)
  addResponList(from, text1, text2, true, `${njay.display_url}`, db_respon_list)
  m.reply(`Sukses menambahkan list message dengan key : *${text1}*`)
  if (fs.existsSync(media)) fs.unlinkSync(media)
  } else {
  addResponList(from, text1, text2, false, '-', db_respon_list)
  m.reply(`Sukses menambahkan list message dengan key : *${text1}*`)
  }
break;
}
case "dellist": {
  if (!m.isGroup) {
    return m.reply(mess.group);
  }
  if (!isBotAdmins) {
    return m.reply(mess.botAdmin);
  }
  if (!isAdmins) {
    return m.reply(mess.admin);
  }
  if (db_respon_list.length === 0) {
    return m.reply(`Belum ada List di Database`);
  }
  if (!text) {
    return m.reply(`Example: ${prefix + command} *_key_*`);
  }
  if (!isAlreadyResponList(from, text, db_respon_list)) {
    return m.reply(`List Response Dengan Key *_${text}_* Tidak Di Temukan`);
  }
  delResponList(from, text, db_respon_list);
  m.reply(`Sukses Delete List Dengan Key *${text}*`);
break;
}
case "update": {
  if (!m.isGroup) {
    return m.reply(mess.group);
  }
  if (!isBotAdmins) {
    return m.reply(mess.botAdmin);
  }
  if (!isAdmins) {
    return m.reply(mess.admin);
  }
  var text1 = text.split("@")[0];
  var text2 = text.split("@")[1];
  if (!text.includes("@")) {
    return m.reply(`Gunakan dengan cara ${prefix + command} *_key@response_*`);
  }
  if (!isAlreadyResponListGroup(from, db_respon_list)) {
    return m.reply(`Maaf, Untuk Key *${text1}* Belum Terdaftar`);
  }
  if (isImage || isQuotedImage) {
  let media = await downloadAndSaveMediaMessage('image', `./Pengaturan/database/${sender}`)
  var njay = await imgbb(imgbbapi, media)
  updateResponList(from, text1, text2, true, `${njay.display_url}`, db_respon_list)
  m.reply(`Sukses update list message dengan key : *${text1}*`)
  if (fs.existsSync(media)) fs.unlinkSync(media)
  } else {
  updateResponList(from, text1, text2, false, '-', db_respon_list)
  m.reply(`Sukses update respon list dengan key *${text1}*`)
  }
break;
}
case 'lainnya':{
var lai = `*Fitur Store* 
⭔ .addlist
⭔ .dellist
⭔ .update
⭔ .kali
⭔ .bagi
⭔ .tambah
⭔ .kurang
*==============*
 *Menu Owner* 
⭔ .restart 
⭔ .getip 
⭔ .ping 
⭔ .ban 
⭔ .unban
⭔ .listban
⭔ .listuser
⭔ .getdigi
⭔ .setprem
⭔ .acc
⭔ .tolak
*==============*
⭔ .afk
⭔ .kick 
⭔ .add 
⭔ .join
⭔ .tagall
⭔ .grup _open / close_
⭔ .antilink on / off
*==============*
⭔ .sticker `
reply(lai) 
}
break
default:
if (budy.startsWith('<')) {
if (!isOwner) return
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}

if (budy.startsWith('vv')) {
if (!isOwner) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}

if (budy.startsWith('uu')){
if (!isOwner) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}

if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
kris.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
}

} catch (err) {
console.log(util.format(err))
let e = String(err)
kris.sendMessage("6285798048936@s.whatsapp.net", { text: "assalamualaikum Owner Ada Fitur Yang Eror Nih " + util.format(e), 
contextInfo:{
forwardingScore: 5, 
isForwarded: true
}})
}
}