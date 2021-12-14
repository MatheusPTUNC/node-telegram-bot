const env = require('../.env')
const Telegraf = require('telegraf')
const axios = require('axios')
const Markup = require('telegraf/markup')
const { Telegram } = require('telegraf')

const enviarMensagem = msg => {
    axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(msg)}`)
        .catch(e => console.log(e))
}

//enviarMensagem(`Enviando a mensagem de forma assíncrona`)

const teclado = Markup.keyboard([
    ['OK','Cancelar']
]).resize().oneTime().extra()

const telegram = new Telegram(env.token)
telegram.sendMessage(
    env.userID, 
    'Essa é uma mensagem com teclado!', 
    teclado
)