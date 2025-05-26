import React,  { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProfile } from "../../services/authService";
function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("idUser"); // thay bằng user thật nếu có
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile(userId, token);
        setFormData({
          fullName: profile.fullname || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
          password: profile.password,
          dateofbirth: profile.dateofbirth
        });
      } catch (err) {
        console.error(err);
        setError("Unable to get user information");
      }
    };

    fetchData();
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { ...formData };
      if (!body.password) delete body.password; // nếu không đổi password thì bỏ

      await updateProfile(userId, body, token);

      setSuccessMessage("✅ Thông tin đã được cập nhật thành công!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setError("❌ Có lỗi xảy ra khi cập nhật thông tin!");
      setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Edit personal information
          </h2>

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center font-medium">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-center font-medium">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5xDDKe3VgR4z8agLx2LVl2H9vKgcCeEKKg&s"
              alt="Avatar"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Nhập họ tên"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Số điện thoại"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Date of birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dateofbirth}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Ngày sinh"
              />
          </div>

            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Địa chỉ"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">New password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;
