import {
  HeartFilled,
  SearchOutlined,
  ShoppingFilled,
  StarFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductStore } from "../hooks/useProductStore";

export const Products = () => {
  const { products, categories, fetchProducts, isLoading } = useProducts();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const {
    addToFavoriteList,
    addToShoppingCart,
    removeFromFavoriteListCart,
    favList,
  } = useProductStore();

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    } else {
      setFilteredProduct(products);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex w-full flex-col p-5 gap-y-5">
        <Input
          isClearable
          placeholder="Search Product"
          onChange={(e) => {
            const { value } = e.target;
            let filteredProductNew = products;
            if (value) {
              filteredProductNew = filteredProduct.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase())
              );
            }
            setFilteredProduct(filteredProductNew);
          }}
          startContent={<SearchOutlined />}
        />
        <Tabs color="warning">
          {categories.map((item) => (
            <Tab key={item} title={<span className="capitalize">{item}</span>}>
              <div className="flex gap-4 flex-wrap">
                {filteredProduct
                  .filter(
                    (product) =>
                      product.category.toLowerCase() === item.toLowerCase()
                  )
                  .map((item, index) => {
                    const reviews =
                      item.reviews
                        .map((rate) => rate.rating)
                        .reduce((sum, value) => {
                          return sum + value;
                        }, 0) / item.reviews.length;
                    const isItemFav = favList.find((fav) => fav.id === item.id);
                    return (
                      <Card
                        className="w-[320px]"
                        shadow="sm"
                        key={index}
                        isPressable
                      >
                        <CardBody className="overflow-visible p-0">
                          <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[140px]"
                            src={item.thumbnail}
                          />
                        </CardBody>
                        <CardFooter className="flex flex-col justify-start items-start">
                          <div className="flex justify-between w-full">
                            <div className="text-md m-0 p-0">
                              <div className="text-md text-left">
                                {item.title}
                              </div>

                              <div className="flex gap-x-2">
                                <div className="text-lg font-bold">
                                  {item.price}$
                                </div>
                                •
                                <div className="flex gap-x-2">
                                  <StarFilled className="text-yellow-500" />
                                  {reviews.toFixed(2)}/{item.reviews.length}
                                </div>
                              </div>
                            </div>
                            <Button
                              isIconOnly
                              className="m-0 p-0 text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                              radius="full"
                              variant="light"
                              onPress={() => {
                                if (isItemFav) {
                                  removeFromFavoriteListCart(item);
                                } else {
                                  addToFavoriteList(item);
                                }
                              }}
                            >
                              <HeartFilled
                                style={{
                                  color: isItemFav ? "red" : "gray",
                                }}
                              />
                            </Button>
                          </div>
                          <Divider className="my-3" />
                          <Button
                            color="warning"
                            className="w-full"
                            endContent={<ShoppingFilled />}
                            onClick={() => addToShoppingCart(item)}
                          >
                            Add to Shopping Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
