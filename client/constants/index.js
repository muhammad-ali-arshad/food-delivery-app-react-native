// ================= IMAGES (match actual files) =================

const images = {
  pizza: require("../assets/images/pizza.jpg"),
  pizzaDish: require("../assets/images/pizzaDish.jpg"),
  burger: require("../assets/images/burger.png"),
  burgerDish: require("../assets/images/burgerDish.jpg"),
  pasta: require("../assets/images/pasta.png"),
  pastaDish: require("../assets/images/pastaDish.png"),
  chinese: require("../assets/images/chinese.jpg"),
  noodlesDish: require("../assets/images/noodlesDish.png"),
  dessert: require("../assets/images/dessert.png"),
  dessertDish: require("../assets/images/dessertDish.png"),
  pizzaIcon: require("../assets/images/pizzaIcon.png"),
};

const getImage = (key) => images[key];

// ================= FEATURED DATA =================

export const featured = {
  id: 1,
  title: 'Hot and Spicy',
  description: 'Soft and tender fried chicken',
  restaurants: [
    {
      id: 1,
      name: 'Papa Johns',
      image: getImage('pizza'),
      description: 'Hot and spicy pizzas',
      lng: 38.2145602,
      lat: -85.5324269,
      address: '434 Second Street',
      stars: 4,
      reviews: '4.4k',
      category: 'Fast Food',
      dishes: [
        {
          id: 1,
          name: 'Pepperoni Pizza',
          description: 'Cheesy garlic pizza',
          price: 10,
          image: getImage('pizzaDish'),
        },
        {
          id: 2,
          name: 'Cheese Burst',
          description: 'Extra cheese overload',
          price: 12,
          image: getImage('pizzaDish'),
        },
        {
          id: 3,
          name: 'Veg Supreme',
          description: 'Loaded with veggies',
          price: 9,
          image: getImage('pizzaDish'),
        },
        {
          id: 4,
          name: 'BBQ Chicken',
          description: 'Smoky BBQ chicken pizza',
          price: 13,
          image: getImage('pizzaDish'),
        },
      ],
    },

    {
      id: 2,
      name: 'Burger Queen',
      image: getImage('burger'),
      description: 'Juicy burgers & fries',
      lng: 38.2155602,
      lat: -85.5344269,
      address: '210 King Street',
      stars: 4.2,
      reviews: '3.1k',
      category: 'Burgers',
      dishes: [
        {
          id: 1,
          name: 'Classic Burger',
          description: 'Beef patty with cheese',
          price: 8,
          image: getImage('burgerDish'),
        },
        {
          id: 2,
          name: 'Double Patty',
          description: 'Two patties, extra cheese',
          price: 11,
          image: getImage('burgerDish'),
        },
        {
          id: 3,
          name: 'Chicken Burger',
          description: 'Crispy chicken fillet',
          price: 9,
          image: getImage('burgerDish'),
        },
        {
          id: 4,
          name: 'Fries Combo',
          description: 'Burger with fries',
          price: 10,
          image: getImage('burgerDish'),
        },
      ],
    },

    {
      id: 3,
      name: 'Italiano',
      image: getImage('pasta'),
      description: 'Authentic Italian taste',
      lng: 38.2165602,
      lat: -85.5364269,
      address: '78 Rome Avenue',
      stars: 4.6,
      reviews: '2.8k',
      category: 'Italian',
      dishes: [
        {
          id: 1,
          name: 'Alfredo Pasta',
          description: 'Creamy white sauce pasta',
          price: 14,
          image: getImage('pastaDish'),
        },
        {
          id: 2,
          name: 'Red Sauce Pasta',
          description: 'Classic tomato sauce',
          price: 12,
          image: getImage('pastaDish'),
        },
        {
          id: 3,
          name: 'Lasagna',
          description: 'Layered pasta delight',
          price: 15,
          image: getImage('pastaDish'),
        },
        {
          id: 4,
          name: 'Garlic Bread',
          description: 'Toasted garlic bread',
          price: 6,
          image: getImage('pastaDish'),
        },
      ],
    },

    {
      id: 4,
      name: 'Dragon Wok',
      image: getImage('chinese'),
      description: 'Chinese & Asian cuisine',
      lng: 38.2185602,
      lat: -85.5384269,
      address: '99 Dragon Street',
      stars: 4.3,
      reviews: '1.9k',
      category: 'Chinese',
      dishes: [
        {
          id: 1,
          name: 'Chow Mein',
          description: 'Stir fried noodles',
          price: 9,
          image: getImage('noodlesDish'),
        },
        {
          id: 2,
          name: 'Spring Rolls',
          description: 'Crispy veggie rolls',
          price: 6,
          image: getImage('noodlesDish'),
        },
        {
          id: 3,
          name: 'Fried Rice',
          description: 'Rice with veggies & egg',
          price: 8,
          image: getImage('noodlesDish'),
        },
        {
          id: 4,
          name: 'Manchurian',
          description: 'Spicy Indo-Chinese',
          price: 10,
          image: getImage('noodlesDish'),
        },
      ],
    },

    {
      id: 5,
      name: 'Sweet Treats',
      image: getImage('dessert'),
      description: 'Desserts & shakes',
      lng: 38.2195602,
      lat: -85.5404269,
      address: '56 Sugar Lane',
      stars: 4.7,
      reviews: '5.2k',
      category: 'Desserts',
      dishes: [
        {
          id: 1,
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake',
          price: 7,
          image: getImage('dessertDish'),
        },
        {
          id: 2,
          name: 'Ice Cream',
          description: 'Vanilla scoop',
          price: 5,
          image: getImage('dessertDish'),
        },
        {
          id: 3,
          name: 'Brownie',
          description: 'Hot chocolate brownie',
          price: 6,
          image: getImage('dessertDish'),
        },
        {
          id: 4,
          name: 'Milkshake',
          description: 'Chocolate milkshake',
          price: 6,
          image: getImage('dessertDish'),
        },
      ],
    },
  ],
};

// ================= CATEGORIES =================

export const categories = [
  { id: 1, name: 'Pizza', image: getImage('pizzaIcon') },
  { id: 2, name: 'Burger', image: getImage('pizzaIcon') },
  { id: 3, name: 'Italian', image: getImage('pizzaIcon') },
  { id: 4, name: 'Chinese', image: getImage('pizzaIcon') },
  { id: 5, name: 'Noodles', image: getImage('pizzaIcon') },
  { id: 6, name: 'Desserts', image: getImage('pizzaIcon') },
  { id: 7, name: 'Fast Food', image: getImage('pizzaIcon') },
  { id: 8, name: 'Healthy', image: getImage('pizzaIcon') },
  { id: 9, name: 'Drinks', image: getImage('pizzaIcon') },
  { id: 10, name: 'Sea Food', image: getImage('pizzaIcon') },
  { id: 11, name: 'Breakfast', image: getImage('pizzaIcon') },
  { id: 12, name: 'Snacks', image: getImage('pizzaIcon') },
];
