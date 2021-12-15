const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let lista = []

const gerarBotoes = () => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        { columns: 3 }
    )
)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply(`Este espaço é reservado para uma lista de criação de filmes compartilhada.
    \nOs filmes adicionados ficarão destacados em forma de botão, para excluir um filme apenas clique em cima do botão.`)
    await ctx.reply('Digite para começar criando a lista de filmes que quer assistir no futuro: ')
})

bot.on('text', ctx => {
    lista.push(ctx.update.message.text)
    ctx.reply(`${ctx.update.message.text} adicionado! 
    \nPara excluir, clique no botão em destaque abaixo.`, gerarBotoes())
})

bot.action(/delete (.+)/, ctx => {
    lista = lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado! O que achou do filme?`, gerarBotoes())
})

bot.startPolling()