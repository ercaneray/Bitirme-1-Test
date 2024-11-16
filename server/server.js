require("dotenv").config();
const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");
const fs = require('fs');

// Midllewares
const app = express();
app.use(express.json());
app.use(cors());

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// API Endpoints

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send({ error: "Bir mesaj gerekli!" })
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system", "content": `Sen bir fitness koçusun. Gelen kullanıcı bilgilerine göre günlük antrenman programı oluştur. Antreman programı kullancının belirttiği gün kadar gün içermeli ve hareketleri file-zYJ2cCHGCe289VYcN17kLxB0 dosyasından seç. Hareketler gün olarak bölünmeli ve şu formatta geri dönmeli: {
                                                "program": [
                                                    {
                                                        "gün": 1,
                                                        "hareketler": [
                                                            {"adı": EGZERSIZ_ADI, "set": SET_SAYISI, "tekrar": TEKRAR_SAYISI}
                                                        ]
                                                    }
                                                ]
                                            }
                    Eğer format dışı yanıt verirsen, yanıtı düzelt ve doğru JSON formatında yeniden gönder.`},
                { role: "user", content: message }
            ],
            
        });
        res.status(200).send({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).send({ error: error.response ? error.response.data : error.message });
    }
});

// Dosya yükleme

async function upload() {
    const file = await openai.files.create({
        file: fs.createReadStream("GymHareketler.csv"),
        purpose: "assistants",
    });

    console.log(file);
}

// Start Server

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


