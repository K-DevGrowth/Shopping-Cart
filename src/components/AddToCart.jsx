const AddToCart = ({ setCarts, carts, item, addNotification }) => {
  const addToCart = () => {
    setCarts([
      ...carts,
      {
        id: item.id,
        value: 1,
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
      },
    ]);
    addNotification(item);
  };

  return (
    <div className="p-2">
      <button
        onClick={() => addToCart()}
        className="cursor-pointer text-lg mx-1 mt-4 bg-indigo-600 hover:bg-indigo-500 font-semibold text-white p-2 px-4 rounded-md"
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
