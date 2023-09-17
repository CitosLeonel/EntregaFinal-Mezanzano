import styles from "./ItemList.module.css";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ItemList = ({ isLoading }) => {
  const [items, setItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (count) => {
    setCartCount(cartCount + count);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();

      try {
        const querySnapshot = await getDocs(collection(db, "items"));

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItem(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div>
      <h1>Our seeds...</h1>

      <div
        className={`row row-cols-1 row-cols-md-3 g-4 ${styles.cardContainer}`}
      >
        {items.map((items) => (
          <div key={items.id} className="col">
            <div className={`card h-100 ${styles.cardContainer}`}>
              <img
                src={items.imageId}
                className={`card-img-top ${styles.cardImage}`}
                alt="seed image"
              />
              <div className="card-body">
                <h5 className="card-title">{items.title}</h5>
                <p className="card-text">{items.categoryId}</p>
              </div>
              <div className="card-footer">
                <small className="card-text">${items.price}</small>
              </div>
              <Link to={`/item/${items.id}`} className="btn btn-success">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ItemList.propTypes = {
  items: propTypes.array.isRequired,
  isLoading: propTypes.bool,
};

export default ItemList;
