import { Data } from "../models/dataSchema.js";

const month = ["january","february","march","april","may","june","july","august","september","october","november","december"]

export const storeInDB = async ()=>{  
  const resdata  = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
  const data = await resdata.json()
  data.map(item=>{
    Data.create({
      product_id:item.id,
      title:item.title,
      price:item.price,
      description:item.description,
      category:item.category,
      image:item.image,
      sold:item.sold,
      monthSold: getMonth(item.dateOfSale),  
      dateOfSale:item.dateOfSale
    })
  })
}

const getMonth = (s) =>{
  const str = String(s)
  var dateParts = str.split('-');
  return month[dateParts[1]-1];
}

// Get all category route
export const getAllCategory = async (req, res) => {
  try {
    const cata = new Set();
    const data = await Data.find({});
    
    data.forEach(item => {
      cata.add(item.category);
    });

    const result = await Promise.all([...cata].map(async (e) => {
      const no = await Data.find({ category: e }).countDocuments();
      return {
        category: e,
        categoryNo: no
      };
    }));

    return res.status(200).json({
      message:result,
      status: true
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const getPagination = async (req, res) => {
  try {
    const {page, limit} = req.body;
    if(!page || !limit){
      return res.status(400).json({
        message:"All fields are required",
        success:false
      })
    }
    const skip = (page - 1) * limit;
    const totalDocuments = await Data.countDocuments();
    const data = await Data.find()
      .skip(skip)
      .limit(limit)
      .exec();

    const totalPages = Math.ceil(totalDocuments / limit);
    return res.status(200).json({
      message:{
        data,
        pagination: {
          totalDocuments,
          totalPages,
          currentPage: page,
          pageSize: limit
        }
      },
      success:true
    })
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    throw error;
  }
};


// Get statistics
export const getStataForMonth = async (req, res) => {
  try {
    let { month } = req.body;
    month = month.toLowerCase();
    const data = await Data.find({ monthSold: month });
    const totalSaleAmount = data.reduce((total, item) => {
      return total + (item.sold ? parseFloat(item.price) : 0);
    }, 0);
    const totalSoldItems = data.filter(item => item.sold).length;
    const totalUnsoldItems = data.filter(item => !item.sold).length;

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalUnsoldItems
    });
  } catch (error) {
    console.error("Error fetching getStataForMonth data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Searching Item 
export const getItem = async (req, res) => {
  try {
    let { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" , success:false});
    }
    title = title.toLowerCase();
    const data = await Data.find({});
    const filteredData = data.filter(item => 
      
      item.title.toLowerCase().includes(title)
    );
    if (filteredData.length === 0) {
      return res.status(404).json({ message: "No items found", success:false });
    }
    return res.status(200).json({
      message:{filteredData},
      success:true
    });
  } catch (error) {
    console.error("Error fetching items by title", error);  
  }
};


// geting data in ranges 

export const getChartInfo = async (req, res) => {
  try {
    const { month } = req.body;
    const monthLowerCase = month.toLowerCase();
    const data = await Data.find({ monthSold: monthLowerCase });

    let range0to100 = 0;
    let range101to200 = 0;
    let range201to300 = 0;
    let range301to400 = 0;
    let range401to500 = 0;
    let range501to600 = 0;
    let range601to700 = 0;
    let range701to800 = 0;
    let range801to900 = 0;
    let range901andAbove = 0;

    data.forEach(item => {
      const price = parseFloat(item.price);
      if (price >= 0 && price <= 100) {
        range0to100++;
      } else if (price >= 101 && price <= 200) {
        range101to200++;
      } else if (price >= 201 && price <= 300) {
        range201to300++;
      } else if (price >= 301 && price <= 400) {
        range301to400++;
      } else if (price >= 401 && price <= 500) {
        range401to500++;
      } else if (price >= 501 && price <= 600) {
        range501to600++;
      } else if (price >= 601 && price <= 700) {
        range601to700++;
      } else if (price >= 701 && price <= 800) {
        range701to800++;
      } else if (price >= 801 && price <= 900) {
        range801to900++;
      } else if (price >= 901) {
        range901andAbove++;
      }
    });

    const response = {
      month: monthLowerCase,
      priceRanges: [
          {
            name:"0-100",
            items: range0to100
          },
          {
            name:"101-200",
            items: range101to200
          },
          {
            name:"201-300",
            items: range201to300
          },
          {
            name:"301-400",
            items: range301to400
          },
          {
            name:"401-500",
            items: range401to500
          },
          {
            name:"501-600",
            items: range501to600
          },
          {
            name:"601-700",
            items: range601to700
          },
          {
            name:"701-800",
            items: range701to800
          },
          {
            name:"801-900",
            items: range801to900
          },
          {
            name:"901 above",
            items: range901andAbove
          },
        ]
      
    };

    // Return the response
    res.status(200).json({
      message:response,
      success:true
    });
  } catch (error) {
    console.error("Error fetching chart info:", error);
  }
};
