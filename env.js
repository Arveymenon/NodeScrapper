// TEMP_USER_ID=6fab8e1c-3c2c-46fc-8596-1c52d96202b5
const env = {
    heroku:{
        path: "https://arveyscrapper.herokuapp.com/"
    },
    mode: 'production',
    Links: {
        amazon: {
            production: 'https://www.amazon.in/Sony-Playstation-Standard-Console-Ultra/dp/B08FC5L3RG',
            testing: 'https://www.amazon.in/Sony-CFI-ZCT1W-DualSense-wireless-controller/dp/B08GZ6QNTC/ref=dp_prsubs_2'
        },
        flipkart: {
            production: 'https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa',
            testing: 'https://www.flipkart.com/sony-ps5-dualsense-wireless-controller/p/itm236e858323977'
        },
        GamesTheShop: {
            production: 'https://www.gamestheshop.com/PlayStation-5-Console/5111',
            testing: 'https://www.gamestheshop.com/Dualsense-Wireless-Controller-Midnight-Black/5738'
        },
        ShopAtSC: {
            production: 'https://shopatsc.com/collections/playstation-5/products/playstation-5-console-store',
            testing: 'https://shopatsc.com/products/ps4-1tb-hzd-ce-gtsii-r-c-ps-3m'
        }
    }
}

module.exports = env;