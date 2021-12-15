const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)

const botoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`))
        , { columns: 3 }
    )
)

bot.use(session())

const verificarUsuario = (ctx, next) => {
    const mesmoIDMsg = ctx.update.message
        && ctx.update.message.from.id === env.userID
    const mesmoIDCallback = ctx.update.callback_query
        && ctx.update.callback_query.from.id === env.userID

    if (mesmoIDMsg || mesmoIDCallback) {
        next()
    } else {
        ctx.reply('Acesso Negado : Você é um usuário sem autorização!')
    }
}

// Vc pode ter mais de um middleware...
const processando = ({ reply }, next) =>
    reply('processando...').then(() => next())

bot.start(verificarUsuario, async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply(`Este espaço é reservado para uma lista de criação de filmes compartilhada.
    \nOs filmes adicionados ficarão destacados em forma de botão, para excluir um filme apenas clique em cima do botão.`)
    await ctx.reply('Digite para começar criando a lista de filmes que quer assistir no futuro: ')
    ctx.session.lista = []
})

bot.on('text', verificarUsuario, processando, ctx => {
    let msg = ctx.update.message.text
    ctx.session.lista.push(msg)
    ctx.reply(`${msg} adicionado!
    \nPara excluir, clique no botão em destaque abaixo.`, botoes(ctx.session.lista))
})

bot.action(/delete (.+)/, verificarUsuario, ctx => {
    ctx.session.lista = ctx.session.lista.filter(
        item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado! O que achou do filme?`, botoes(ctx.session.lista))
})

bot.startPolling()