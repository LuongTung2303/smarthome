import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getProfile } from '../services/authService';

const PrivateRoute = ({ children }) => {
  const [formData, setFormData] = useState(null); // ban đầu là null
  const [loading, setLoading] = useState(true);   // để tránh render sớm

  const userId = localStorage.getItem("idUser");
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //         console.log('Gọi getProfile với:', userId, token);
  //         const profile = await getProfile(userId, token);
  //         console.log('Kết quả profile:', profile);

  //       if (profile && profile.fullname) {
  //         setFormData({
  //           fullName: profile.fullname || "",
  //           email: profile.email || "",
  //           phone: profile.phone || "",
  //           address: profile.address || "",
  //           password: profile.password || "",
  //           dateofbirth: profile.dateofbirth || ""
  //         });
  //       } else {
  //         setFormData(null);
  //       }
  //     } catch (err) {
  //       console.error("Không lấy được thông tin user:", err);
  //       setFormData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [userId, token]);

  // // Đang loading thì chưa render gì cả
  // if (loading) return null;

  // // Nếu không có thông tin người dùng → chuyển về login
  // if (!formData) return <Navigate to="/" replace />;

  // Nếu có thông tin → cho vào trang
  return children;
};

export default PrivateRoute;

