import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Edit2,
  Trash2,
  LogOut,
  Save,
  X,
  Phone,
  MapPin,
  Mail,
  Globe,
  ListOrdered,
} from "lucide-react";
import { toast } from "react-toastify";
import { JWTAxios } from "../../config/axiosConfig";
import { removeDatafromCart, resetCartCount } from "../../state/cart/cartSlice";
import { removeData, updateUserData } from "../../state/user/UserSlice";

const Profile = () => {
  const { logout, user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",

    address: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        contactNumber: userData.contactNumber || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const response = await JWTAxios.put("/user/updateProfile", formData);

      if (response.status === 200) {
        dispatch(updateUserData(formData));
        setIsEditing(false);
        toast.success("Profile updated successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const response = await JWTAxios.delete("/user/deleteAccount");

      if (response.status === 200) {
        dispatch(removeDatafromCart());
        dispatch(resetCartCount());
        dispatch(removeData());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        toast.success("Account deleted successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });

        await logout();
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleLogout = async () => {
    dispatch(removeDatafromCart());
    dispatch(resetCartCount());
    dispatch(removeData());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    await logout();
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        contactNumber: userData.contactNumber || "",

        address: userData.address || "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-2xl sm:text-4xl opacity-40 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-40 right-20 text-xl sm:text-3xl opacity-50 animate-bounce delay-500">
          🌺
        </div>
        <div className="absolute bottom-40 left-20 text-lg sm:text-2xl opacity-40 animate-pulse delay-1500">
          🌷
        </div>
        <div className="absolute bottom-20 right-10 text-2xl sm:text-4xl opacity-40 animate-bounce delay-700">
          🌹
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 pt-4 sm:pt-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <User className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-main text-sm sm:text-base md:text-lg text-main/70 max-w-2xl mx-auto px-4">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Content */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10">
              {/* Profile Picture */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="relative inline-block">
                  <img
                    src={userData.picture}
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary/20 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-main/70 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-surface/50 border border-primary/10 rounded-xl ">
                        {userData?.name || "Not provided"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-main/70 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <div className="w-full px-4 py-3 bg-surface/30 border border-primary/10 rounded-xl text-main/60 cursor-not-allowed">
                      {userData?.email || "Not provided"}
                    </div>
                    <p className="text-xs text-main/50 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-main/70 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Number (07xxxxxxxx)
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl  placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-surface/50 border border-primary/10 rounded-xl ">
                      {userData?.contactNumber || "Not provided"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-main/70 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-surface/80 border border-primary/20 rounded-xl  placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 resize-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-surface/50 border border-primary/10 rounded-xl min-h-[80px]">
                      {userData?.address || "Not provided"}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-secondary to-primary text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/20 rounded-full animate-spin border-t-white"></div>
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2 bg-surface hover:bg-surface/80 border border-primary/30 hover:border-primary/50 text-main px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-secondary to-primary text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit Profile
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-secondary to-primary text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    <ListOrdered className="w-5 h-5" />
                    My Orders
                  </button>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleLogout}
                      className="flex-1 flex items-center justify-center gap-2 bg-surface hover:bg-surface/80 border border-primary/30 hover:border-primary/50 text-main px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>

                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-500 hover:text-red-600 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative group max-w-md w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-600/20 to-red-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-surface/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-red-500/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-main mb-2">
                    Delete Account
                  </h3>
                  <p className="text-main/70 text-sm">
                    Are you sure you want to delete your account? This action
                    cannot be undone and all your data will be permanently
                    removed.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isLoading}
                    className="flex-1 bg-surface hover:bg-surface/80 border border-primary/30 hover:border-primary/50 text-main px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/20 rounded-full animate-spin border-t-white"></div>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
