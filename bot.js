const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// יצירת בוט ווצאפ
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// הצגת QR Code לסריקה
client.on('qr', qr => {
    console.log('📱 סרוק את ה-QR Code מהטלפון כדי לחבר את הבוט!');
    qrcode.generate(qr, { small: true });
});

// חיבור מוצלח
client.on('ready', () => {
    console.log('✅ הבוט מחובר לווצאפ!');
});

// קריאת הודעות בקבוצה
client.on('message', async message => {
    if (!message.body.toLowerCase().includes("רוני")) return;

    console.log(`🔹 קיבלתי הודעה: ${message.body}`);
    await message.reply("📌 אני מזהה שפנית אליי, אבל עוד אין לי תשובות חכמות!");
});

// הפעלת הבוט
client.initialize();
