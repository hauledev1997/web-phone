import './Products.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const headers = {
    authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  useEffect(() => {
    const fetchProducts = () => {
      // fetch('https://haule2.onrender.com/admin/products')
      fetch('http://localhost:5000/admin/products', { headers })
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setUserName(data.userName);
        })
        .catch(err => console.log(err));
    };

    fetchProducts();
  }, [searched, deleted]);

  const handleSearch = e => {
    e.preventDefault();
    // setSearchQuery(e.target.value);
    // console.log(e.target.value);

    if (e.target.value) {
      setSearched(true);
    } else {
      setSearched(false);
    }

    const data = { query: e.target.value };
    //'https://haule2.onrender.com/admin/search',
    const postSearch = async () => {
      const response = await axios.post(
        'http://localhost:5000/admin/search',
        data,
        { headers }
      );
      setSearchProducts(response.data);
    };

    postSearch();
  };
  // fetch('https://haule2.onrender.com/admin/delete-product'
  const handleDelete = id => {
    const postDeleteProd = () => {
      fetch('http://localhost:5000/admin/delete-product', {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          if (res.status === 200) {
            return setDeleted(prev => prev + 1);
          }
        })
        .catch(err => console.log(err));
    };

    if (window.confirm('Delete Product?')) {
      postDeleteProd();
    } else {
      return;
    }
  };

  const handleEditProduct = id => {
    const prodId = id;
    navigate(`/edit-product/${prodId}`, { state: { prodId } });
  };

  return (
    <div>
      <Header userName={userName} />
      <div className='products-container'>
        <Sidebar />
        <div className='products-container__main'>
          <div className='search'>
            <h1>Products</h1>
            <input
              type='text'
              placeholder='Enter Search'
              // onChange={e => handleSearch(e)}
              onChange={handleSearch}
            />
          </div>
          <div className='products-container__main-table'>
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Image</td>
                  <td>Category</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {products && !searched
                  ? products.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>
                          {new Intl.NumberFormat('vn-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(product.price)}
                        </td>
                        <td>
                          <img
                            // crossorigin='anonymous'
                            src={product.img1}
                            width='60'
                            alt='fail-image'
                          />
                        </td>
                        <td>{product.category}</td>
                        <td>
                          <button
                            className='update-btn'
                            onClick={e => handleEditProduct(product._id)}>
                            Update
                          </button>
                          <button
                            className='delete-btn'
                            onClick={() => {
                              handleDelete(product._id);
                            }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : searchProducts.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>
                          {new Intl.NumberFormat('vn-Vn', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(product.price)}
                        </td>
                        <td>
                          <img src={product.img1} width='60' />
                        </td>
                        <td>{product.category}</td>
                        <td>
                          <button
                            className='update-btn'
                            onClick={e => handleEditProduct(product._id)}>
                            Update
                          </button>
                          <button
                            className='delete-btn'
                            onClick={() => {
                              handleDelete(product._id);
                            }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
