import axios from "axios";
import { useState } from "react";


export const useProducts = () => {
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        setLoading(true)
        await axios.get('https://dummyjson.com/products')
            .then(function (response) {
                setProducts(response.data.products)
                const categories = [...new Set(response.data.products.map((product) => product.category))]
                setCategories(categories)
            })
            .catch(function (error) {
                setError(error)
            })
            .finally(function () {
                setLoading(false)
            });
    }

    return {
        fetchProducts,
        products,
        categories,
        isLoading,
        error,
    }

}