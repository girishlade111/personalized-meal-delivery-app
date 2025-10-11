"use client"
import { Compass, Home, Search, ShoppingBag, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Food recommendation card component
function FoodCard({ item }) {
  return (
    <Card className="w-[160px] flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={160}
            height={120}
            className="object-cover rounded-t-lg h-[120px]"
          />
          {item.healthTag && (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">{item.healthTag}</Badge>
          )}
          {item.discount && (
            <Badge className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600">{item.discount}</Badge>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{item.restaurant}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{item.price}</span>
              {item.discount && (
                <span className="text-xs line-through text-muted-foreground">{item.originalPrice}</span>
              )}
            </div>
            {item.healthReason && (
              <div
                className={`w-2 h-2 rounded-full ${item.discount ? "bg-blue-500" : "bg-green-500"}`}
                title={item.discount ? item.discountReason : item.healthReason}
              ></div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Category card component
function CategoryCard({ category }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 p-3">
          <div className="rounded-full overflow-hidden bg-muted h-12 w-12 flex-shrink-0">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.title}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{category.title}</h3>
            <p className="text-xs text-muted-foreground">{category.count}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Restaurant card component
function RestaurantCard({ restaurant }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                width={320}
                height={160}
                className="object-cover w-full h-[160px]"
              />
              <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">{restaurant.rating} ★</Badge>
              {restaurant.discount && (
                <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600">{restaurant.discount}</Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{restaurant.name}</h3>
                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                  {restaurant.deliveryTime}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {restaurant.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">{restaurant.deliveryFee} delivery</span>
                  {restaurant.originalDeliveryFee && (
                    <span className="text-xs line-through text-muted-foreground">{restaurant.originalDeliveryFee}</span>
                  )}
                </div>
                <span className="text-xs text-green-600 font-medium">{restaurant.healthMatch}</span>
              </div>
              {restaurant.discount && restaurant.discountReason && (
                <div className="mt-2 text-xs text-blue-600">
                  {restaurant.discount} unlocked: {restaurant.discountReason}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{restaurant.name}</DialogTitle>
          <DialogDescription>
            {restaurant.tags.join(" • ")} • {restaurant.deliveryTime} • {restaurant.deliveryFee} delivery
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative rounded-md overflow-hidden">
            <Image
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              width={600}
              height={300}
              className="object-cover w-full h-[200px]"
            />
            <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">{restaurant.rating} ★</Badge>
            {restaurant.discount && (
              <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600">{restaurant.discount}</Badge>
            )}
          </div>

          {restaurant.healthMatch && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Health Profile Match</h3>
              <div className="bg-green-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">{restaurant.healthMatch}</span>
                  <div className="w-full max-w-[200px] h-2 bg-green-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: restaurant.healthMatch.replace("%", "") + "%" }}
                    ></div>
                  </div>
                </div>
                {restaurant.healthReason && <p className="text-xs text-green-700 mt-2">{restaurant.healthReason}</p>}
              </div>
            </div>
          )}

          {restaurant.discount && restaurant.discountReason && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Your Health Discount</h3>
              <div className="bg-blue-50 p-3 rounded-md text-sm">
                <p className="text-blue-800">
                  You've earned {restaurant.discount} because of your achievement:{" "}
                  <span className="font-medium">{restaurant.discountReason}</span>
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Popular Items</h3>
            <div className="grid grid-cols-2 gap-3">
              {restaurant.popularItems?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded-md">
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p>{restaurant.address || "123 Main St, San Francisco, CA"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hours</p>
                <p>{restaurant.hours || "10:00 AM - 10:00 PM"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p>{restaurant.phone || "(555) 123-4567"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Website</p>
                <p className="text-primary truncate">{restaurant.website || "www.restaurant.com"}</p>
              </div>
            </div>
          </div>

          {restaurant.reviews && restaurant.reviews.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Reviews</h3>
              <div className="space-y-3">
                {restaurant.reviews.map((review, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{review.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-800">
                        {review.rating} ★
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button className="w-full">Start Order</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main component
export default function HomePage() {
  // Health-focused food items data
  const healthFoodItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Protein-Rich Bowl",
      restaurant: "Green Kitchen",
      price: "$12.99",
      originalPrice: "$12.99",
      discount: null,
      discountReason: null,
      healthTag: "For Your Active Day",
      healthReason: "Your activity level has been high today. This protein-rich bowl will help with muscle recovery.",
      description:
        "A nutrient-dense bowl with quinoa, roasted vegetables, avocado, and grilled chicken. Perfect for refueling after physical activity.",
      nutrition: {
        calories: 520,
        protein: "32g",
        carbs: "48g",
        fat: "22g",
      },
      ingredients: ["Quinoa", "Grilled chicken", "Avocado", "Roasted sweet potato", "Kale", "Tahini dressing"],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Hydrating Smoothie",
      restaurant: "Juice Bar",
      price: "$6.74",
      originalPrice: "$8.99",
      discount: "25% OFF",
      discountReason: "Sleep Score 75%+ for 3 days",
      healthTag: "For Your Sleep Recovery",
      healthReason:
        "Your sleep data shows you got less than optimal rest. This smoothie provides hydration and nutrients to help you recover.",
      description:
        "A refreshing blend of cucumber, spinach, apple, and coconut water with added electrolytes to boost hydration and energy levels.",
      nutrition: {
        calories: 210,
        protein: "4g",
        carbs: "42g",
        fat: "2g",
      },
      ingredients: ["Cucumber", "Spinach", "Green apple", "Coconut water", "Mint", "Lime", "Electrolyte blend"],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Balanced Lunch",
      restaurant: "Nourish Cafe",
      price: "$14.99",
      originalPrice: "$14.99",
      discount: null,
      discountReason: null,
      healthTag: "For Your Night Schedule",
      healthReason:
        "As a night owl, this balanced meal provides sustained energy without disrupting your sleep patterns later.",
      description:
        "A perfectly portioned meal with complex carbs, lean protein, and healthy fats to maintain energy levels throughout your day and evening.",
      nutrition: {
        calories: 480,
        protein: "28g",
        carbs: "52g",
        fat: "18g",
      },
      ingredients: ["Brown rice", "Salmon", "Broccoli", "Bell peppers", "Olive oil", "Lemon herb seasoning"],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Energy Boost",
      restaurant: "Fuel Kitchen",
      price: "$7.69",
      originalPrice: "$10.99",
      discount: "30% OFF",
      discountReason: "Activity Streak: 5 days",
      healthTag: "For Your Energy Levels",
      healthReason: "Complements your naturally high energy with clean, sustained fuel to avoid afternoon crashes.",
      description:
        "A nutrient-rich snack with the perfect balance of protein, healthy fats and complex carbs to maintain your high energy levels.",
      nutrition: {
        calories: 320,
        protein: "12g",
        carbs: "38g",
        fat: "14g",
      },
      ingredients: ["Oats", "Almond butter", "Banana", "Chia seeds", "Honey", "Dark chocolate"],
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Overnight Oats",
      restaurant: "Morning Fuel",
      price: "$8.49",
      originalPrice: "$10.99",
      discount: "20% OFF",
      discountReason: "Activity Streak: 5 days",
      healthTag: "For Night Owls",
      healthReason:
        "Prepared the night before, these overnight oats are perfect for night owls who need a quick, nutritious breakfast without morning prep.",
      description:
        "Rolled oats soaked overnight with almond milk, chia seeds, and topped with fresh berries and honey. Ready to grab and go in the morning.",
      nutrition: {
        calories: 380,
        protein: "14g",
        carbs: "56g",
        fat: "12g",
      },
      ingredients: ["Rolled oats", "Almond milk", "Chia seeds", "Mixed berries", "Honey", "Cinnamon", "Almond butter"],
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1626711934535-9749ea933593?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Afternoon Energizer",
      restaurant: "Fuel Kitchen",
      price: "$9.49",
      originalPrice: "$9.49",
      discount: null,
      discountReason: null,
      healthTag: "For High Energy",
      healthReason:
        "This nutrient-dense snack provides sustained energy for your naturally high energy levels, helping you avoid the afternoon slump.",
      description:
        "A balanced mix of complex carbs, healthy fats, and lean protein designed to maintain energy levels throughout the day.",
      nutrition: {
        calories: 310,
        protein: "15g",
        carbs: "32g",
        fat: "14g",
      },
      ingredients: ["Greek yogurt", "Granola", "Walnuts", "Blueberries", "Dark chocolate chips", "Honey", "Cinnamon"],
    },
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Recovery Salmon Bowl",
      restaurant: "Green Kitchen",
      price: "$13.49",
      originalPrice: "$17.99",
      discount: "25% OFF",
      discountReason: "Sleep Score 75%+ for 3 days",
      healthTag: "For Active Recovery",
      healthReason:
        "Rich in omega-3 fatty acids and quality protein, this bowl supports muscle recovery after moderate activity while providing anti-inflammatory benefits.",
      description:
        "Wild-caught salmon served over brown rice with roasted vegetables, avocado, and a lemon-dill sauce. Perfect for post-workout recovery.",
      nutrition: {
        calories: 540,
        protein: "35g",
        carbs: "45g",
        fat: "24g",
      },
      ingredients: [
        "Wild salmon",
        "Brown rice",
        "Roasted broccoli",
        "Sweet potato",
        "Avocado",
        "Lemon-dill sauce",
        "Microgreens",
      ],
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Evening Calm Tea",
      restaurant: "Nourish Cafe",
      price: "$4.99",
      originalPrice: "$4.99",
      discount: null,
      discountReason: null,
      healthTag: "For Night Owls",
      healthReason:
        "This herbal blend helps night owls wind down naturally without disrupting your late-night schedule, supporting quality sleep when you're ready.",
      description:
        "A soothing blend of chamomile, lavender, and valerian root with a touch of honey. Designed to promote relaxation without sedation.",
      nutrition: {
        calories: 45,
        protein: "0g",
        carbs: "12g",
        fat: "0g",
      },
      ingredients: ["Chamomile", "Lavender", "Valerian root", "Lemon balm", "Honey", "Mint"],
    },
  ]

  // Regular food items (not health-focused)
  const regularFoodItems = [
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Classic Burger",
      restaurant: "Burger Joint",
      price: "$11.99",
      description:
        "A juicy beef patty topped with cheese, lettuce, tomato, and special sauce on a toasted brioche bun.",
      nutrition: {
        calories: 780,
        protein: "38g",
        carbs: "58g",
        fat: "45g",
      },
      ingredients: ["Beef patty", "Brioche bun", "Cheddar cheese", "Lettuce", "Tomato", "Special sauce"],
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Pepperoni Pizza",
      restaurant: "Pizza Palace",
      price: "$15.99",
      description: "Hand-tossed pizza crust topped with tomato sauce, mozzarella cheese, and pepperoni slices.",
      nutrition: {
        calories: 850,
        protein: "36g",
        carbs: "92g",
        fat: "40g",
      },
      ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Pepperoni", "Olive oil", "Italian herbs"],
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Chicken Tacos",
      restaurant: "Taco Fiesta",
      price: "$9.99",
      description: "Three soft corn tortillas filled with grilled chicken, pico de gallo, avocado, and lime crema.",
      nutrition: {
        calories: 580,
        protein: "32g",
        carbs: "48g",
        fat: "28g",
      },
      ingredients: ["Corn tortillas", "Grilled chicken", "Pico de gallo", "Avocado", "Lime crema", "Cilantro"],
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Mac & Cheese",
      restaurant: "Comfort Food Co.",
      price: "$8.49",
      description: "Creamy macaroni and cheese made with a blend of cheddar, gruyere, and parmesan cheeses.",
      nutrition: {
        calories: 720,
        protein: "24g",
        carbs: "68g",
        fat: "38g",
      },
      ingredients: ["Macaroni pasta", "Cheddar", "Gruyere", "Parmesan", "Milk", "Butter", "Breadcrumbs"],
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Pad Thai",
      restaurant: "Thai Delight",
      price: "$13.49",
      description:
        "Stir-fried rice noodles with eggs, tofu, bean sprouts, peanuts, and lime in a sweet and savory sauce.",
      nutrition: {
        calories: 620,
        protein: "22g",
        carbs: "78g",
        fat: "24g",
      },
      ingredients: ["Rice noodles", "Tofu", "Eggs", "Bean sprouts", "Peanuts", "Lime", "Tamarind sauce"],
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=160&h=120&auto=format&fit=crop",
      title: "Ice Cream Sundae",
      restaurant: "Sweet Treats",
      price: "$6.99",
      description: "Vanilla ice cream topped with hot fudge, whipped cream, cherries, and chopped nuts.",
      nutrition: {
        calories: 450,
        protein: "8g",
        carbs: "52g",
        fat: "24g",
      },
      ingredients: ["Vanilla ice cream", "Hot fudge", "Whipped cream", "Cherries", "Chopped nuts", "Sprinkles"],
    },
  ]

  // Combine all food items
  const allFoodItems = [...healthFoodItems, ...regularFoodItems]

  // Categories data
  const categories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=80&h=80&auto=format&fit=crop",
      title: "Salads",
      count: "24 options",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=80&h=80&auto=format&fit=crop",
      title: "Protein",
      count: "18 options",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?q=80&w=80&h=80&auto=format&fit=crop",
      title: "Smoothies",
      count: "12 options",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=80&h=80&auto=format&fit=crop",
      title: "Bowls",
      count: "15 options",
    },
  ]

  // Restaurants data
  const restaurants = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Green Kitchen",
      rating: "4.8",
      deliveryTime: "15-25 min",
      deliveryFee: "$1.99",
      tags: ["Healthy", "Organic", "Vegan Options"],
      healthMatch: "92% match with your health profile",
      healthReason:
        "This restaurant offers many high-protein, nutrient-dense options that align with your moderately active lifestyle and high energy needs.",
      discount: null,
      address: "456 Health Ave, San Francisco, CA",
      hours: "7:00 AM - 9:00 PM",
      phone: "(555) 123-4567",
      website: "www.greenkitchen.com",
      popularItems: [
        {
          name: "Protein-Rich Bowl",
          price: "$12.99",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Avocado Toast",
          price: "$9.99",
          image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Green Smoothie",
          price: "$7.99",
          image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Quinoa Salad",
          price: "$11.99",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Sarah L.",
          rating: "5.0",
          comment: "Amazing healthy options! The protein bowl gave me energy for my entire workout day.",
        },
        {
          name: "Michael T.",
          rating: "4.5",
          comment: "Great place for clean eating. Everything is fresh and the portions are generous.",
        },
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Nourish Cafe",
      rating: "4.6",
      deliveryTime: "20-30 min",
      deliveryFee: "$0",
      originalDeliveryFee: "$2.49",
      tags: ["Balanced", "Gluten-Free", "Protein"],
      healthMatch: "87% match with your health profile",
      healthReason:
        "Their menu features balanced meals with complex carbs that provide sustained energy, perfect for your night owl schedule.",
      discount: "FREE DELIVERY",
      discountReason: "Stress levels 20% or lower this week",
      address: "789 Wellness Blvd, San Francisco, CA",
      hours: "8:00 AM - 10:00 PM",
      phone: "(555) 987-6543",
      website: "www.nourishcafe.com",
      popularItems: [
        {
          name: "Balanced Lunch",
          price: "$14.99",
          image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Protein Pancakes",
          price: "$10.99",
          image: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Superfood Bowl",
          price: "$13.99",
          image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Gluten-Free Wrap",
          price: "$12.49",
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Jamie K.",
          rating: "4.8",
          comment: "The balanced lunch is perfect for my busy schedule. Keeps me full and energized all afternoon!",
        },
        {
          name: "Alex P.",
          rating: "4.5",
          comment: "Great gluten-free options that actually taste amazing. Will order again!",
        },
      ],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Fuel Kitchen",
      rating: "4.5",
      deliveryTime: "25-35 min",
      deliveryFee: "$0.99",
      tags: ["Energy", "Performance", "Whole Foods"],
      healthMatch: "85% match with your health profile",
      healthReason:
        "Their performance-focused menu is ideal for your high energy levels and moderately active lifestyle.",
      discount: null,
      address: "321 Energy St, San Francisco, CA",
      hours: "6:00 AM - 9:00 PM",
      phone: "(555) 456-7890",
      website: "www.fuelkitchen.com",
      popularItems: [
        {
          name: "Energy Boost",
          price: "$7.69",
          image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Power Salad",
          price: "$13.99",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Protein Shake",
          price: "$8.99",
          image: "https://images.unsplash.com/photo-1622480916113-9056fa0f7f60?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Performance Bowl",
          price: "$15.99",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Chris M.",
          rating: "4.7",
          comment: "The energy boost snack is perfect before my evening workout. Great taste and real energy!",
        },
        {
          name: "Taylor B.",
          rating: "4.3",
          comment: "Love their performance bowls. Filling but not heavy, and the protein content is excellent.",
        },
      ],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Burger Joint",
      rating: "4.3",
      deliveryTime: "20-30 min",
      deliveryFee: "$2.49",
      tags: ["Burgers", "American", "Fast Food"],
      healthMatch: "45% match with your health profile",
      healthReason:
        "While their menu is high in protein, many options are also high in saturated fats and sodium which may not align with your health goals.",
      discount: null,
      address: "567 Burger Ave, San Francisco, CA",
      hours: "11:00 AM - 10:00 PM",
      phone: "(555) 234-5678",
      website: "www.burgerjoint.com",
      popularItems: [
        {
          name: "Classic Burger",
          price: "$11.99",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Cheese Fries",
          price: "$5.99",
          image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Milkshake",
          price: "$6.49",
          image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Chicken Sandwich",
          price: "$10.99",
          image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Jordan L.",
          rating: "4.5",
          comment: "Best burgers in town! Not the healthiest option but worth the splurge.",
        },
        {
          name: "Riley S.",
          rating: "4.0",
          comment: "Great taste but definitely a cheat meal. The chicken sandwich is slightly healthier.",
        },
      ],
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Pizza Palace",
      rating: "4.4",
      deliveryTime: "25-40 min",
      deliveryFee: "$1.99",
      tags: ["Pizza", "Italian", "Wings"],
      healthMatch: "38% match with your health profile",
      healthReason:
        "Their menu is high in refined carbs and saturated fats, which may not support your active lifestyle and energy needs optimally.",
      discount: null,
      address: "890 Pizza Lane, San Francisco, CA",
      hours: "11:00 AM - 11:00 PM",
      phone: "(555) 876-5432",
      website: "www.pizzapalace.com",
      popularItems: [
        {
          name: "Pepperoni Pizza",
          price: "$15.99",
          image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Garlic Knots",
          price: "$6.99",
          image: "https://images.unsplash.com/photo-1573915675450-d8d39a35505e?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Buffalo Wings",
          price: "$12.99",
          image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Veggie Pizza",
          price: "$14.99",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Casey T.",
          rating: "4.6",
          comment: "Delicious pizza! The veggie option is a bit healthier but still tasty.",
        },
        {
          name: "Morgan P.",
          rating: "4.2",
          comment: "Great for a treat meal. The wings are amazing but definitely a splurge.",
        },
      ],
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Morning Fuel",
      rating: "4.7",
      deliveryTime: "15-25 min",
      deliveryFee: "$1.49",
      tags: ["Breakfast", "Coffee", "Healthy"],
      healthMatch: "89% match with your health profile",
      healthReason:
        "Their breakfast options are perfect for night owls who need quick, nutritious morning meals without early preparation.",
      discount: "20% OFF",
      discountReason: "Activity Streak: 5 days",
      address: "234 Sunrise Ave, San Francisco, CA",
      hours: "5:30 AM - 2:00 PM",
      phone: "(555) 789-1234",
      website: "www.morningfuel.com",
      popularItems: [
        {
          name: "Overnight Oats",
          price: "$8.49",
          image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Protein Coffee",
          price: "$5.99",
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Avocado Toast",
          price: "$9.99",
          image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Energy Muffin",
          price: "$4.49",
          image: "https://images.unsplash.com/photo-1587830076330-5af15cfcb3c3?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Robin H.",
          rating: "4.8",
          comment: "Perfect for my night owl schedule! I grab their overnight oats on my way to work.",
        },
        {
          name: "Quinn J.",
          rating: "4.6",
          comment: "The protein coffee is a game-changer. Keeps me energized all morning.",
        },
      ],
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Juice Bar",
      rating: "4.5",
      deliveryTime: "10-20 min",
      deliveryFee: "$0.99",
      tags: ["Smoothies", "Juices", "Healthy"],
      healthMatch: "83% match with your health profile",
      healthReason:
        "Their hydrating beverages support your high energy levels and active lifestyle with natural nutrients and electrolytes.",
      discount: "25% OFF",
      discountReason: "Sleep Score 75%+ for 3 days",
      address: "567 Refresh St, San Francisco, CA",
      hours: "7:00 AM - 8:00 PM",
      phone: "(555) 345-6789",
      website: "www.juicebar.com",
      popularItems: [
        {
          name: "Hydrating Smoothie",
          price: "$6.74",
          image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Green Juice",
          price: "$7.99",
          image: "https://images.unsplash.com/photo-1622597467836-f3e6707e1ed6?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Protein Smoothie",
          price: "$8.49",
          image: "https://images.unsplash.com/photo-1589734580748-6d9421464885?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Acai Bowl",
          price: "$10.99",
          image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Dana L.",
          rating: "4.7",
          comment: "Their hydrating smoothie is perfect after my workout. Great for recovery!",
        },
        {
          name: "Sam K.",
          rating: "4.4",
          comment: "Love the protein smoothies. They use quality ingredients and it shows.",
        },
      ],
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Salad Station",
      rating: "4.6",
      deliveryTime: "15-25 min",
      deliveryFee: "$1.49",
      tags: ["Salads", "Bowls", "Healthy"],
      healthMatch: "90% match with your health profile",
      healthReason:
        "Their customizable salads and bowls provide balanced nutrition that supports your moderately active lifestyle and high energy needs.",
      discount: null,
      address: "789 Garden Ave, San Francisco, CA",
      hours: "10:00 AM - 9:00 PM",
      phone: "(555) 456-7890",
      website: "www.saladstation.com",
      popularItems: [
        {
          name: "Power Protein Bowl",
          price: "$13.99",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Mediterranean Salad",
          price: "$11.99",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Quinoa Veggie Bowl",
          price: "$12.49",
          image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Avocado Chicken Salad",
          price: "$13.49",
          image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Morgan T.",
          rating: "4.8",
          comment: "The power protein bowl keeps me full for hours. Perfect for my active days!",
        },
        {
          name: "Jesse R.",
          rating: "4.5",
          comment: "Fresh ingredients and great portion sizes. Love that I can customize everything.",
        },
      ],
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Taco Fiesta",
      rating: "4.4",
      deliveryTime: "20-35 min",
      deliveryFee: "$1.99",
      tags: ["Mexican", "Tacos", "Burritos"],
      healthMatch: "62% match with your health profile",
      healthReason:
        "Some of their options with lean proteins and vegetables can support your active lifestyle, but watch out for high-calorie add-ons.",
      discount: null,
      address: "123 Fiesta Blvd, San Francisco, CA",
      hours: "11:00 AM - 10:00 PM",
      phone: "(555) 987-6543",
      website: "www.tacofiesta.com",
      popularItems: [
        {
          name: "Chicken Tacos",
          price: "$9.99",
          image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Veggie Burrito",
          price: "$10.99",
          image: "https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Steak Bowl",
          price: "$12.99",
          image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Guacamole & Chips",
          price: "$5.99",
          image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Avery M.",
          rating: "4.6",
          comment: "The chicken tacos are delicious and relatively healthy if you skip the sour cream.",
        },
        {
          name: "Jordan P.",
          rating: "4.3",
          comment: "Good food but can be heavy. The veggie burrito is a lighter option I enjoy.",
        },
      ],
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=320&h=160&auto=format&fit=crop",
      name: "Comfort Food Co.",
      rating: "4.2",
      deliveryTime: "25-40 min",
      deliveryFee: "$2.49",
      tags: ["Comfort Food", "American", "Homestyle"],
      healthMatch: "40% match with your health profile",
      healthReason:
        "Their menu is high in calories and comfort foods that may not align with your active lifestyle, though they do offer some healthier sides.",
      discount: null,
      address: "456 Comfort Lane, San Francisco, CA",
      hours: "11:00 AM - 9:00 PM",
      phone: "(555) 234-5678",
      website: "www.comfortfoodco.com",
      popularItems: [
        {
          name: "Mac & Cheese",
          price: "$8.49",
          image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Fried Chicken",
          price: "$13.99",
          image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Meatloaf",
          price: "$14.99",
          image: "https://images.unsplash.com/photo-1600891963935-9e7f1f0fc15c?q=80&w=160&h=120&auto=format&fit=crop",
        },
        {
          name: "Mashed Potatoes",
          price: "$4.99",
          image: "https://images.unsplash.com/photo-1600175074394-5d23b9f6d319?q=80&w=160&h=120&auto=format&fit=crop",
        },
      ],
      reviews: [
        {
          name: "Riley J.",
          rating: "4.5",
          comment: "Amazing comfort food! Not the healthiest, but perfect for a cheat day.",
        },
        {
          name: "Taylor S.",
          rating: "4.0",
          comment: "Delicious but heavy. I usually save this for special occasions.",
        },
      ],
    },
  ]

  // Health achievements
  const healthAchievements = [
    "Sleep Score 75%+ for 3 days",
    "Activity Streak: 5 days",
    "Stress levels 20% or lower this week",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=100&auto=format&fit=crop"
                alt="Logo"
              />
              <AvatarFallback>NF</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Deliver to</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <div className="text-xs text-muted-foreground">123 Main St, San Francisco</div>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <ShoppingBag className="h-4 w-4" />
            <span className="sr-only">Shopping bag</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-4">
          {/* Health Insights Banner */}
          <div className="mb-6 bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-green-800">Your Health Insights</h3>
                <p className="text-xs text-green-700">Powered by Sahha.ai</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                Updated 10m ago
              </Badge>
            </div>
            <div className="mt-2 p-3 bg-white rounded-md border border-green-100">
              <h4 className="text-sm font-medium text-green-800 mb-2">Current Health Profile:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Moderately Active
                </Badge>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                  Night Owl
                </Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                  High Energy
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Recommendations are personalized based on your current health profile and daily activity patterns.
              </p>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Health Achievements:</h4>
              <div className="flex flex-wrap gap-2">
                {healthAchievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                    {achievement}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You've unlocked special discounts based on your health achievements!
              </p>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recommended for You</h2>
              <Link href="#" className="text-sm text-primary">
                See all
              </Link>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {healthFoodItems.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div>
                        <FoodCard item={item} />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>{item.restaurant}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={250}
                            className="object-cover w-full h-[200px]"
                          />
                          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                            {item.healthTag}
                          </Badge>
                          {item.discount && (
                            <Badge className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600">
                              {item.discount}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Why This is Perfect for You</h3>
                          <div className="bg-green-50 p-3 rounded-md text-sm">{item.healthReason}</div>
                        </div>

                        {item.discount && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Your Health Discount</h3>
                            <div className="bg-blue-50 p-3 rounded-md text-sm">
                              <p className="text-blue-800">
                                You've earned {item.discount} because of your achievement:{" "}
                                <span className="font-medium">{item.discountReason}</span>
                              </p>
                            </div>
                          </div>
                        )}

                        <div>
                          <h3 className="text-sm font-medium mb-1">Description</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Nutrition</h3>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Calories</p>
                              <p className="font-medium">{item.nutrition.calories}</p>
                            </div>
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Protein</p>
                              <p className="font-medium">{item.nutrition.protein}</p>
                            </div>
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Carbs</p>
                              <p className="font-medium">{item.nutrition.carbs}</p>
                            </div>
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Fat</p>
                              <p className="font-medium">{item.nutrition.fat}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Ingredients</h3>
                          <div className="flex flex-wrap gap-1">
                            {item.ingredients.map((ingredient, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button className="w-full">
                            Add to Order • {item.price}
                            {item.discount && (
                              <span className="ml-2 text-xs line-through opacity-70">{item.originalPrice}</span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Popular Items (Non-health focused) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Popular Near You</h2>
              <Link href="#" className="text-sm text-primary">
                See all
              </Link>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {regularFoodItems.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div>
                        <FoodCard item={item} />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>{item.restaurant}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={250}
                            className="object-cover w-full h-[200px]"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Description</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Nutrition</h3>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Calories</p>
                              <p className="font-medium">{item.nutrition.calories}</p>
                            </div>
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Protein</p>
                              <p className="font-medium">{item.nutrition.protein}</p>
                            </div>
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Carbs</p>
                              <p className="font-medium">{item.nutrition.carbs}</p>
                            </div>
                            <div className="bg-muted p-2 rounded-md">
                              <p className="text-xs text-muted-foreground">Fat</p>
                              <p className="font-medium">{item.nutrition.fat}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-1">Ingredients</h3>
                          <div className="flex flex-wrap gap-1">
                            {item.ingredients.map((ingredient, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button className="w-full">Add to Order • {item.price}</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Categories */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid grid-cols-4 h-auto p-1">
              <TabsTrigger value="all" className="text-xs py-2">
                All
              </TabsTrigger>
              <TabsTrigger value="healthy" className="text-xs py-2">
                Healthy
              </TabsTrigger>
              <TabsTrigger value="quick" className="text-xs py-2">
                Quick
              </TabsTrigger>
              <TabsTrigger value="offers" className="text-xs py-2">
                Offers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Restaurants */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Restaurants Near You</h2>
              <Link href="#" className="text-sm text-primary">
                See all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 border-t bg-background">
        <div className="container">
          <nav className="flex items-center justify-between py-3">
            <Link href="#" className="flex flex-col items-center gap-1 text-primary">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
              <Search className="h-5 w-5" />
              <span className="text-xs">Search</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
              <Compass className="h-5 w-5" />
              <span className="text-xs">Browse</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
