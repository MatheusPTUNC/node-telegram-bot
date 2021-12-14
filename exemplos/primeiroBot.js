// importando o arquivo com as variáveis de ambiente 
const env = require('../.env')

// importando a biblioteca do 'Telegraf'
const Telegraf = require('telegraf')

/**
 * criando o objeto 'bot' e instanciando como um novo 
 * objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// iniciando o bot
bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`Olá! Seja bem vindo ${from.first_name}!`)
})

// dando continuidade à conversa
bot.on('text', async (ctx, next) => {
    await ctx.reply('Resposta 1')
    next()
})

bot.on('text', async (ctx, next) => {
    await ctx.reply('Resposta 2')
    next()
})

/**
 * iniciando o 'polling' com o servidor para verificar
 * se há novas mensagens/conversas
 */
bot.startPolling()