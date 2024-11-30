import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import Stars from "./Stars";
import Modal from "./Modal";

const API_URL = "https://fakestoreapi.com/products";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`${API_URL}`)
        .then((res) => {
          setData(res.data.slice(5));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const productsItems = data?.map((pro) => (
    <div className="p-3 shadow-lg bg-white" key={pro.id}>
      <img
        onClick={() => setModalData(pro)}
        className="w-full h-60 object-contain "
        src={pro.image}
        alt=""
      />
      <h3>{pro.title}</h3>
      <p>${pro.price}-USD</p>
      <div className="flex items-center gap-1">
        <div className="flex text-yellow-300">
          <Stars rating={pro.rating.rate} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container max-w-[1250px] m-auto">
      {loading && <Skeleton />}
      <div className="grid grid-cols-4 gap-3 p-3 mt-10 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[450px]:grid-cols-1">
        {productsItems}
      </div>
      {modalData && (
        <Modal close={() => setModalData(null)}>
          <div className="bg-white flex gap-6 p-3 rounded-xl items-center content-center">
            <div className="w-[50%]">
              <img src={modalData.image} alt="" />
            </div>
            <div className="w-[50%]">
              <h2 className="text-[30px] font-extrabold">{modalData.title}</h2>
              <p className="text-[12px] text-gray-800 py-5">
                {modalData.description}
              </p>
              <p className="text-[25px] text-gray-800">
                ${modalData.price}-USD
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
