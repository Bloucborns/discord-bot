const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "!!";

Client.on("ready", () => {
    console.log("Bot Opérationel");
});

Client.once("guildCreate", (guild) => {
    const embed = new MessagENBED()
     .setTitle("Merci D'avoir agouter Support a votre server !")
     .setColor("BLUE")
     .addField("commandes", "Faites, `!help`")
     .addField(
         "Retrouve Moi sur"
     )
     .setFooter("TutoBot", client.user.avatarURL());

    guild.owner.send(embed);
});


Client.on("guildMenmberAdd", menmber => {
    console.log("Un Nouveau Menmbre Est Arrivé");
    menmber.guild.channels.cache.find(channel => channel.id === "816662282229645352").send(menmber.displayName + "Bienvenu A toi Dans Fr/Qc Blouc Bornes !");
    menmber.roles.add("816464796848750632").then(mbr => {
         console.log("Le Role a étés Donnez Avec Sucée pour", + mbr.displayName)
    }).catch(() => {
         console.log("Le role N'a pas pu étre attribué");
    });
});

Client.on("guildMemberRemove", menmber => {
    console.log("Un Menmbre Viens de quiter le Sérveur");
    menmber.guild.channels.cache.find(channel => channel.id === "816662282229645352").send("Un de Nous , Nous a quiter :sob: !");
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                    message.reply("Membre Non ou mal Mentioné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été Bannie avec Succés");
                }
                else {
                    message.reply("Imposible de Bannir ce Menmbre.");
                }
            }
        } 
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou Mal Mentioné")
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été Kick Avec Succés");
                }
                else{
                    message.reply("Impossible de Kick ce Membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentioné. ");
            }
            else {
               mention.roles.add("833363431327137863");
               message.channel.send(mention.displayName + " mute avec Succés."); 
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentioné. ");
            }
            else {
               mention.roles.remove("833363431327137863");
               message.channel.send(mention.displayName + " unmute avec Succés."); 
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();
            
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné .");
            }
            else {
                let args  = message.content.split(" ");

                mention.roles.add("833363431327137863");
                setTimeout(function() {
                    mention.roles.remove("833363431327137863");
                    message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    }
}); 
Client.on("message", message => {    
    if(message.content.startsWith(prefix + "play")){
        if(message.memnber.voice.channel){
            message.memnber.voice.channel.join().then(connection => {
                 let args = message.content.split(" ");

                 if(!args[1]){
                     message.reply("Lien de la video non ou mal mentioné.");
                     connection.disconnect();
                }
                 else {

                 }

                 
                 let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio"}));

                 dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                 });

                 dispatcher.on("error", err => {
                     console.log("erreur de dispatcher : " + err);
                 });
            }).catch(err => {
                message.reply("Erreur lors de la connexion : " + err);
            });
        }
        else {
            message.reply("Vous N'étes Pas connécté en vocale.");
        }
    }
});
Client.on("message", message => {
    if(message.author.bot) return;

    if(message.content == prefix + "Worshop"){
        message.channel.send("Voici Le Worshop Du Sérveur");
    }

    if(message.content == prefix + "Statue"){
        message.channel.send("Sérveur Off");
    }

    if(message.content == prefix + "Aides"){
        message.channel.send("Pour Avoir Besoin d'aide allez dans Question 『❔』question , ou dans un vocale 『📞』 Attend D'aide");
    }
    
    if (message.content == prefix + 'info') {
      message.channel.send('**La communauté Blouc Borns a été crée en Octobre 2020. Pendant la V1, aucun jouuers été connectés. Cest pour ça que nous avons du fermer le serveur mais une V2 ouvre très bientôt avec beaucoup plus de choses intéressantes.**');
    }
  
 
    if (message.content == prefix +'ip') {
      message.channel.send('**(F10) connect 217.182.217.137:27220.**');
    }
  

    if (message.content == prefix + 'help') {
      message.channel.send('**:arrow_down: Commandes A Blouc Borns. :arrow_down:**');
    }
  

    if (message.content == prefix + 'help') {
      message.channel.send('**!!addon: Pour voir la collection.**');
    }
  

    if (message.content == prefix +'help') {
      message.channel.send('**!!ip pour voir IP du serveur.**');
    }
  

    if (message.content == prefix + 'help') {
      message.channel.send('**!!map: Pour savoir la map du serveur.**');
    }
  

    if (message.content == prefix + 'help') {
      message.channel.send('**!!avatar: Pour voir votre avatar Discord **');
    }
  
 
    if (message.content == prefix + 'map') {
        message.channel.send('**Voici la map Dunwood eu**');
    }              


    if (message.content == prefix + 'addon') {
        message.channel.send('**Voici la collection de Blouc Borns steamcommunity.com/sharedfiles/filedetails/?id=2427568342**')
    }


    if (message.content == prefix + 'avatar') {
        message.reply(message.author.displayAvatarURL());
      }
})

Client.login(process.env.TOKEN);