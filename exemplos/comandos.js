const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    const nome = ctx.update.message.from
    ctx.reply(`Seja bem vindo(a) ${nome.first_name}!\nAvise se precisar de /ajuda!`)
})

bot.command('ajuda', ctx => {
    ctx.reply('/ajuda: vou mostrar as opções'
    + '\n/ajuda2: para testar via hears'
    + '\n/op2: opção genérica'
    + '\n/op3: outra opção genérica')
})

bot.hears('/ajuda2', ctx => {
    ctx.reply('Eu também consigo capturar comandos via hears,'
    + ' mas utilize o /ajuda para facilitar!')
})

bot.hears(/\/op(2|3)/i, ctx => {
    ctx.reply('Resposta padrão para comandos genéricos')
})

bot.startPolling()

