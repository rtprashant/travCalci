import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Hotel,
    Utensils,
    Activity,
    Train,
    X,
    Github, // Added for footer
    Twitter, // Added for footer
    Linkedin, // Added for footer
    ArrowRight // Added for CTA button
} from 'lucide-react';
import { fadeIn } from '../components/animations/main';
import ItineraryCard from '../components/ItineraryCard';
import { ItineraryModal } from '../components/ItineraryModal';
import Footer from '../components/Footer';
import itineraryHeroImg from '../assets/itiniary.jpeg'; // Make sure to have this image in assets

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};





const mockItineraries = [
    {
        id: 1,
        location: "Tokyo, Japan",
        days: 7,
        nights: 6,
        travelers: 2,
        avgCost: 3000,
        hotelCost: 1200,
        foodCost: 600,
        activityCost: 700,
        transportCost: 500,
        imageUrl: "https://images.pexels.com/photos/29531032/pexels-photo-29531032.jpeg",
        description: "Experience the bustling energy of Tokyo, from the neon lights of Shinjuku to the tranquil gardens of the Imperial Palace. A perfect blend of ancient tradition and futuristic technology.",
        dailyPlan: [
            { day: 1, title: "Arrival & Shinjuku Exploration", details: "Arrive at Narita/Haneda, check into your hotel. Explore Shinjuku Gyoen National Garden and enjoy dinner at Omoide Yokocho." },
            { day: 2, title: "Culture in Asakusa & Ueno", details: "Visit Senso-ji Temple, Tokyo's oldest temple. Explore Ueno Park, home to several museums and a zoo." },
            { day: 3, title: "Modern Tokyo: Shibuya & Harajuku", details: "Witness the famous Shibuya Crossing, explore Harajuku's Takeshita Street, and visit the Meiji Shrine." },
            { day: 4, title: "Tech & Anime in Akihabara", details: "Dive into the world of anime, manga, and electronics in Akihabara. Visit a themed cafe." },
            { day: 5, title: "Day Trip to Hakone", details: "Take a day trip to Hakone for stunning views of Mount Fuji, a boat cruise on Lake Ashi, and a relaxing onsen (hot spring) bath." },
            { day: 6, title: "Tsukiji Market & Ginza", details: "Enjoy fresh sushi at Tsukiji Outer Market for breakfast. Spend the afternoon shopping in the upscale Ginza district." },
            { day: 7, title: "Last-Minute Souvenirs & Departure", details: "Enjoy a final Japanese breakfast, do some last-minute shopping, and head to the airport for your departure." },
        ]
    },
    {
        id: 2,
        location: "Paris, France",
        days: 5,
        nights: 4,
        travelers: 2,
        avgCost: 2500,
        hotelCost: 1000,
        foodCost: 700,
        activityCost: 500,
        transportCost: 300,
        imageUrl: "https://images.pexels.com/photos/13017777/pexels-photo-13017777.jpeg",
        description: "Discover the magic of the City of Light. From the iconic Eiffel Tower to the world-class art at the Louvre, Paris is an unforgettable romantic getaway.",
        dailyPlan: [
            { day: 1, title: "Arrival & Eiffel Tower", details: "Arrive in Paris, check into your hotel. Take an evening stroll to the Eiffel Tower to see it sparkle." },
            { day: 2, title: "Art & History", details: "Spend the morning at the Louvre Museum (book tickets in advance!). In the afternoon, visit Notre-Dame Cathedral and Sainte-Chapelle." },
            { day: 3, title: "Montmartre & Sacré-Cœur", details: "Explore the charming, hilly neighborhood of Montmartre, visit the Sacré-Cœur Basilica, and watch street artists at Place du Tertre." },
            { day: 4, title: "Palace of Versailles", details: "Take a day trip to the magnificent Palace of Versailles. Explore the Hall of Mirrors, the Grand Trianon, and the vast gardens." },
            { day: 5, title: "Seine River Cruise & Departure", details: "Enjoy a relaxing boat cruise on the Seine River for a different perspective of the city's landmarks before heading to the airport." },
        ]
    },
    {
        id: 3,
        location: "Rome, Italy",
        days: 6,
        nights: 5,
        travelers: 4,
        avgCost: 2800,
        hotelCost: 1100,
        foodCost: 800,
        activityCost: 600,
        transportCost: 300,
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1096",
        description: "Walk through history in the Eternal City. Explore ancient ruins, marvel at Renaissance art, and indulge in world-famous Italian cuisine.",
        dailyPlan: [
            { day: 1, title: "Arrival & Ancient Rome", details: "Arrive in Rome, check in. Visit the Colosseum, Roman Forum, and Palatine Hill." },
            { day: 2, title: "Vatican City", details: "Spend the day exploring Vatican City. Visit St. Peter's Basilica (climb the dome!) and the Vatican Museums, including the Sistine Chapel." },
            { day: 3, title: "City Landmarks & Gelato", details: "Toss a coin in the Trevi Fountain, walk up the Spanish Steps, and admire the Pantheon. Enjoy gelato in a nearby piazza." },
            { day: 4, title: "Borghese Gallery & Park", details: "Visit the Borghese Gallery (reservations required) to see stunning sculptures by Bernini. Relax in the beautiful Borghese Gardens." },
            { day: 5, title: "Trastevere & Food Tour", details: "Explore the charming, cobbled streets of the Trastevere neighborhood. Join an evening food tour to taste authentic Roman dishes." },
            { day: 6, title: "Catacombs & Departure", details: "Visit the Catacombs of St. Callixtus on the Appian Way before departing." },
        ]
    },
    {
        id: 4,
        location: "Jaipur, India",
        days: 5,
        nights: 4,
        travelers: 2,
        avgCost: 1200,
        hotelCost: 400,
        foodCost: 250,
        activityCost: 350,
        transportCost: 200,
        imageUrl: "https://images.unsplash.com/photo-1695395550316-8995ae9d35ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGF3YSUyMG1haGFsJTIwamFpcHVyJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Step into the royal charm of Jaipur, the Pink City of India. Explore magnificent forts, vibrant bazaars, and indulge in authentic Rajasthani cuisine.",
        dailyPlan: [
            { day: 1, title: "Arrival & Local Bazaars", details: "Arrive in Jaipur and check into your hotel. Spend the evening exploring Johari Bazaar and Bapu Bazaar for handicrafts and jewelry." },
            { day: 2, title: "Amber Fort & Nahargarh Fort", details: "Start your day with a visit to the grand Amber Fort. In the evening, head to Nahargarh Fort for sunset views of the city." },
            { day: 3, title: "City Palace & Hawa Mahal", details: "Explore the majestic City Palace, home to royal artifacts. Visit the iconic Hawa Mahal and nearby Jantar Mantar observatory." },
            { day: 4, title: "Cultural Day & Chokhi Dhani", details: "Enjoy a cultural evening at Chokhi Dhani with folk dance, camel rides, and a traditional Rajasthani dinner." },
            { day: 5, title: "Jaipur Markets & Departure", details: "Do some last-minute shopping for souvenirs and handicrafts before departing for your next destination." },
        ]
    },
    {
        id: 5,
        location: "Kerala, India",
        days: 6,
        nights: 5,
        travelers: 2,
        avgCost: 1500,
        hotelCost: 600,
        foodCost: 300,
        activityCost: 400,
        transportCost: 200,
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Relax in the serene backwaters of Kerala. Cruise through tranquil canals, witness lush greenery, and experience the calm rhythm of village life.",
        dailyPlan: [
            { day: 1, title: "Arrival in Kochi", details: "Arrive in Kochi, check into your hotel, and explore Fort Kochi’s colonial architecture and Chinese fishing nets." },
            { day: 2, title: "Drive to Alleppey & Houseboat Stay", details: "Travel to Alleppey and check into a luxurious houseboat. Enjoy a slow cruise through the scenic backwaters." },
            { day: 3, title: "Backwater Cruise & Local Villages", details: "Continue cruising through canals, visit small villages, and savor authentic Kerala meals prepared onboard." },
            { day: 4, title: "Munnar Hill Station", details: "Drive to Munnar, known for its tea gardens. Visit the Tea Museum and enjoy panoramic views of the Western Ghats." },
            { day: 5, title: "Eravikulam National Park & Waterfalls", details: "Visit Eravikulam National Park to spot Nilgiri Tahr, and explore nearby waterfalls like Lakkam Falls." },
            { day: 6, title: "Shopping & Departure", details: "Return to Kochi, shop for spices, handicrafts, and depart with memories of Kerala’s natural beauty." },
        ]
    }
];

export default function ItineraryPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    const openModal = (itinerary) => {
        setSelectedItinerary(itinerary);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        // We'll set itinerary to null after a short delay to allow animation to finish
        setTimeout(() => setSelectedItinerary(null), 300);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-inter">
            {/* --- ADDED: Style tag to hide scrollbar --- */}
            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

            {/* Hero Section */}
            <div
                className="relative text-white py-20 sm:py-32"
                style={{
                    // dark gradient overlay on top of the photo for legibility
                    backgroundImage: `linear-gradient(rgba(2,6,23,0.65), rgba(2,6,23,0.35)), url(${itineraryHeroImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Top Right Button - Hidden on small screens */}
                <motion.div
                    className="hidden md:block absolute top-6 right-4 lg:top-8 lg:right-8 z-[100]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <Link to="/planYourTrip" className="cursor-pointer">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-400 to-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
                        >
                            Plan Your Own
                            <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.div
                    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    variants={fadeIn}
                >

                    <h1 className="text-5xl md:text-6xl font-extrabold italic tracking-wide text-white drop-shadow-2xl"> {/* MODIFIED: Added text styles */}
                        Explore Our Plans
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mt-4 max-w-3xl mx-auto drop-shadow"> {/* MODIFIED: Added text styles */}
                        Here are all the adventures we have planned. Click any trip to see the full details.
                    </p>
                    
                    {/* Button for Small Screens - Shown only on mobile/tablet */}
                    <motion.div
                        className="md:hidden mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Link to="/planYourTrip" className="cursor-pointer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
                            >
                                Plan Your Own
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Itinerary Cards Grid */}
            <section className="py-16 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {mockItineraries.map((itinerary) => (
                            <ItineraryCard
                                key={itinerary.id}
                                itinerary={itinerary}
                                onClick={() => openModal(itinerary)}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-400 to-blue-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6 }
                            },
                            hidden: { opacity: 0, y: 50 }
                        }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Ready to Plan Your Dream Trip?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Create a personalized itinerary tailored just for you. Tell us your destination, budget, and preferences, and let's make it happen!
                        </p>
                        <Link to="/planYourTrip" className="cursor-pointer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-white text-blue-800 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                            >
                                Plan My Trip Now
                                <ArrowRight size={24} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Modal Component */}
            <ItineraryModal
                isOpen={modalOpen}
                onClose={closeModal}
                itinerary={selectedItinerary}
            />

           
        </div>
    );
}

