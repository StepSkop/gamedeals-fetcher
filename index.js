const axios = require('axios')
var alreadyKnown = [5000, 851, 853]
setInterval(() => {
    axios.get('https://www.gamerpower.com/api/filter?platform=epic-games-store.steam.gog.battlenet.ubisoft-connect.origin&sort-by=rarity&type=game')
    .then((res) => {

        console.log('Checked')
        console.log(alreadyKnown)
    
        var newKnown = []
            for (let index = 0; index < alreadyKnown.length; index++) {
                const knownId = alreadyKnown[index]

                for (let indexY = 0; indexY < Object.keys(res.data).length; indexY++) {
                    const foundId = res.data[indexY].id
                    if (knownId === foundId) {
                        newKnown.push(foundId)
                    }
                }
            }
            alreadyKnown = newKnown
        for (let index = 0; index < Object.keys(res.data).length; index++) {



            const element = res.data[index]
            if (element.end_date === 'N/A' || alreadyKnown.includes(element.id)) {
                return
            }
            //##########################################################

            console.log(element.title)
            var withouTime = element.end_date.substr(0,element.end_date.indexOf(' '))
            function convertDigitIn(str){
            return str.split('-').reverse().join('/');
            }
            //console.log(convertDigitIn(withouTime))
            //##########################################################
            alreadyKnown.push(element.id)
        }
        
    })
}, 2000);
