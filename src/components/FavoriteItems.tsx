import { HeartFilled } from "@ant-design/icons";
import {
  Card,
  CardHeader,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useProductStore } from "../hooks/useProductStore";

export const FavoriteItems = () => {
  const { favList } = useProductStore();

  return (
    <Popover
      placement="bottom"
      showArrow={true}
      shouldCloseOnBlur={false}
      isKeyboardDismissDisabled
      className="max-h-[400px] overflow-auto"
    >
      <PopoverTrigger>
        <HeartFilled />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 w-[320px] flex flex-col gap-y-2 ">
          <div className="text-small font-bold">Favorite</div>
          {favList.length === 0 && <div>No items</div>}
          {favList.length > 0 &&
            favList.map((favItem) => {
              return (
                <Card>
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="no image"
                      width={48}
                      radius="sm"
                      src={favItem.thumbnail}
                    />
                    <div className="w-full flex flex-col">
                      <div className="flex justify-between">
                        <div className="text-md">{favItem.title}</div>
                        <Chip variant="flat" radius="sm" color="success">
                          <span className="capitalize text-xs">
                            {favItem.category}
                          </span>
                        </Chip>
                      </div>
                      <div className="font-bold">{favItem.price}$</div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
