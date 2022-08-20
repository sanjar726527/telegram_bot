const TelegramApi = require('node-telegram-bot-api')
const {getOptions,againOptions} = require('./options')
const token = '5495891988:AAHHW70Cv_lPMy7fxCo7LWS2nkfA2bjMFw8'

const bot = new TelegramApi(token , {polling:true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Man 0 dan 9 gacha bo\'lgan sonlardan birini tanlayman, Siz bu sonni topishingiz kerak')
    const  randomNumber = Math.floor(Math.random() *10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Topishga harakat qilib ko\'ring...',getOptions)
}

const start = () => {

        bot.setMyCommands([
            {command: '/start',description: 'Boshlash'},
            {command: '/info',description: 'Uzimiz haqimizda'},
            {command: '/game',description: 'O\'yin'},
            {command: '/stop',description: 'To\'xtatish'}
        ])

        bot.on('message', async msg => {
            const chatId = msg.from.id
            const text = msg.text

            if(text === '/start'){
                await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
                return bot.sendMessage(chatId, `Assalom alaykum botimizga hush kelibsiz. . .`)
            }

            if(text === '/info'){
                return  bot.sendMessage(chatId, `Sog'ligingiz yaxwimi : ${msg.from.first_name} ${msg.from.last_name}`)
            }
            if(text === '/game'){
                return startGame(chatId)
            }
            return bot.sendMessage(chatId, `Man bu comandani tushunmayman: qaytadan urinib koring . . .`)
        })

        bot.on('callback_query', msg => {
            const data = msg.data
            const chatId = msg.message.chat.id
            if(data === '/again'){
               return startGame(chatId)
            }
            if (data === chats[chatId]){
                bot.sendMessage(chatId, `Siz to'gri javob topdingiz ${chats[chatId]}`,againOptions)
            }else{
                bot.sendMessage(chatId, `Afsuski,siz no'to'gri javob topdingiz ${chats[chatId]}`,againOptions)
            }
            console.log(data)
            console.log(chats[chatId])
        })
}

start()