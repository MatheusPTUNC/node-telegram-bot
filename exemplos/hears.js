const env = require ('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)

bot.hears('pizza', ctx => {
    ctx.reply('Quero!')
})

bot.hears(['fígado','chuchu','moela'], ctx => {
    ctx.reply('Quero também!')
})

bot.hears('🐷', ctx => {
    ctx.reply('Hummmmm.... Torresmo.... 🤤🤤🤤 ')
})

bot.hears(['🍀','🍼','🫑'], ctx => {
    ctx.reply('Sai fora!!!!!!!!!!!!!!')
})

bot.hears(/burguer/i, ctx => {
    ctx.reply('Hamburguer, X-Burguer, 🤤🤤🤤🤤🤤🤤🤤🤤🤤🤤🤤🤤🤤🤤🤤')
})

bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx => {
    moment.locale('pt-BR')
    const data = moment(ctx.match[1], 'DD/MM/YYYY')
    ctx.reply(`${ctx.match[1]} cai em ${data.format('dddd')}`)

})

bot.startPolling()