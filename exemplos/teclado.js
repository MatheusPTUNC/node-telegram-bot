const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['🐷 Porco', '🐮 Vaca', '🐮 Carneiro'],
    ['🐔 Galinha',' 🍳 Ovo'],
    ['🐟 Peixe','🦐 Frutos do Mar'],
    ['🍄 Eu sou vegetariano']
]).resize().extra()

bot.start(async ctx => {
    const from = ctx.update.message.from
    await ctx.reply(`Seja bem vindo ${from.first_name}!`)
    await ctx.reply(`Qual bebida você prefere?`,
        Markup.keyboard(['🥤 Coca','🍺 Cerveja']).resize().oneTime().extra())
})

bot.hears(['🥤 Coca','🍺 Cerveja'], async ctx => {
    await ctx.reply(`Eu também gosto de ${ctx.match}`)
    await ctx.reply('E qual o seu tipo de carne predileto?',tecladoCarne)
})

bot.hears('🐮 Vaca', ctx => {
    ctx.reply('Também é a minha predileta')
})

bot.hears('🍄 Eu sou vegetariano', ctx => {
    ctx.reply('Legal! Mas eu ainda não consegui evoluir até este nível!')    
})

bot.on('text', ctx => {
    ctx.reply('Legal!!!! Ótima escolha!')
})

bot.startPolling()

