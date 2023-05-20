import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "../components/Helmet";
import CommonSection from "../components/CommonSection";
import { useParams } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import products from "../assets/data/products";
import { motion } from "framer-motion";
import ProductList from "../components/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/CartSlice";
import { toast } from "react-toastify";
import { Product } from "../model";

const ProductDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const dispatch = useDispatch();

  const { id } = useParams();

  const product = products.find((item) => item.id === id);
  const imgUrl=selectedProduct?.imgUrl;
  const productName=selectedProduct?.productName;
  const price=selectedProduct?.price;
  console.log(id,imgUrl);
  // if (selectedProduct !== undefined) {

  // //   setSelectedProduct(product);
  // //   console.log("selected pro", selectedProduct);
  //  }
  const addToCart = () => {
    dispatch(cartActions.addItem({ id, image: imgUrl, productName, price }));
    toast.success("Product added successfully");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedProduct(product);
  }, [product]);
  const [activeTab, setActiveTab] = useState("desc");
  const [rating, setRating] = useState<Number>(0);
  const reviewUser = useRef<HTMLInputElement>(null);
  const reviewMessage = useRef<HTMLTextAreaElement>(null);

  const relatedProducts = products.filter(
    (item) => item.category === selectedProduct?.category
  );
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current?.value;
    const reviewUserMessage = reviewMessage.current?.value;
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMessage,
      rating,
    };
    toast.success("review submitted");
  };
  return (
    <Helmet title={selectedProduct?.productName}>
      <CommonSection title={selectedProduct?.productName} />
      <Container style={{ padding: "50px 0px" }}>
        <Row>
          <Col lg="6">
            <img className="productImg" alt="" src={selectedProduct?.imgUrl} />
          </Col>
          <Col lg="6">
            <div className="product__details">
              <h2>{selectedProduct?.productName}</h2>
              <div className="product__rating">
                <div>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                </div>
                <p>
                  (<span>{selectedProduct?.avgRating}</span>ratings)
                </p>
              </div>
              <span className="product__price">${selectedProduct?.price}</span>
              <div>
                <p>ctategory: {selectedProduct?.category}</p>
              </div>
              <p>{selectedProduct?.shortDesc}</p>
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy_btn"
                onClick={addToCart}
              >
                Add to cart
              </motion.button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="12">
            <div className="tab__wrapper d-flex align-items-center gap-5">
              <h6
                onClick={() => setActiveTab("desc")}
                className={`${activeTab === "desc" ? "active__tab" : ""}`}
              >
                Description
              </h6>
              <h6
                onClick={() => setActiveTab("review")}
                className={`${activeTab === "review" ? "active__tab" : ""}`}
              >
                {" "}
                Reviews ({selectedProduct?.reviews.length})
              </h6>
            </div>
            <div className="tab__content mt-5">
              {activeTab === "desc" ? (
                <p>{selectedProduct?.description}</p>
              ) : (
                <div className="product__review mt-3">
                  <ul>
                    {selectedProduct?.reviews?.map((item: any, index: any) => (
                      <li key={index}>
                        {item.rating}(rating)
                        <p>{item.text}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="form__review">
                    <form action="" onSubmit={(e) => submitHandler(e)}>
                      <h4>Leave your experience</h4>
                      <div className="form__group">
                        <input
                          type="text"
                          ref={reviewUser}
                          placeholder="enter name"
                          required
                        ></input>
                        <div className="review-rating d-flex  align-items-center">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <textarea
                          rows={4}
                          ref={reviewMessage}
                          placeholder="Review Message..."
                          required
                        ></textarea>
                        <button type="submit" className="buy_btn">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col lg="12">
            <h2 className="related__products">You might also like</h2>
          </Col>
          <ProductList products={relatedProducts} />
        </Row>
      </Container>
    </Helmet>
  );
};

export default ProductDetails;
