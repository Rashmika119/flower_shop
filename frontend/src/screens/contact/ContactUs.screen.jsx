import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Heart,
} from "lucide-react";
import { useAxios } from "../../config/axiosConfig";
import { toast } from "react-toastify";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
    preferredContact: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.phone ||
      !formData.eventType ||
      !formData.preferredContact
    ) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const phonePattern = /^\+94[0-9]{9}$/;
    if (!phonePattern.test(formData.phone)) {
      toast.error("Invalid phone number", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await useAxios.post("/email/sendemail", formData);

      const data = response.data;
      if (response.status == 200) {
        toast.success("message send", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
          preferredContact: "email",
        });
      } else {
        toast.error("message sending error", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("message sending error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-2xl sm:text-4xl opacity-40 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-1/3 right-20 text-xl sm:text-3xl opacity-50 animate-bounce delay-500">
          🌺
        </div>
        <div className="absolute bottom-1/3 left-16 text-lg sm:text-2xl opacity-40 animate-pulse delay-1500">
          🌷
        </div>
        <div className="absolute bottom-20 right-10 text-2xl sm:text-4xl opacity-40 animate-bounce delay-700">
          🌹
        </div>
        <div className="absolute top-1/2 left-1/3 text-xl sm:text-3xl opacity-30 animate-pulse delay-2000 hidden md:block">
          💐
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-main mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-main max-w-2xl mx-auto leading-relaxed px-4">
            Let's create something beautiful together. Reach out for custom
            arrangements, event planning, or any floral needs.
          </p>
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="w-20 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-primary/10">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Contact Information
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-all duration-300 group">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform duration-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm sm:text-base">
                      Phone
                    </h3>
                    <p className="text-main/70 text-sm sm:text-base">
                      +94 31 223 4567
                    </p>
                    <p className="text-main/70 text-sm sm:text-base">
                      +94 77 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-all duration-300 group">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-secondary group-hover:scale-110 transition-transform duration-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm sm:text-base">
                      Email
                    </h3>
                    <p className="text-main/70 text-sm sm:text-base">
                      info@flowerbloom.lk
                    </p>
                    <p className="text-main/70 text-sm sm:text-base">
                      orders@flowerbloom.lk
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-all duration-300 group">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:scale-110 transition-transform duration-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm sm:text-base">
                      Location
                    </h3>
                    <p className="text-main/70 text-sm sm:text-base">
                      123 Main Street
                    </p>
                    <p className="text-main/70 text-sm sm:text-base">
                      Negombo, Western Province
                    </p>
                    <p className="text-main/70 text-sm sm:text-base">
                      Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-all duration-300 group">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform duration-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm sm:text-base">
                      Business Hours
                    </h3>
                    <p className="text-main/70 text-sm sm:text-base">
                      Mon - Sat: 8:00 AM - 7:00 PM
                    </p>
                    <p className="text-main/70 text-sm sm:text-base">
                      Sunday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-accent text-xs sm:text-sm font-medium">
                      Emergency orders: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-primary/10">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                Quick Order
              </h3>
              <p className="text-main/70 text-sm sm:text-base mb-3 sm:mb-4">
                Need flowers urgently? Call us directly for same-day
                arrangements.
              </p>
              <a
                href="tel:+94312234567"
                className="block w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-2 sm:py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Call Now: +94 31 223 4567
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-primary/10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block  font-medium mb-2 text-sm sm:text-base">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block  font-medium mb-2 text-sm sm:text-base">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/80 border border-primary/20 rounded-xl  placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Event Type Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block  font-medium mb-2 text-sm sm:text-base">
                      Phone Number (+94xxxxxxxxx)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/80 border border-primary/20 rounded-xl placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 text-sm sm:text-base"
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block  font-medium mb-2 text-sm sm:text-base">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/80 border border-primary/20 rounded-xl  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="funeral">Funeral/Memorial</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="graduation">Graduation</option>
                      <option value="valentine">Valentine's Day</option>
                      <option value="mother">Mother's Day</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block  font-medium mb-3 text-sm sm:text-base">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === "email"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-primary/30 focus:ring-primary/30"
                      />
                      <span className=" text-sm sm:text-base">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === "phone"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-primary/30 focus:ring-primary/30"
                      />
                      <span className=" text-sm sm:text-base">Phone</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="whatsapp"
                        checked={formData.preferredContact === "whatsapp"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-primary/30 focus:ring-primary/30"
                      />
                      <span className=" text-sm sm:text-base">WhatsApp</span>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block  font-medium mb-2 text-sm sm:text-base">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background/80 border border-primary/20 rounded-xl  placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder="Tell us about your event, preferred flowers, budget, and any special requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 disabled:from-primary/50 disabled:via-secondary/50 disabled:to-primary/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-main mb-3 sm:mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
              We Serve These Areas
            </h2>
            <p className="text-main text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Fast delivery and setup services available across Western Province
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              "Negombo",
              "Colombo",
              "Gampaha",
              "Kalutara",
              "Kelaniya",
              "Maharagama",
              "Moratuwa",
              "Panadura",
              "Ja-Ela",
              "Wattala",
              "Dehiwala",
              "Ratmalana",
            ].map((area, index) => (
              <div
                key={area}
                className="bg-surface/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-lg sm:text-xl mb-1 group-hover:scale-110 transition-transform duration-300">
                  {index % 4 === 0
                    ? "🌸"
                    : index % 4 === 1
                    ? "🌺"
                    : index % 4 === 2
                    ? "🌷"
                    : "🌹"}
                </div>
                <p className="text-main font-medium text-xs sm:text-sm">
                  {area}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-main mb-3 sm:mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-main mb-2 sm:mb-3 text-sm sm:text-base">
                Do you offer same-day delivery?
              </h3>
              <p className="text-main/70 text-sm sm:text-base">
                Yes! We offer same-day delivery within Negombo area for orders
                placed before 2:00 PM.
              </p>
            </div>

            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-main mb-2 sm:mb-3 text-sm sm:text-base">
                Can you create custom arrangements?
              </h3>
              <p className="text-main/70 text-sm sm:text-base">
                Absolutely! We specialize in custom designs. Share your vision
                and we'll bring it to life.
              </p>
            </div>

            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-main mb-2 sm:mb-3 text-sm sm:text-base">
                What's the difference between fresh and artificial?
              </h3>
              <p className="text-main/70 text-sm sm:text-base">
                Fresh flowers are perfect for immediate events, while our
                premium artificial flowers offer lasting beauty for long-term
                displays.
              </p>
            </div>

            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-main mb-2 sm:mb-3 text-sm sm:text-base">
                Do you handle large events?
              </h3>
              <p className="text-main/70 text-sm sm:text-base">
                Yes! From intimate gatherings to grand weddings and corporate
                events - we handle all sizes with expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mt-12 sm:mt-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-primary/10 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
                🌺
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 sm:mb-4">
                Need Flowers Urgently?
              </h3>
              <p className="text-main/70 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                We understand that some moments can't wait. Contact us for
                emergency flower deliveries and last-minute arrangements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href="tel:+94771234567"
                  className="w-full sm:w-auto bg-gradient-to-r from-accent to-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  Emergency: +94 77 123 4567
                </a>
                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-surface hover:bg-surface/80 border border-primary/30 hover:border-primary/50 text-main px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
