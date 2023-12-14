import { Router } from 'express';
const homeController = Router();

let mockData = [
    {
        title: 'AMD Ryzen 7800X3D 16-Thread Processor',
        url: 'https://www.amazon.com/AMD-Ryzen-7800X3D-16-Thread-Processor/dp/B0BTZB7F88/ref=sr_1_30?qid=1698443786&s=electronics&sr=1-30'
    },
    {
        title: 'Raycon Bluetooth Wireless Earbuds with Charging Case',
        url: 'https://www.amazon.com/Raycon-Bluetooth-Wireless-Earbuds-Charging/dp/B09HFCY5MP/ref=sr_1_31_sspa?qid=1698443986&s=electronics&sr=1-31-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9idGZfYnJvd3Nl&psc=1'
    },
    {
        title: 'Logitech Wireless Computer Mouse with Unifying Receiver',
        url: 'https://www.amazon.com/Logitech-Wireless-Computer-Unifying-Receiver/dp/B087Z5WDJ2/ref=sr_1_22?qid=1698443986&s=electronics&sr=1-22'
    }
];


homeController.get('/test', (req, res) => {

    res.status(200).json(mockData[1]);
});

homeController.post('/test', (req, res) => {
    // console.log(req.body);
    // const data = req.body
    // const updatedData = mockData.map((x, index) => ({ ...x, title: data[index].title }));
    // mockData[1] = req.body;




    res.status(200).json(mockData[1]);
});


homeController.get('/', (req, res) => res.status(200).json({ hello: 'Hello World !' }));


export { homeController };
