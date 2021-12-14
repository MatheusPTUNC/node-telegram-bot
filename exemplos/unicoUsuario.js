// acessando o arquivo que contém o 'token' para a api do Telegram
const env = require('../.env')
// importando a biblioteca do 'Telegraph'
const Telegraf = require('telegraf')
// criando o objeto 'bot' e instanciando como um novo objeto da classe 'Telegraf'
const bot = new Telegraf(env.token)

// iniciando o bot
bot.start(ctx => {
    const from = ctx.update.message.from
    if (from.id != '1351450134') {
        ctx.reply(`Cai fora ${from.first_name} ${from.last_name}! Só falo com meu mestre!!`)
    }
    else {
        console.log(from.id)
        ctx.reply(`Seja bem vindo meu Mestre! Senti sua falta!`)
    }
})

// iniciando o 'polling' com o servidor para verificar se há novas mensagens na conversa
bot.startPolling()

