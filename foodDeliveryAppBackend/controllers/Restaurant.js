const { Restaurant } = require("../modals/restaurants");

// Controller to store restaurants
const storeRestaurant = async (req, res) => {
    try {
        const restaurantsData = [
            {
              id: 1,
              name: 'Delicious Delights',
              image: 'https://th.bing.com/th/id/OIP.Xd9yRm2lNZ5qqLsB72fqnQHaE8?rs=1&pid=ImgDetMain',
              cuisine: 'Italian',
              rating: 4.5,
              address: {
                street: '123 Main Street',
                city: 'Cityville',
                state: 'State A',
                zip: '12345',
                country: 'India'
              },
              openingHours: 'Monday-Sunday: 11:00 AM - 10:00 PM',
              contact: '(123) 456-7890',
              description: 'A cozy Italian restaurant specializing in handmade pasta and authentic pizzas.',
              menu: [
                {
                  id: 1,
                  name: 'Margherita Pizza',
                  description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
                  price: 130,
                  image: 'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-1080x1080.jpg',
                },
                {
                  id: 2,
                  name: 'Spaghetti Carbonara',
                  description: 'Pasta with creamy egg sauce, pancetta, and Parmesan cheese.',
                  price: 150,
                  image: 'https://th.bing.com/th/id/OIP.3MJODhMHPQg6v11AKki79QHaFj?rs=1&pid=ImgDetMain',
                },
                {
                  id: 3,
                  name: 'Tiramisu',
                  description: 'Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.',
                  price: 120,
                  image: 'https://th.bing.com/th/id/OIP.P68JotRqfNNb6c-fVroj4QHaE8?rs=1&pid=ImgDetMain',
                },
                {
                  id: 4,
                  name: 'Lasagna',
                  description: 'Layers of pasta, meat sauce, and cheese baked to perfection.',
                  price: 160,
                  image: 'https://th.bing.com/th/id/OIP.G71UFlO-x-lHNB6Y6wntoAHaE8?rs=1&pid=ImgDetMain',
                },
              ],
            },
            {
              id: 2,
              name: 'Spice Valley',
              image: 'https://th.bing.com/th/id/OIP.QCrP4CvN7EcTMY7KFWxNTgHaEK?rs=1&pid=ImgDetMain',
              cuisine: 'Indian',
              rating: 4.7,
              address: {
                street: '456 Oak Avenue',
                city: 'Townsville',
                state: 'State B',
                zip: '56789',
                country: 'India'
              },
              openingHours: 'Monday-Sunday: 12:00 PM - 11:00 PM',
              contact: '(987) 654-3210',
              description: 'Experience the flavors of India with our aromatic curries and tandoori specialties.',
              menu: [
                {
                  id: 1,
                  name: 'Chicken Tikka Masala',
                  description: 'Grilled chicken simmered in a creamy tomato-based sauce with spices.',
                  price: 150,
                  image: 'https://th.bing.com/th/id/OIP.zCXNBA8a9sYzBtHdZLjjeQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.5',
                },
                {
                  id: 2,
                  name: 'Palak Paneer',
                  description: 'Fresh spinach cooked with paneer (Indian cottage cheese) and spices.',
                  price: 130,
                  image: 'https://th.bing.com/th/id/OIP.UYURV91iSB8xZjxamIcBMgHaE6?w=307&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                },
                {
                  id: 3,
                  name: 'Gulab Jamun',
                  description: 'Deep-fried dough balls soaked in sugar syrup, served warm.',
                  price: 100,
                  image: 'https://th.bing.com/th/id/OIP.jHVOWwSFJmKm4WYjoOIS0QHaFk?rs=1&pid=ImgDetMain',
                },
                {
                  id: 4,
                  name: 'Biryani',
                  description: 'Aromatic rice dish cooked with spices and choice of meat or vegetables.',
                  price: 180,
                  image: 'https://th.bing.com/th/id/OIP.V4GJ3kStabB4-xFxUQk8pwHaE8?rs=1&pid=ImgDetMain',
                },
              ],
            },
            {
              id: 3,
              name: 'Sushi Paradise',
              image: 'https://th.bing.com/th/id/OIP.HGZYzk0A3-q9SJsPBirhsQHaFj?w=1500&h=1125&rs=1&pid=ImgDetMain',
              cuisine: 'Japanese',
              rating: 4.8,
              address: {
                street: '789 Maple Lane',
                city: 'Bankat',
                state: 'Uttar Pradesh',
                zip: '273405',
                country: 'India'
              },
              openingHours: 'Monday-Sunday: 11:00 AM - 10:00 PM',
              contact: '(555) 123-4567',
              description: 'A premium sushi restaurant offering fresh and authentic sushi and sashimi.',
              menu: [
                {
                  id: 1,
                  name: 'California Roll',
                  description: 'Sushi roll with crab, avocado, and cucumber.',
                  price: 120,
                  image: 'https://th.bing.com/th/id/OIP.f4TJ7kzH0wEN4U8QdoW7zQHaE7?pid=ImgDet&rs=1',
                },
                {
                  id: 2,
                  name: 'Tuna Sashimi',
                  description: 'Fresh sliced tuna served with soy sauce and wasabi.',
                  price: 180,
                  image: 'https://th.bing.com/th/id/OIP.hK7yKEXOQoOL35R53SbVFAHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 3,
                  name: 'Miso Soup',
                  description: 'Traditional Japanese soup with tofu, seaweed, and green onions.',
                  price: 70,
                  image: 'https://th.bing.com/th/id/OIP.lxQ5GlCbFSc5twdrgqXteQHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 4,
                  name: 'Tempura',
                  description: 'Lightly battered and deep-fried seafood and vegetables.',
                  price: 150,
                  image: 'https://th.bing.com/th/id/OIP.6lz_LbqZ0hG-fcPaHX3_XAHaE7?pid=ImgDet&rs=1',
                },
              ],
            },
            {
              id: 4,
              name: 'Burger Haven',
              image: 'https://th.bing.com/th/id/OIP.yrVAOS_GBG8uNIR3zfxe0gAAAA?w=181&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7',
              cuisine: 'American',
              rating: 4.4,
              address: {
                street: '321 Elm Street',
                city: 'BurgerTown',
                state: 'Uttar Pradesh',
                zip: '34567',
                country: 'India'
              },
              openingHours: 'Monday-Sunday: 10:00 AM - 11:00 PM',
              contact: '(555) 987-6543',
              description: 'A popular burger joint known for its juicy burgers and crispy fries.',
              menu: [
                {
                  id: 1,
                  name: 'Cheeseburger',
                  description: 'Classic burger with cheddar cheese, lettuce, tomato, and pickles.',
                  price: 140,
                  image: 'https://th.bing.com/th/id/OIP.VG5fgEEM5BaBO0hOYYCDAAAAAA?pid=ImgDet&rs=1',
                },
                {
                  id: 2,
                  name: 'Bacon Burger',
                  description: 'Burger topped with crispy bacon, cheddar cheese, and BBQ sauce.',
                  price: 160,
                  image: 'https://th.bing.com/th/id/OIP.1dG1vlA9xJk8rMnVUNHycAHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 3,
                  name: 'Fries',
                  description: 'Golden and crispy fries served with ketchup.',
                  price: 70,
                  image: 'https://th.bing.com/th/id/OIP.1t_pP2QosDop6JD11huE0AHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 4,
                  name: 'Milkshake',
                  description: 'Creamy milkshake available in chocolate, vanilla, and strawberry flavors.',
                  price: 90,
                  image: 'https://th.bing.com/th/id/OIP.EP2HDi5_gmG4Lt6rEdqZrQHaE8?pid=ImgDet&rs=1',
                },
              ],
            },
            {
              id: 5,
              name: 'Taco Fiesta',
              image: 'https://cdn.vox-cdn.com/thumbor/Qr3BQXUAQGzfvDGVs0NX6GjaT5Q=/110x0:1890x1335/1520x1013/filters:focal(110x0:1890x1335)/cdn.vox-cdn.com/uploads/chorus_image/image/48974685/taco-fiesta-exterior.0.0.jpg',
              cuisine: 'Mexican',
              rating: 4.6,
              address: {
                street: '654 Pine Street',
                city: 'Narayanpur',
                state: 'Uttar Pradesh',
                zip: '273407',
                country: 'India'
              },
              openingHours: 'Monday-Sunday: 11:00 AM - 11:00 PM',
              contact: '(555) 678-9101',
              description: 'A vibrant Mexican restaurant offering a variety of tacos, burritos, and margaritas.',
              menu: [
                {
                  id: 1,
                  name: 'Beef Tacos',
                  description: 'Soft tacos filled with seasoned beef, lettuce, cheese, and salsa.',
                  price: 100,
                  image: 'https://th.bing.com/th/id/OIP.mF07OvoUR7quMxLJ2Jww9QHaEK?pid=ImgDet&rs=1',
                },
                {
                  id: 2,
                  name: 'Chicken Burrito',
                  description: 'Large burrito stuffed with grilled chicken, rice, beans, and cheese.',
                  price: 140,
                  image: 'https://th.bing.com/th/id/OIP.9mEl1rjsoujMG3Bl4wAzXgHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 3,
                  name: 'Guacamole',
                  description: 'Freshly made guacamole served with tortilla chips.',
                  price: 80,
                  image: 'https://th.bing.com/th/id/OIP.ZXa-IFtqNveguX-Eqip7OgHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 4,
                  name: 'Margarita',
                  description: 'Classic lime margarita served on the rocks or frozen.',
                  price: 150,
                  image: 'https://th.bing.com/th/id/OIP.g3fq5HJ7xMOCuc_iRFM6zwHaE8?pid=ImgDet&rs=1',
                },
              ],
            },
            {
              id: 6,
              name: 'Wok n Roll',
              image: 'https://th.bing.com/th/id/OIP.ML6f3QNVdH2j9TZyD-YKgAHaE8?w=246&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
              cuisine: 'Chinese',
              rating: 4.3,
              address: {
                street: '789 Dragon Street',
                city: 'Chinatown',
                state: 'State F',
                zip: '23456',
                country: 'India'
              },
              openingHours: 'Monday-Sunday: 11:30 AM - 10:30 PM',
              contact: '(555) 234-5678',
              description: 'Authentic Chinese dishes including dim sum, noodles, and stir-fries.',
              menu: [
                {
                  id: 1,
                  name: 'Dumplings',
                  description: 'Steamed or fried dumplings with pork or vegetables.',
                  price: 90,
                  image: 'https://th.bing.com/th/id/OIP.3kM9SL0EPhwMQJcUSKp8YwHaFj?pid=ImgDet&rs=1',
                },
                {
                  id: 2,
                  name: 'Kung Pao Chicken',
                  description: 'Spicy stir-fried chicken with peanuts and vegetables.',
                  price: 120,
                  image: 'https://th.bing.com/th/id/OIP.PJ16zT2bc9Z1FZoMKnYXsQHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 3,
                  name: 'Chow Mein',
                  description: 'Stir-fried noodles with vegetables and choice of meat.',
                  price: 100,
                  image: 'https://th.bing.com/th/id/OIP.NBwRZV8FgZ4XO5EnDjDpEQHaE8?pid=ImgDet&rs=1',
                },
                {
                  id: 4,
                  name: 'Spring Rolls',
                  description: 'Crispy rolls filled with vegetables and sometimes meat, served with dipping sauce.',
                  price: 80,
                  image: 'https://th.bing.com/th/id/OIP.CNpZSTB7S9l3Fh6JedF_jwHaE8?pid=ImgDet&rs=1',
                },
              ],
            },
            // Add more restaurants as needed
          ];
          

        for (let data of restaurantsData) {
            const restaurant = new Restaurant(data);
            await restaurant.save();
        }

        res.status(201).send({ message: 'Restaurants stored successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Failed to store restaurants', error });
    }
};

// Controller to get all restaurants
const getRestaurants = async (req, res) => {
    try { 
        const restaurants = await Restaurant.find();
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve restaurants', error });
    }
};



module.exports = { storeRestaurant, getRestaurants};
