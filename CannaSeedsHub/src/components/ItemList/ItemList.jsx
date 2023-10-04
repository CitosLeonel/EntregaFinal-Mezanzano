import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styles from "./ItemList.module.css";

const ItemList = ({ isLoading }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();

      try {
        const querySnapshot = await getDocs(collection(db, "items"));

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
      } catch (error) {}
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <h2 className="isLoading">Loading products...</h2>;
  }

  return (
    <div className={styles["itemListContainer"]}>
      <h1 className={styles["ppalTitle"]}>Our seeds...</h1>
      <div
        className={`row row-cols-1 row-cols-md-3 g-4 ${styles.cardContainer}`}
      >
        {items.map((item) => (
          <div key={item.id} className="col">
            <div className={`card h-100 w-75 ${styles.card}`}>
              <img
                src={`/images/${item.imageId}`}
                className={`card-img-top ${styles.cardImg}`}
                alt="seed image"
              />
              <div className="card-bodycd">
                <h5 className={`card-title ${styles.cardTitle}`}>
                  {item.title}
                </h5>
                <p className={`card-text ${styles.cardText}`}>
                  {item.categoryId}
                </p>
              </div>
              <div className={`card-footer border-dark ${styles.cardFooter}`}>
                <small className={`card-text ${styles.cardFooterTxt}`}>
                  unit price: ${item.price}
                </small>
              </div>
              <Link
                to={`/item/${item.id}`}
                className="btn btn-success border border-dark text-dark fw-bold"
              >
                View details
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
