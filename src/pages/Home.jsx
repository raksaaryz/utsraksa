import { useState, useEffect } from "react";
import { Trash, SquarePen } from "lucide-react";
import { Plus, Search } from "lucide-react";
import "./Home.css";

let initialProducts = [
  {
    id: 1,
    name: "Preman Pensium 5",
    tahun_rilis: 2012,
    genre: "Drama, Komedi",
    durasi: "1 jam 30 menit",
    sinopsis_film: "SpongeBob dan teman-temannya harus keluar dari air untuk menemukan resep rahasia Krabby Patty yang hilang. Dalam petualangan ini, mereka menemukan kekuatan super dan menghadapi tantangan besar di dunia manusia.",
    image:
      "https://upload.wikimedia.org/wikipedia/id/thumb/a/a0/Poster_Preman_Pensiun_5.jpg/220px-Poster_Preman_Pensiun_5.jpg",
  },
  {
    id: 2,
    name: "Spongebob",
    tahun_rilis: 2015,
    genre: "Animasi, Komedi, Petualangan",
    durasi: "1 jam 33 menit",
    sinopsis_film: "SpongeBob dan teman-temannya harus keluar dari air untuk menemukan resep rahasia Krabby Patty yang hilang. Dalam petualangan ini, mereka menemukan kekuatan super dan menghadapi tantangan besar di dunia manusia.",
    image:
      "https://upload.wikimedia.org/wikipedia/id/9/97/Spongebob_squarepants_ver8.jpg",
  },
  {
    id: 3,
    name: "Masha & The Bear",
    tahun_rilis: 2010,
    genre: "Animasi, Keluarga, Komedi",
    durasi: "7 menit (per episode)",
    sinopsis_film: "Masha adalah gadis kecil yang penuh energi dan rasa ingin tahu yang tinggal di hutan bersama beruang yang dulunya adalah artis sirkus. Bersama-sama, mereka menjalani petualangan lucu dan menggemaskan yang selalu diwarnai oleh kenakalan Masha.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2pjGNVSakzXgtUSihADBjTQSvWmfODsIbaw&s",
  },
  {
    id: 4,
    name: "Si Unyil",
    tahun_rilis: 2010,
    genre: "Animasi, Keluarga, Edukasi",
    durasi: "30 menit (per episode)",
    sinopsis_film: "Si Unyil adalah serial animasi edukasi yang menceritakan tentang kehidupan sehari-hari anak-anak di sebuah desa di Indonesia. Serial ini penuh dengan pesan moral dan edukasi, menjadikannya tontonan yang bermanfaat bagi anak-anak.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Y1_3s-zigm_oxjmXPQZwYJKiL-ditcKt4Q&s",
  },
];

const saveProducts = localStorage.getItem("products");

export default function Home() {
  const [products, setProducts] = useState(
    saveProducts ? JSON.parse(saveProducts) : initialProducts
  );
  const [updateProduct, setUpdateProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(null);
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [search, setSearch] = useState("");

  const filterData = products
    .sort((a, b) => {
      if (orderBy === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  function handleDelete(product) {
    if (window.confirm("Apakah kamu yakin hapus ini?")) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  }

  function handleUpdate() {
    setProducts(
      products.map((p) => (p.id === updateProduct.id ? updateProduct : p))
    );
    setUpdateProduct(null);
  }

  function handleAddProduct() {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...addProduct, id: newId }]);
    setAddProduct(null);
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div>
      <div className="flex-container">
        <div
          className="action-button"
          onClick={() => setAddProduct(products)}
        >
          <Plus />
          Add
        </div>
        <div className="search-input">
          <Search />
          <input
            type="text"
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <label className="sort-label">
          <span>Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Normal</option>
            <option value="name">Name</option>
            <option value="Tta">Tahun Rilis</option>
          </select>
        </label>
        <label className="order-label">
          <span>Order:</span>
          <select
            className="order-select"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className="product-list">
        {filterData.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <p className="product-Tta">{product.Tta}</p>
            <div className="action-buttons">
              <button onClick={() => handleDelete(product)}>
                <Trash />
              </button>
              <button onClick={() => setUpdateProduct(product)}>
                <SquarePen />
              </button>
            </div>
          </div>
        ))}
      </div>
      {updateProduct && (
        <div className="overlay">
          <div className="update-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
                className="input-field"
              />
              <label htmlFor="Tta">tahun_rilis:</label>
              <input
                type="number"
                id="Tta"
                value={updateProduct.Tta}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    tahun_rilis: parseInt(e.target.value),
                  })
                }
                className="input-field"
              />
              <label htmlFor="image">Image URL:</label>
              <input
                type="text"
                id="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    image: e.target.value,
                  })
                }
                className="input-field"
              />
              <div className="button-container">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setUpdateProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {addProduct && (
        <div className="overlay">
          <div className="add-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
            >
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={addProduct.name}
                onChange={(e) =>
                  setAddProduct({ ...addProduct, name: e.target.value })
                }
                className="input-field"
              />
              <label htmlFor="Tta">tahun_rilis:</label>
              <input
                type="number"
                id="Tta"
                value={addProduct.Tta}
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    tahun_rilis: parseInt(e.target.value),
                  })
                }
                className="input-field"
              />
              <label htmlFor="image">Image URL:</label>
              <input
                type="text"
                id="image"
                value={addProduct.image}
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    image: e.target.value,
                  })
                }
                className="input-field"
              />
              <div className="button-container">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setAddProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}