const env = require('../.env')
const Telegraf = require('telegraf')
const axios = require('axios').default
const bot = new Telegraf(env.token)

// tratando eventos de voz com a obtenção do arquivo
bot.on('voice', async ctx => {
    const id = ctx.update.message.voice.file_id
    const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithVoice({ url: `${env.apiFileUrl}/${res.data.result.file_path}` })
})

// tratando eventos de foto com a obtenção do arquivo
bot.on('photo', async ctx => {
    const id = ctx.update.message.photo[0].file_id
    const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithPhoto({ url: `${env.apiFileUrl}/${res.data.result.file_path}` })
})

bot.startPolling()