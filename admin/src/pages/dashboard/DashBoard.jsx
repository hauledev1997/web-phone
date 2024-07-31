import './DashBoard.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { FaUser } from 'react-icons/fa';

const DashBoard = () => {
  const [clients, setClients] = useState([]);
  const [earning, setEarning] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // fetch('https://haule2.onrender.com/admin/clients')
    fetch('http://localhost:5000/admin/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // fetch('https://haule2.onrender.com/admin/orders')
    fetch('http://localhost:5000/admin/orders')
      .then(res => res.json())
      .then(data => {
        setEarning(data.earning);
        setOrders(data.orders);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <div className='dashboard-container'>
        <Sidebar />
        <div className='dashboard-main'>
          <h1>DashBoard</h1>
          <div className='dashboard-info'>
            <div className='dashboard-items'>
              <div className='dashboard-items-item' id='users'>
                <h4>Clients</h4>
                <p>{clients.length}</p>
                <span>
                  <FaUser style={{ color: '#000', fontSize: '20px' }} />
                </span>
              </div>
              <div className='dashboard-items-item' id='users'>
                <h4>Earnings</h4>
                <p>
                  {new Intl.NumberFormat('vn-Vn', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(earning)}
                </p>
                <span>
                  <FaUser style={{ color: '#000', fontSize: '20px' }} />
                </span>
              </div>
              <div className='dashboard-items-item' id='users'>
                <h4>Orders</h4>
                <p>{orders.length}</p>
                <span>
                  <FaUser style={{ color: '#000', fontSize: '20px' }} />
                </span>
              </div>
            </div>
            <div className='dashboard-history'>
              <h4>History</h4>
              <div className='history-table'>
                <table>
                  <thead>
                    <tr>
                      <th>ID User</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Total</th>
                      <th>Delivery</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map(order => (
                        <tr key={order._id}>
                          <td>{order.user.userId}</td>
                          <td>{order.user.name}</td>
                          <td>{order.user.phone}</td>
                          <td>{order.user.address}</td>
                          <td>
                            {new Intl.NumberFormat('vn-Vn', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(order.totalBill)}
                          </td>
                          <td>
                            {order.orderDelivery === 'processing'
                              ? 'Chưa vận chuyển'
                              : 'Đang vận chuyển'}
                          </td>
                          <td>
                            {order.orderStatus === 'Waiting for pay'
                              ? 'Chưa thanh toán'
                              : 'Đã thanh toán'}
                          </td>
                          <td>
                            <button>View</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
