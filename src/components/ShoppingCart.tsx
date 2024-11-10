import { DeleteFilled, ShoppingFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  CardHeader,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useProductStore } from "../hooks/useProductStore";

export const ShoppingCart = () => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const { cartList, removeFromShoppingCart, resetCartList, checkout } =
    useProductStore();

  const totalPrice = Array.from(cartList.values()).reduce((sum, value) => {
    return sum + value.price * value.quantity;
  }, 0);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      placement="bottom"
      showArrow={true}
      shouldCloseOnBlur={false}
      isKeyboardDismissDisabled
      className="max-h-[400px] overflow-auto"
    >
      <PopoverTrigger>
        <ShoppingFilled />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 w-[320px] flex flex-col gap-y-2 ">
          <div className="text-small font-bold">Shopping Cart</div>
          {cartList.size === 0 && <div>No items</div>}
          {cartList.size > 0 &&
            Array.from(cartList.values()).map((cart) => {
              return (
                <Card>
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="no image"
                      radius="sm"
                      src={cart.thumbnail}
                      width={48}
                    />
                    <div className="w-full flex flex-col">
                      <div className="flex justify-between">
                        <div className="text-md">
                          {cart.quantity}x {cart.title}
                        </div>
                        <div>
                          <Button
                            isIconOnly
                            color="danger"
                            endContent={<DeleteFilled />}
                            size="sm"
                            onClick={() => removeFromShoppingCart(cart)}
                          ></Button>
                        </div>
                      </div>
                      <div className="font-bold">{cart.price}$</div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          <div className="flex justify-between">
            <div>Total Price</div>
            <div className="font-bold text-lg">{totalPrice.toFixed(2)}$</div>
          </div>
          {cartList.size > 0 && (
            <Button
              className="w-full"
              onClick={() => {
                onClose();
                resetCartList();
                checkout(true);
              }}
            >
              Checkout
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
