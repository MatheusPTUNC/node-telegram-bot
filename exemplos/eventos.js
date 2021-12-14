// acessando o arquivo que contém o 'token' para a api do Telegram
const env = require('../.env')
// importando a biblioteca do 'Telegraph'
const Telegraf = require('telegraf')
// criando o objeto 'bot' e instanciando como um novo objeto da classe 'Telegraf'
const bot = new Telegraf(env.token)

// iniciando o bot
bot.start(ctx => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo ${name}! 
        Eu sou um 'bot' em treinamento!
        Por enquanto eu:
            - repito o que você digita
            - digo as coordenadas de latitude e longitude se você me fornecer uma localização
            - retorno o nome e o telefone de um contato que você me fornecer
            - ouço uma mensagem e áudio e retorno a duração dela
            - informo a resolução das fotos que você me enviar (cuidado hein =p)`)
})

// tratando eventos de recebimento de texto
bot.on('text', ctx => {
    const texto = ctx.update.message.text
    console.log(texto)
    ctx.reply(`Texto '${texto}' recebido com sucesso!`)
})

// tratando eventos de recebimento de localização
bot.on('location', ctx => {
    const loc = ctx.update.message.location
    console.log(loc)
    ctx.reply(`Entendido! Você está em: 
        Latitude: ${loc.latitude}, 
        Longitude: ${loc.longitude}`)    
})

// tratando o evento de recebimento de contato
bot.on('contact', ctx => {
    const cont = ctx.update.message.contact
    console.log(cont)
    ctx.reply(`Legal! O telefone do ${cont.first_name} é ${cont.phone_number}`)

})

// tratando o evento para recebimento de aúdio
bot.on('voice', ctx => {
    const voz = ctx.update.message.voice
    console.log(voz)
    ctx.reply(`Áudio de ${voz.duration} segundos recebido!`)
})

// tratando o evento para recebimento de imagem/foto
// verificar o erro de inserir uma imagem (??) a mais
bot.on('photo', ctx => {
    const foto = ctx.update.message.photo
    console.log(foto)
    console.log(foto.length)
    // criando um laço para varrer todas as possíveis fotos enviadas
    foto.forEach((ph, i) => {
        ctx.reply(`A ${i}a foto tem resolução de: ${ph.width} X ${ph.height} pixels`)        
    })
})

// tratando o evento para recebimento de 'stickers'
bot.on('sticker', ctx => {
    const stic = ctx.update.message.sticker
    console.log(stic)
    ctx.reply(`Você enviou o ${stic.emoji} do conjunto ${stic.set_name}`) 
})

bot.startPolling()