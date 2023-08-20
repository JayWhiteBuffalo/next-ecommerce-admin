import { Product } from "@/models/Product";
import { Double, ObjectId } from "mongodb";

const productData = [
    {
        title: "Quartz Cluster",
        description: "Discover how to find serenity along the journey by allowing it to teach you the gifts of patience, wisdom and self-awareness to grow in sync with yourself. It is said that gently rubbing your thumb along its striations in meditation will unlock its wisdom.",
        price: Double(39.95),
        images:[
            "https://jaywhite-next-ecommerce.s3.amazonaws.com/1691825972730-.jpg"
        ],
        category: ObjectId(1),
        properties: {
            size: "medium",
            color: "clear",
            second_color: "clear",
            primary: "balance",
            secondary: "maifestation",
            third: "focus",
            chakra: "all",
        } 
    }
]