const env = require('../.env')
const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const Session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const { markup } = require('telegraf/extra')

//wizard

let descricao = ''
let formato = ""
let preco = 0
let data = null
/* let lista=[] */
const bot = new Telegraf(env.token)


/* const gerarBotoes = () => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        { columns: 3 }
    )
) */
const confirmacao = Extra.markup(
    Markup.inlineKeyboard([
        Markup.callbackButton(`Sim`,`s`),
        Markup.callbackButton(`Não`,`n`)
    ])
)


const precoHandler = new Composer()
precoHandler.hears(/(\d+)/, ctx => {
    preco = ctx.match[1]
    ctx.reply(`-Informe a data de pagamento:`)
    ctx.wizard.next()
})

precoHandler.use(ctx => ctx.reply(`Apenas números são aceitos!`))

const dataHandler = new Composer()
dataHandler.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
    data = ctx.match[1]
    ctx.reply(
        `Compra: 
        Descrição: ${descricao}
        Formato: ${formato}
        Data: ${data}
        Preço: ${preco}
        Confirmar compra?`,confirmacao
    )
    ctx.wizard.next()
})

dataHandler.use(ctx => ctx.reply(`Entre com uma data no seguinte formato: dd/mm/aaaa`))

const confirmacaoHandler = new Composer()

confirmacaoHandler.action('s', ctx => {
    ctx.reply(`Compra confirmada!`)
    ctx.scene.leave()
})
confirmacaoHandler.action('n', ctx => {
    ctx.reply(`Compra cancelada!`)
    ctx.scene.leave()
})


confirmacaoHandler.use(ctx => ctx.reply(
    `Apenas confirme!`,
    confirmacao)
)

const wizardCompra = new WizardScene('compra', 
    ctx => {
        ctx.reply(`    Bem-vindo à Locadora Digital:
        -Qual filme/série você comprou?`)
        ctx.wizard.next()
    },
    ctx => {
        ctx.reply(`-Tipo de mídia: (Física ou Digital)`)
        ctx.wizard.next()
        descricao = ctx.update.message.text
    },
    ctx => {
        formato = ctx.update.message.text
        ctx.reply(`-Quanto custou?`)
        ctx.wizard.next()
    },
    precoHandler,
    dataHandler,
    confirmacaoHandler
)

const stage1 = new Stage([wizardCompra], { default: 'compra' })
bot.use(Session())
bot.use(stage1.middleware())

/* bot.action(/delete (.+)/, ctx => {
    lista = lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes())
})

bot.on('text', ctx => {
    lista.push(ctx.update.message.text)
    ctx.reply(`${ctx.update.message.text} adicionado!`, gerarBotoes())
}) */

bot.startPolling()
