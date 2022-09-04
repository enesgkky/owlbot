const Discord = require('discord.js');
const { lchown } = require('fs');
const { maxHeaderSize } = require('http');
const client = new Discord.Client();

//---------------PREFİX----------------

const prefix = require('./prefix.json');
//-------------------------------------

function veri() {
    const durum_dosya = require("./prefix.json");
    var durum = durum_dosya.otorol;
    return durum;
};

client.on('ready', async() => {
    console.log(`Bot aktif! ${client.user.tag}!`);
    client.user.setActivity('OWL Discord Sunucusu', { type: 'PLAYING' })
        .then(presence => console.log('Durum ---> OWL DİSCORD SUNUCUSU oldu'))
        .catch(console.error);
});
client.on('message', msg => {
    if (msg.content.toLowerCase() === prefix.prefix + 'discord') {
        msg.channel.send('https://discord.gg/3xrBFx8q2h')
        msg.reply('Sınırsız Davet Linki 🥳')
    }
});
client.on('message', msg => {
    if (msg.content.toLowerCase() === 'sa') {
        msg.react('👋')
        msg.reply('Aleyküm Selam Kardeşim Hoşgeldin.')
    }
});
/*client.on('guildMemberAdd', member => {
    const giriscikiskanal = member.guild.channels.cache.find(channel => channel.name === 'geliştirici-özel');
    giriscikiskanal.send(`${member} Sunucuya Katıldı.`);
});*/
/*client.on('guildMemberRemove', member => {
    const giriscikiskanal = member.guild.channels.cache.find(channel => channel.name === 'geliştirici-özel');
    giriscikiskanal.send(`${member} Sunucudan Ayrıldı.`);
});*/
client.on('message', msg => {
    if (!msg.guild) return;
    if (msg.content.startsWith('o!kick')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(`Bu komutu kullanmaya yetkin yetmiyor malesef \n  <@${msg.author.id}`);
        const user = msg.mentions.users.first();
        const args = msg.content.split(' ').slice(2)
        const botmsg = args.join(" ")
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member
                    .kick('Opsiyonel')
                    .then(() => {
                        const log = msg.guild.channels.cache.find(channel => channel.name === 'geliştirici-özel');
                        const kickduyurumsg = new Discord.MessageEmbed()
                            .setTitle(`❗️  **OWL Discord Botu**  ❗️`)
                            .setColor('RED')
                            .addField('Atılan Kişi:', `>>> ${user.tag}`)
                            .addField('Atan Kişi:', `>>> ${msg.author.tag}`)
                            .addField('Atılma Sebebi:', '>>> ' + botmsg)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1012529188680511580/1012821710518620251/Logo2.jpeg')
                            /*const logmsg = new Discord.MessageEmbed()
                                .setTitle(`${user.tag} Adlı kişi ${msg.author.tag} tarafından atıldı.`);
                            log.send(logmsg)*/
                        msg.channel.send(kickduyurumsg)
                    })
                    .catch(err => {
                        const kanal = new Discord.MessageEmbed()
                            .setTitle(`${user.tag} Adlı kişi atılamadı. Başarısız!`);
                        msg.channel.send(kanal);
                        console.error(err);
                    });
            } else {
                msg.reply('Bahsettiğin kişi bu sunucuda bulunmamaktadır.');
            };
        } else {
            msg.reply('Kicklemek istediğin kişiyi yazmadın!');
        }
    }
});
client.on('message', msg => {
    if (!msg.guild) return;
    if (msg.content.startsWith('o!ban')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(`Bu komutu kullanmaya yetkin yetmiyor malesef \n  <@${msg.author.id}`);
        const user = msg.mentions.users.first();
        const args = msg.content.split(' ').slice(2)
        const botmsg = args.join(" ")
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member
                    .ban()
                    .then(() => {
                        const log = msg.guild.channels.cache.find(channel => channel.name === 'geliştirici-özel');
                        const kickduyurumsg = new Discord.MessageEmbed()
                            .setTitle(`❗️  **OWL Discord Botu**  ❗️`)
                            .setColor('RED')
                            .addField('Yasaklanan Kişi:', `>>> ${user.tag}`)
                            .addField('Yasaklayan Kişi:', `>>> ${msg.author.tag}`)
                            .addField('Yasaklanma Sebebi:', '>>> ' + botmsg)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1012529188680511580/1012821710518620251/Logo2.jpeg')
                            /*const logmsg = new Discord.MessageEmbed()
                                .setTitle(`${user.tag} Adlı kişi ${msg.author.tag} tarafından atıldı.`);
                            log.send(logmsg)*/
                        msg.channel.send(kickduyurumsg)
                    })
                    .catch(err => {
                        msg.reply('Malesef bu kişiyi yasaklayamıyorum.');
                        console.error(err);
                    });
            } else {
                msg.reply('Bahsettiğin kişi bu sunucuda bulunmamaktadır.');
            };
        } else {
            msg.reply('Yasaklamak istediğin kişiyi yazmadın!');
        }
    }
});

client.on('message', msg => {
    const members = msg.guild.members.cache
    const emojis = msg.guild.emojis.cache
    const roles = msg.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString());
    if (msg.content.toLowerCase() === prefix.prefix + 'durum') {
        const kanal = new Discord.MessageEmbed()
            .setTitle('*-_  OWL DİSCORD SUNUCUSU  _-*')
            .setAuthor('developer by enesgkky')
            .setColor('PURPLE')
            .setThumbnail('https://cdn.discordapp.com/attachments/1012529188680511580/1012821710518620251/Logo2.jpeg')
            .addField("Mevcudiyet",
                `**❯ Total Üye:** \`${msg.guild.memberCount}\`\n` +
                `**❯ İnsan:** \`${members.filter(member => !member.user.bot).size}\`\n` +
                `**❯ Botlar:** \`${members.filter(member => member.user.bot).size}\`\n`)
            .addField("İstatistik",
                `**❯ Rol Sayısı:** \`${roles.length}\`\n` +
                `**❯ Emoji Sayısı:** \`${emojis.size}\`\n` +
                `**❯ Düzenli Emoji Sayısı:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n` +
                `**❯ Animasyonlu Emoji Sayısı:** \`${emojis.filter(emoji => emoji.animated).size}\`\n` +
                `**❯ Boost Sayısı:** \`${msg.guild.premiumSubscriptionCount || "0"}\``)
            .setTimestamp();
        msg.channel.send(kanal)
    }
});
client.on('message', msg => {
    if (msg.content.startsWith(prefix.prefix + 'rolver')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Bu komutu kullanmaya yetkin yok.');
        try {
            let rol = msg.mentions.roles.first();
            let üye = msg.mentions.members.first();
            üye.roles.add(rol);
        } catch (err) {
            console.log(err)
        }
    }
});
client.on('message', msg => {
    if (msg.content.startsWith(prefix.prefix + 'rolal')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Bu komutu kullanmaya yetkin yok.');
        try {
            let rol = msg.mentions.roles.first();
            let üye = msg.mentions.members.first();
            üye.roles.remove(rol);
        } catch (err) {
            console.log(err)
        }
    }
});
client.on('message', msg => {
    if (msg.content.startsWith(prefix.prefix + 'oylama')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Bu komutu kullanmaya yetkin yok.');
        const args = msg.content.split(' ').slice(1)
        const botmsg = args.join(" ")
        if (!botmsg) return msg.reply('Oylamanın ne olacağını yazmadın.');
        msg.delete(msg.author)
        const embed = new Discord.MessageEmbed()
            .setTitle('🎉 **OYLAMA** 🎉')
            .setDescription(botmsg)
            .setFooter(`Oluşturan ${msg.author.tag}`);
        msg.channel.send({ embed: embed }).then(embedMessage => {
            embedMessage.react('✅')
            embedMessage.react('❌')
        })
    }
});
client.on('message', msg => {
    if (msg.content.startsWith(prefix.prefix + 'duyuru')) {
        const kanal = msg.mentions.channels.first();
        const args = msg.content.split(' ').slice(2);
        const botmsg = args.join(" ");
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Bu komutu kullanmaya yetkin yok.');
        if (!botmsg) return msg.reply('Duyurunun ne olacağını yazmadın.');
        if (!kanal) return msg.reply('Duyurunun hangi kanalda olucağını belirtmen lazım.');
        kanal.send('@everyone')
        msg.delete(msg.author)
        const embed = new Discord.MessageEmbed()
            .setTitle('📢  **DUYURU**  📢')
            .setDescription(botmsg)
            .setFooter(`Oluşturan ${msg.author.tag}`)
        kanal.send(embed)
    }
});
client.on('message', async msg => {
    if (msg.content.startsWith(prefix.prefix + 'play')) {
        const args = msg.content.split(' ').slice(1);
        const botmsg = args.join(" ");
        if (!botmsg) return msg.reply('Herhangi bir URL girmedin.');
        if (msg.member.voice.channel) {
            const membed = new Discord.MessageEmbed()
                .setTitle('🎶     OWL Discord Bot | Music Menu     🎶')
                .addField('Oynatılıyor...', `>>>   ${botmsg}`)
                .addField('Durdurmak İçin: ', '>>>   o!stop')
                .addField(`Müziği açan kişi`, `>>>   ${msg.author.tag}`)
            msg.channel.send(membed)
            const connection = await msg.member.voice.channel.join();
            const ytdl = require('ytdl-core');
            connection.play(ytdl(`${botmsg}`, { filter: 'audioonly' }))
        } else {
            msg.reply('Bir sesli kanala katılman gerekiyor')
        }
    }
});
client.on('message', async msg => {
    if (msg.content.startsWith(prefix.prefix + 'stop')) {
        const membed = new Discord.MessageEmbed()
            .setTitle('Müzik kapatılıyor...')
            .setFooter(`${msg.author.tag}`)
        msg.channel.send(membed)
        msg.member.voice.channel.leave();
    }
});
client.on('message', msg => {
    const args = msg.content.split(' ').slice(1);
    const botmsg = args.join(" ");
    if (msg.content.startsWith(prefix.prefix + 'temizle')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Bu komutu kullanmaya yetkin yok.');
        msg.channel.bulkDelete(Number(botmsg))
        msg.channel.send(`:white_check_mark:   ${args} tane mesaj silindi.`)
    }
});
client.on('message', msg => {
    if (msg.content.startsWith(prefix.prefix + 'yardım')) {
        const menu = new Discord.MessageEmbed()
            .setTitle('🦉----------------**OWL Discord Bot Menü**-----------------🦉')
            .addField('Moderasyon Komutları: ', '   o!kick [username] [açıklama]\n  o!ban [username] [açıklama]\n   o!temizle [adet]\n  o!rolver [kullanıcı] [rol]\n    (Rolver komutu biraz buglu olabilir hata durumunda bot kendini yeniden başlatır.)')
            .addField('Özel Komutlar: ', '   o!duyuru [kanal_ismi] [mesaj]\n  o!oylama [mesaj]')
            .addField('Müzik Komutları: ', '   o!play [video URL]\n  o!stop')
            .addField('Genel: ', '   o!durum\n      o!discord\n     ')
            .setColor('PURPLE')
            .setAuthor('developer by enesgkky')
            .setFooter('------------------------------------------------Version 0.0.2---------------------------------------------------')
            .setThumbnail('https://cdn.discordapp.com/attachments/1012529188680511580/1012821710518620251/Logo2.jpeg')
        msg.channel.send(menu)
    }
});
client.login('MTAxMjQyOTQ1OTgyNTExNTIyOQ.GjEkWJ.h8q531AR1zJCWvtK0AP805y4Wu3gqgHSQdftZ4');