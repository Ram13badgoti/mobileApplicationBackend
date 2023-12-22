import connectToMongoDB from "../database/db.js"


const initialMobiles = [
    { id: 1, name: 'Iphone', price: 1000, type: 'Smartphone', processor: 'A15 Bionic Chip', memory: '6GB', os: 'IOS 15', img:"https://asset20.ckassets.com/resources/image/ckseller/CKS-Mobiles-000140_1-1663849255.jpg" },
    { id: 2, name: 'Oppo', price: 600, type: 'Smartphone', processor: 'Snapdragon', memory: '4GB', os: 'iOS', img: 'https://5.imimg.com/data5/SELLER/Default/2021/12/SR/BW/WT/25006117/oppo-mobiles-phones-500x500.jpeg'  },
    { id: 3, name: 'Vivo', price: 1000, type: 'Smartphone', processor: 'MediaTek', memory: '6GB', os: 'iOS', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2023/09/742006563202309290744.jpg'  },
    { id: 4, name: 'Redmi', price: 400, type: 'Smartphone ', processor: 'MediaTek', memory: '4GB', os: 'Android 12', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2022/11/371199595202304070941.jpg'  },
    { id: 5, name: 'OnePlus', price: 500, type: 'Smartphone', processor: 'Snapdragon', memory: '6GB', os: 'Android 12', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2023/09/367249918202309291153.jpg'  },
    { id: 6, name: 'Motog', price: 700, type: 'Smartphone', processor: ' Snapdragon', memory: '8GB', os: 'Android 12', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2022/11/512268178202304050616.jpg'  },
    { id: 7, name: 'Samsung', price: 700, type: 'Smartphone', processor: 'MediaTek', memory: '6GB', os: 'Android 13', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2022/11/717814375202303280628.jpg'  },
    {id: 8, name: 'RealMe', price: 500, type: 'Smartphone', processor: 'T612', memory: '8GB', os: 'Android 13', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2023/09/728711110202309271232.jpg'},
    {id: 9, name: 'POCO', price: 400, type: 'Smartphone', processor: 'Snapdragon', memory: '6GB', os: 'Android 11', img: 'https://www.top10mobiles.info/images/top10mobiles.com/product/2022/11/9405359202304040908.jpg'},
    {id: 10, name: 'Infinix', price: 400, type: 'Smartphone', processor: 'MediaTek', memory: '4GB', os: 'Android 11', img: 'https://m.media-amazon.com/images/I/31uG4CJG-FL.jpg'}
    // Add more mobiles as needed
  ];
  
  export async function initializeData() {
    const db = await connectToMongoDB();
    const mobilesCollection = db.collection('mobile');

    try {
      // Clear existing data and insert initial data
      await mobilesCollection.deleteMany({});
      await mobilesCollection.insertMany(initialMobiles);
  
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      throw error;
    }
  
}
  