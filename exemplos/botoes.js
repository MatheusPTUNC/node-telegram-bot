const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let contagem = 0

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('+1', 'Adicionar 1'),
    Markup.callbackButton('+10', 'Adicionar 10'),
    Markup.callbackButton('+100', 'Adicionar 100'),
    Markup.callbackButton('-1', 'Subtrair 1'),
    Markup.callbackButton('-10', 'Subtrair 10'),
    Markup.callbackButton('-100', 'Subtrair 100'),
    Markup.callbackButton('Zerar', 'Reset'),
    Markup.callbackButton('Resultado','Result')
], { columns: 3 }))

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo ${nome}!`)
    await ctx.reply(`A contagem atual está em ${contagem}`,botoes)
})

bot.action(/Adicionar (\d+)/, ctx => {
    contagem += parseInt(ctx.match[1])
    ctx.reply(`A contagem atual está em: ${contagem}`, botoes)
})

bot.action(/Subtrair (\d+)/, ctx => {
    contagem -= parseInt(ctx.match[1])
    ctx.reply(`A contagem atual está em: ${contagem}`, botoes)
})

bot.action('Reset', ctx => {
    contagem = 0
    ctx.reply(`A contagem atual está em: ${contagem}`, botoes)
})

bot.action('Result', ctx => {
    ctx.answerCbQuery(`A contagem atual está em ${contagem}!`)
})

bot.startPolling()