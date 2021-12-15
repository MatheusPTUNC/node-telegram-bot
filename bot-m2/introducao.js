const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const Composer = require('telegraf/composer')
const Stage = require('telegraf/stage')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const { markup } = require('telegraf/extra')
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const Session = require('telegraf/session')

const bot = new Telegraf(env.token)

const tecladoFilmes = Markup.keyboard([
    ['🔫 Ação', '💕 Romance', '👾 Animação'],
    ['🌍 Aventura','🎭 Comédia','🎨 Clássico'],
    ['🧙‍♂️ Fantasia', '🤖 Ficcção', '👤 Biográfico'],
    ['🔪 Terror', '👻 Suspense', '🎼 Musical']
]).resize().extra()

const tecladoSéries = Markup.keyboard([
    ['🔫 Ação', '💕 Romance', '👾 Animação'],
    ['🌍 Aventura','🎭 Comédia','🎨 Clássico'],
    ['🧙‍♂️ Fantasia', '🤖 Ficcção', '👤 Biográfico'],
    ['🔪 Terror', '👻 Suspense', '🎼 Musical']
]).resize().extra()


bot.start(ctx => {
    const from = ctx.update.message.from
    if (from.id == '1351450134' || from.id == '2101124695') {
        console.log(from.id)
        ctx.reply(`Seja bem vindo meu mestre! 
        Sou um bot de filmes em desenvolvimento.
        Minhas funcionalidades são:
            - repito o que você digita
            - digo as coordenadas de latitude e longitude da localização que você me fornecer
            - retorno o nome e o telefone de um contato que você me fornecer
            - ouço uma mensagem e áudio e retorno a duração dela
            - informo a resolução das fotos que você me enviar
            Sinta-se à vontade para testar meus comandos iniciais, basta fazer qualquer das ações acima. ;)
            Os comandos acima são apenas uma demonstração do que você encontrará neste ChatBot, divirta-se!
            Caso necessite , digite /ajuda para exemplificar comandos.
            Digite /cenaF para acessar cena de imagens de filmes.
            Digite /cenaS para acessar cena de imagens de séries.`)
            ctx.reply(`Segue abaixo links para sites de filmes e séries:`,botoes)
            ctx.reply(`Qual categoria te interessa mais? Acesse o Keyboard para responder.`,
        Markup.keyboard(['🎞 Filmes','🎬 Séries']).resize().oneTime().extra())
        
    }
    else {
        ctx.reply(`Cai fora ${from.first_name} ${from.last_name}! Só falo com meus mestres!!`)
    }
})


const filmeScene = new Scene('cenaF')
filmeScene.enter(ctx => ctx.reply(`Iniciando a cena de imagens de filmes.
Para iniciar o quizz digite /ini.
Para sair digite /sair.`))
filmeScene.leave(ctx => ctx.reply(`Saindo da cena de imagens de filmes.`))
filmeScene.command('sair', leave())
filmeScene.command('ini', ctx => {
    ctx.reply('/melhor : para retornar imagem do melhor filme de todos os tempos.'
    + '\n/mediano : para retornar imagem de um filme mediano.'
    + '\n/pior : para retornar imagem de um filme ruim.')
})

filmeScene.hears('/melhor', ctx => {
    ctx.replyWithPhoto('https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/91/32/20224832.jpg')
})

filmeScene.hears('/mediano', ctx => {
    ctx.replyWithPhoto('https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/92/64/78/20210636.jpg')
})

filmeScene.hears('/pior', ctx => {
    ctx.replyWithPhoto('https://media.fstatic.com/DOfzqwa0UPncI3OWS4FObvswyaE=/290x478/smart/media/movies/covers/2018/12/6_XWpNs7Z.jpg')
})


const serieScene = new Scene('cenaS')
serieScene.enter(ctx => ctx.reply(`Iniciando a cena de imagens de séries.
Para iniciar o quizz digite /ini.
Para sair digite /sair.`))
serieScene.leave(ctx => ctx.reply(`Saindo da cena de imagens de séries.`))
serieScene.command('sair', leave())
serieScene.command('ini', ctx => {
    ctx.reply('/melhor : para retornar imagem da melhor série de todos os tempos.'
    + '\n/mediana : para retornar imagem de uma série mediana.'
    + '\n/pior : para retornar imagem de uma série ruim.')
})

serieScene.hears('/melhor', ctx => {
    ctx.replyWithPhoto('https://br.web.img3.acsta.net/pictures/16/10/10/17/04/121946.jpg')
})

serieScene.hears('/mediana', ctx => {
    ctx.replyWithPhoto('https://musicnonstop.uol.com.br/wp-content/uploads/2021/08/PT-BR_LCDP_S5_Main_Vertical_RGB_PRE-691x1024.jpg')
})

serieScene.hears('/pior', ctx => {
    ctx.replyWithPhoto('https://i0.wp.com/br.nacaodamusica.com/wp-content/uploads/2021/01/Fate-A-Saga-Winx.jpg')
})

filmeScene.command('sair', leave())
serieScene.command('sair', leave())

const stage = new Stage([filmeScene,serieScene])
bot.use(Session())
bot.use(stage.middleware())
bot.command('cenaS', enter('cenaS'))
bot.command('cenaF', enter('cenaF'))

bot.hears(['🎞 Filmes'], async ctx => {
    await ctx.reply(`Então a sua escolha foi:  ${ctx.match}`)
    await ctx.reply('Qual seu gênero de filme preferido?',tecladoFilmes)
})

bot.hears(['🎬 Séries'], async ctx => {
    await ctx.reply(`Então a sua escolha foi:  ${ctx.match}`)
    await ctx.reply('Qual seu gênero de série preferido?',tecladoSéries)
})

bot.hears('🔫 Ação', ctx => {
    ctx.reply('Meu nome é Bond, James Bond. 🕴')
})

bot.hears('💕 Romance', ctx => {
    ctx.reply('Estou voando, Jack! 🛳')
})

bot.hears('👾 Animação', ctx => {
    ctx.reply('Pelos poderes de Greyskull..! 🗡⚡')
})

bot.hears('🌍 Aventura', ctx => {
    ctx.reply('E.T ... Telefone... Minha Casa. 🌌')
})

bot.hears('🎭 Comédia', ctx => {
    ctx.reply('Desonra pra tu! Desonra pra tua vaca! 🐉')
})

bot.hears('🎨 Clássico', ctx => {
    ctx.reply('Carpe diem. Aproveitem o dia, rapazes. Tornem suas vidas extraordinárias!')
})

bot.hears('🧙‍♂️ Fantasia', ctx => {
    ctx.reply('Meu precioso! 💍')
})

bot.hears('🤖 Ficcção', ctx => {
    ctx.reply('Luke, eu sou seu pai! ⚫🤖⚔️')
})

bot.hears('👤 Biográfico', ctx => {
    ctx.reply('Inteligência é a capacidade de se adaptar à mudança! 🧑‍🦼🌌')
})

bot.hears('🔪 Terror', ctx => {
    ctx.reply('Um, dois, O Freddy vem te pegar,'

    +'\nTrês, quatro, é melhor trancar a porta.'
    
    +'\nCinco, Seis, Agarre seu crucifixo,'
    
    +'\nSete, oito, fique acordado até tarde.'
    
    +'\nNove, dez, não durma nunca mais! 👕👁️☠️')
})

bot.hears('👻 Suspense', ctx => {
    ctx.reply('O que seria pior? Viver como um monstro ou morrer como um homem bom? 🕵️🔥')
})

bot.hears('🎼 Musical', ctx => {
    ctx.reply('Por favor, selecione outro gênero. >:(')
})

bot.hears('filmes',ctx=> {
    ctx.reply('Então você procura filmes..? Já tentou: A Família Mitchell e a Revolta das Máquinas ?')
})

bot.hears('séries',ctx=> {
    ctx.reply('Então você procura séries..? Já tentou: Dirk Gentlys Holistic Detective Agency ?')
})

bot.hears('🍿',ctx=> {
    ctx.reply('Hmmm... Uma pipoquinha com manteiga vai bem a qualquer momento!')
})

bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx => {
    moment.locale('pt-BR')
    const data = moment(ctx.match[1], 'DD/MM/YYYY')
    ctx.reply(`A data ${ctx.match[1]} cai em ${data.format('dddd')} , é melhor se organizar para este dia!`)

})

bot.command('ajuda', ctx => {
    ctx.replyWithHTML('/ajuda: Abre menu de opções de ajuda.'
    + '\n/catalogo: Para retornar o link para o catálogo de filmes.'
    + '\n/recomendar: Recomenda uma lista de filmes.'
    + '\n/foto: Foto de um animal fofo para aumentar a liberação de serotonina.'
    + '\n/cinema: Mostra a localização do cinema recomendado.'
    + '\n Acesse o Keyboard para responder se prefere séries ou filmes.')
})

bot.hears('/catalogo', ctx => {
    ctx.replyWithHTML('Link para um catálogo genérico de filmes a seguir:'
    + ' <a href="https://www.vitrinefilmes.com.br/filmes/catalogo/">Catálogo de Filmes</a>')
})

bot.hears('/recomendar',ctx => {
    ctx.replyWithMarkdown(
        ' 1 — *Viagem ao Topo da Terra*, Patrick Imbert'
    + '\n 2 — *7 Prisioneiros*, Alexandre Moratto'
    + '\n 3 — *The Witcher: Lenda do Lobo*, Kwang Il Han'
    + '\n 4 — *A Família Mitchell e a Revolta das Máquinas*, Michael Rianda e Jeff Rowe'
    + '\n 5 — *A Liga da Justiça*, Zack Snyder'
    + '\n 6 — *Cruella*, Craig Gillespie'
    + '\n 7 — *Raya e o Último Dragão*, Paul Briggs, Don Hall, Carlos Lopez Estrada'
    + '\n 8 — *Invocação do Mal 3: A Ordem do Demônio*, Michael Chaves'
    + '\n 9 — *Viúva Negra*, Cate Shortland'
    + '\n 10 — *A Guerra do Amanhã*, Chris McKay')
})

bot.hears('/foto', ctx => {
    ctx.replyWithPhoto('https://imagens.azeitonapreta.com.br/static/classificado/2019/1122/bulldog-frances-macho-com-pedigree-1574443951.jpg')
})

bot.hears('/cinema', ctx =>{
    ctx.replyWithLocation(-26.11045155186773, -49.805209918227185)
})

bot.on('text', ctx => {
    const texto = ctx.update.message.text
    console.log(texto)
    ctx.reply(`${texto}`)
})



bot.on('location', ctx => {
    const loc = ctx.update.message.location
    console.log(loc)
    ctx.reply(`Entendido! Você está em: 
        Latitude: ${loc.latitude}, 
        Longitude: ${loc.longitude}`)    
})

bot.on('contact', ctx => {
    const cont = ctx.update.message.contact
    console.log(cont)
    ctx.reply(`Legal! O telefone do ${cont.first_name} é ${cont.phone_number}`)

})

bot.on('voice', ctx => {
    const voz = ctx.update.message.voice
    console.log(voz)
    ctx.reply(`Áudio de ${voz.duration} segundos recebido!`)
})

bot.on('photo', ctx => {
    const foto = ctx.update.message.photo
    console.log(foto)
    console.log(foto.length)
    foto.forEach((ph, i) => {
        ctx.reply(`A ${i}a foto tem resolução de: ${ph.width} X ${ph.height} pixels`)        
    })
})

bot.on('sticker', ctx => {
    const stic = ctx.update.message.sticker
    console.log(stic)
    ctx.reply(`Você enviou o ${stic.emoji} do conjunto ${stic.set_name}`) 
})

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Netflix','Result1'),
    Markup.callbackButton('Amazon Prime Vídeo','Result2'),
    Markup.callbackButton('GloboPlay','Result3'),
    Markup.callbackButton('Disney Plus','Result4'),
], { columns: 2 }))

bot.action('Result1', ctx => {
    ctx.replyWithHTML('<a href="https://www.netflix.com/">Clique aqui para Confirmar.</a>')
})
bot.action('Result2', ctx => {
    ctx.replyWithHTML('<a href="https://www.primevideo.com/">Clique aqui para Confirmar.</a>')
})
bot.action('Result3', ctx => {
    ctx.replyWithHTML('<a href="https://globoplay.globo.com/">Clique aqui para Confirmar.</a>')
})
bot.action('Result4', ctx => {
    ctx.replyWithHTML('<a href="https://www.disneyplus.com/">Clique aqui para Confirmar.</a>')
})

bot.startPolling()