const puppeteer = require('puppeteer');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get("/",(req,res)=>{
    calis()
    res.sendFile(__dirname+"/index.html")
})


let element=[[],[],[]]
function degeral(tip,elements){
    let sayac=0;
    elements.forEach(async elements=>{
        element[tip][sayac++] = await (await elements.getProperty('innerText')).jsonValue();
    })
}


const calis = async() => {

    const browser = await puppeteer.launch(
        {
            "headless": true,
            "slowMo": 20
        });
    const page = await browser.newPage();
    await page.goto('https://canlidoviz.com/');

    //#region diğer kodlar
    //tıklatma
    // setTimeout(async function(){
    //     await page.$eval('.wpqa-question ', form => form.click() );
    // }, 2000)

    //tekli seçim
    //const inner_html = await page.evaluate(()=>document.querySelector('.main-nav .we.waves-effect.waves-classic.waves-button'));
    //#endregion

    const elements1 = await page.$$('.grid.grid-bordered.grid-space-15 .col-lg-4:nth-child(1) table tr td:nth-child(4)');
    const elements2 = await page.$$('.grid.grid-bordered.grid-space-15 .col-lg-4:nth-child(2) table tr td:nth-child(4)');
    const elements3 = await page.$$('.grid.grid-bordered.grid-space-15 .col-lg-4:nth-child(3) table tr td:nth-child(4)');
    setInterval(() => {
        degeral(0,elements1)
        degeral(1,elements2)
        degeral(2,elements3)
        io.emit('element', element);
    }, 500)


    // io.on('connection', (socket) => {
    //     socket.on('chat message', (msg) => {
    //       io.emit('chat message', msg);
    //     });
    // });







}



http.listen(3000)

