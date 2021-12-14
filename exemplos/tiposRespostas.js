// acessando o arquivo que contém o 'token' para a API do Telegram
const env = require('../.env')
// importando a biblioteca do 'Telegraf'
// o '.default' do final serve para habilitar o 'Intellisense' do VSCode
const Telegraf = require('telegraf')
// criando o objeto 'bot' e instanciando como um novo objeto da classe 'Telegraf'
const bot = new Telegraf(env.token)

// iniciando o bot
// como o 'reply' ocorre de forma assíncrona, a 'arrow function' da função 'start' funcionará
// também de forma assíncrona para que as respostas sejam enviadas na sequência correta
bot.start(async ctx => {
    const user = ctx.update.message.from
    await ctx.reply(`Seja bem vindo ${user.first_name} ${user.last_name}!`)
    await ctx.replyWithHTML(`Destacando mensagens utilizando <b>HTML</b>
    <i>de várias </i> <code>formas </code> <pre>possíveis </pre>
    <a href="https://www.google.com">Google</a>`)
    await ctx.replyWithMarkdown('Destacando mensagens utilizando *Markdown*'
        + ' _de várias_ `formas` ```possíveis```'
        + ' [Google](http://www.google.com)')
    await ctx.replyWithPhoto({source: `${__dirname}/cachorro.jpg`})
    await ctx.replyWithPhoto('https://www.petz.com.br/blog/wp-content/uploads/2019/04/temperatura-cachorro.jpg',{caption: 'Saca só essa!'})
    await ctx.replyWithPhoto({url: 'https://comofazer.online/wp-content/uploads/2019/12/cachorromijando.jpg'})
    await ctx.replyWithLocation(37.9715285,23.7267166)
    //await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v')
})

// iniciando o 'polling' com o servidor para verificar se há novas conversas/mensagens
bot.startPolling()