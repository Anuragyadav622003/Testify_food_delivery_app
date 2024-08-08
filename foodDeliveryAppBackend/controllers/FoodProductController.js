// controllers/foodProductController.js
const foodProduct = require('../modals/FoodProduct')


// Get all food products
const getFoodProducts = async (req, res) => {
  try {
    const foodProducts = await foodProduct.find();
    res.status(200).json(foodProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food products', error });
  }
};

// Seed the food products
const seedFoodProducts = async (req, res) => {
  try {
    const foodProductApi = [
      {
        id: 21,
        category: "Pizza",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil.",
        price: 130,
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-1080x1080.jpg"
      },
      {
        id: 22,
        category: "Pasta",
        name: "Spaghetti Carbonara",
        description: "Pasta with creamy egg sauce, pancetta, and Parmesan cheese.",
        price: 150,
        image: "https://th.bing.com/th/id/OIP.3MJODhMHPQg6v11AKki79QHaFj?rs=1&pid=ImgDetMain"
      },
      {
        id: 23,
        category: "Dessert",
        name: "Tiramisu",
        description: "Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
        price: 120,
        image: "https://th.bing.com/th/id/OIP.P68JotRqfNNb6c-fVroj4QHaE8?rs=1&pid=ImgDetMain"
      },
      {
        id: 24,
        category: "Pasta",
        name: "Lasagna",
        description: "Layers of pasta, meat sauce, and cheese baked to perfection.",
        price: 160,
        image: "https://galbanicheese.com/wp-content/uploads/2016/10/Cheese-Lasagna-72DPI1-e1476892466909-1024x843.jpg"
      },
      {
        id: 25,
        category: "Indian",
        name: "Chicken Tikka Masala",
        description: "Grilled chicken simmered in a creamy tomato-based sauce with spices.",
        price: 150,
        image: "https://th.bing.com/th/id/OIP.zCXNBA8a9sYzBtHdZLjjeQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.5"
      },
      {
        id: 26,
        category: "Indian",
        name: "Palak Paneer",
        description: "Fresh spinach cooked with paneer (Indian cottage cheese) and spices.",
        price: 130,
        image: "https://th.bing.com/th/id/OIP.UYURV91iSB8xZjxamIcBMgHaE6?w=307&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7"
      },
      {
        id: 27,
        category: "Dessert",
        name: "Gulab Jamun",
        description: "Deep-fried dough balls soaked in sugar syrup, served warm.",
        price: 100,
        image: "https://th.bing.com/th/id/OIP.jHVOWwSFJmKm4WYjoOIS0QHaFk?rs=1&pid=ImgDetMain"
      },
      {
        id: 28,
        category: "Indian",
        name: "Biryani",
        description: "Aromatic rice dish cooked with spices and choice of meat or vegetables.",
        price: 180,
        image: "https://i2.wp.com/www.cookingfromheart.com/wp-content/uploads/2017/05/Chettinad-Mushroom-Biryani-3.jpg?resize=683%2C1024"
      },
      {
        id: 29,
        category: "Sushi",
        name: "California Roll",
        description: "Sushi roll with crab, avocado, and cucumber.",
        price: 120,
        image: "https://thumbs.dreamstime.com/b/sushi-rolls-10413002.jpg"
      },
      {
        id: 30,
        category: "Sushi",
        name: "Tuna Sashimi",
        description: "Fresh sliced tuna served with soy sauce and wasabi.",
        price: 180,
        image: "https://fthmb.tqn.com/KAc_jnFzfAACGmWUPvZ2YtQO5_s=/960x0/filters:no_upscale()/454629837-58a4b2de5f9b58819cf851f5.jpg"
      },
      {
        id: 31,
        category: "Soup",
        name: "Miso Soup",
        description: "Traditional Japanese soup with tofu, seaweed, and green onions.",
        price: 70,
        image: "https://th.bing.com/th/id/OIP.E0C_cG3dMLAqk_vIwGC6GgHaE8?rs=1&pid=ImgDetMain"
      },
      {
        id: 32,
        category: "Japanese",
        name: "Tempura",
        description: "Lightly battered and deep-fried seafood and vegetables.",
        price: 150,
        image: "https://img.freepik.com/premium-photo/fried-tempura-sushi-rolls-with-shrimp-cream-cheese-gherkin-batter-traditional-japanese-cuisine_234595-2890.jpg?w=2000"
      },
      {
        id: 33,
        category: "Burger",
        name: "Cheeseburger",
        description: "Classic burger with cheddar cheese, lettuce, tomato, and pickles.",
        price: 140,
        image: "https://www.foodrepublic.com/wp-content/uploads/2012/03/033_FR11785.jpg"
      },
      {
        id: 34,
        category: "Burger",
        name: "Bacon Burger",
        description: "Burger topped with crispy bacon, cheddar cheese, and BBQ sauce.",
        price: 160,
        image: "https://th.bing.com/th/id/OIP.MbH4e0qBTiAOSVxD6PuYWwAAAA?w=310&h=330&rs=1&pid=ImgDetMain"
      },
      {
        id: 35,
        category: "Snack",
        name: "Fries",
        description: "Golden and crispy fries served with ketchup.",
        price: 70,
        image: "https://th.bing.com/th/id/OIP.9ZMm-N4P8eQfFzLH0qXEzAHaE8?rs=1&pid=ImgDetMain"
      },
      {
        id: 36,
        category: "Beverage",
        name: "Milkshake",
        description: "Creamy milkshake available in chocolate, vanilla, and strawberry flavors.",
        price: 90,
        image: "https://th.bing.com/th/id/OIP.D3gdDxpI_bJdwkEnw2qYPgHaLH?w=564&h=846&rs=1&pid=ImgDetMain"
      },
      {
        id: 37,
        category: "Mexican",
        name: "Beef Tacos",
        description: "Soft tacos filled with seasoned beef, lettuce, cheese, and salsa.",
        price: 100,
        image: "https://th.bing.com/th/id/R.2697a0c25685b45dd041c60c45af0dcf?rik=9gHPXcJe%2f5iHKA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-1sdnpQbk6HE%2fVdwXzzh213I%2fAAAAAAAAE_Q%2fmccQ_tywyJQ%2fs1600%2fAmericanTacoSpiceTacos1web.jpg&ehk=dEYBE%2fbManKxwUucNs057RyRtlRWXC74htVW%2fbFG6pA%3d&risl=&pid=ImgRaw&r=0"
      },
      {
        id: 38,
        category: "Mexican",
        name: "Chicken Burrito",
        description: "Large burrito stuffed with grilled chicken, rice, beans, and cheese.",
        price: 140,
        image: "https://scm-assets.constant.co/scm/ahold/1d89ee8b7b228a83e121d5e8ac2ff95f/b4e09501-41f1-4c94-9a8f-96d3520dbece.jpg#corn-and-quinoa-burritos"
      },
      {
        id: 39,
        category: "Appetizer",
        name: "Guacamole",
        description: "Freshly made guacamole served with tortilla chips.",
        price: 80,
        image: "https://th.bing.com/th/id/R.6e44c7ad0470120b0ea5fbdbe8832096?rik=mDOVznFxOdjcqg&riu=http%3a%2f%2fwww.befriendcooking.com%2falbum%2fimages%2fgallery%2ftaco+bowls.jpg&ehk=LXe%2f3jgO7tiZY1HkuFJ0SNuCtRl5eg0OyMcaIghIV%2b4%3d&risl=&pid=ImgRaw&r=0"
      },
      {
        id: 40,
        category: "Chinese",
        name: "Kung Pao Chicken",
        description: "Stir-fried chicken with peanuts, vegetables, and chili peppers.",
        price: 140,
        image: "https://www.happywok.com.cn/UploadFiles/201452095848.jpg"
      },
      {
        id: 41,
        category: "Chinese",
        name: "Dumplings",
        description: "Steamed or fried dumplings filled with pork, chicken, or vegetables.",
        price: 120,
        image: "https://th.bing.com/th/id/OIP.S0U_hHa-KBU4OTvxQIkL5wHaEK?pid=ImgDet&rs=1"
      },
      {
        id: 42,
        category: "Chinese",
        name: "Sweet and Sour Chicken",
        description: "Crispy chicken pieces tossed in a tangy sweet and sour sauce.",
        price: 130,
        image: "https://th.bing.com/th/id/OIP.b-37uEy77jAdGquQbuFBGAHaEq?rs=1&pid=ImgDetMain"
      }
    ];

    await foodProduct.deleteMany({});
    await foodProduct.insertMany(foodProductApi);

    res.status(200).send('Food products seeded successfully');
  } catch (error) {
    console.error('Error seeding food products:', error);
    res.status(500).send('An error occurred while seeding food products');
  }
};



module.exports = {seedFoodProducts,getFoodProducts};