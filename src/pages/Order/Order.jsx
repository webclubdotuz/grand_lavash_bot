import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Bottom from "../../components/Bottom/Bottom";
import { addSum, descSum, setSelected_pr } from "../../store/sumSlice";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
export default function Order() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { sum, selected_pr, category, products } = useSelector(
    (state) => state.sumSlice
  );
  const unique = selected_pr.filter(
    (obj, index) =>
      selected_pr.findIndex((item) => item.id === obj.id) === index
  );
  const dispatch = useDispatch();
  function countD(item) {
    return selected_pr.filter((value) => value.id == item.id).length;
  }
  const navigate = useNavigate();
  return (
    <>
      <main>
        <h1 className="sc_title">
          <span className="back" onClick={() => navigate("/")}>
            <FaArrowLeftLong />
          </span>{" "}
          Оформление заказа
        </h1>
        <div className="orders">
          {unique?.map((item) => (
            <div className="order" key={item.id}>
              <img src={item.img} alt="" />
              <div className="content">
                <span className="title">{item.title}</span>
                <div className="upper">
                  <div className="actions">
                    <button
                      onClick={(e) => {
                        dispatch(
                          descSum({
                            price: e.target.value,
                            title: item.name,
                            id: item.id,
                          })
                        );
                      }}
                      className="minus"
                      value={item.price}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        dispatch(
                          setSelected_pr({
                            title: item.name,
                            img: item.img_url,
                            id: item.id,
                            price: item.price,
                          })
                        );
                      }}
                      className="plus"
                      value={item.price}
                    >
                      +
                    </button>
                  </div>
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Bottom />
    </>
  );
}
