import { useState, useEffect } from "react";
import { getProducts } from "../../services";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [item, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    console.log("useEffect", categoryId);
    setIsLoading(true);

    getProducts(categoryId).then((response) => {
      setItems(response);
      setIsLoading(false);
    });
  }, [categoryId]);

  return <ItemList items={item} isLoading={isLoading} />;
};

export default ItemListContainer;
