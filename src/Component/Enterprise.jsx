import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Upload,
  ShoppingBag,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Send,
  MessageCircle,
  X,
  Layers,
  Award,
  Leaf,
  Plus,
  Minus,
  Check,
  ExternalLink,
  Sliders,
  RefreshCw,
  Eye,
  FileText,
  Star,
  Activity,
  HeartHandshake,
  Waves,
  Zap
} from "lucide-react";

const PRODUCTS = [
  {
    id: "prod-1",
    name: "Aura Royale Fine Glass",
    volume: "750 ml",
    ph: "8.8",
    tds: "< 95 ppm",
    packaging: "Flint Glass Bottle with Crown Finish",
    price: 180,
    minOrder: 24,
    description: "Architected for high-end Michelin dining, luxury suites, and boardroom banquets.",
    minerals: { Calcium: "24 mg/L", Magnesium: "18 mg/L", Potassium: "6 mg/L", Electrolytes: "Optimized" },
    badge: "Bestseller Fine Dining",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "prod-2",
    name: "Frosted Silhouette",
    volume: "500 ml",
    ph: "8.5",
    tds: "< 110 ppm",
    packaging: "Nordic Frosted Glass / Matte Gold Cap",
    price: 135,
    minOrder: 48,
    description: "Sleek velvet frosted touch, favorite among boutique hotels and luxury wellness spas.",
    minerals: { Calcium: "20 mg/L", Magnesium: "15 mg/L", Potassium: "5 mg/L", Electrolytes: "Rich" },
    badge: "Spa & Luxury Wellness",
    tagColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "prod-3",
    name: "Petite Luxe Reserve",
    volume: "250 ml",
    ph: "8.6",
    tds: "< 85 ppm",
    packaging: "Crystal Clear Glass / Aluminum Screw Cap",
    price: 85,
    minOrder: 60,
    description: "Single-serving perfection for VIP conferences, wedding receptions, and aviation charters.",
    minerals: { Calcium: "18 mg/L", Magnesium: "14 mg/L", Potassium: "4 mg/L", Electrolytes: "Balanced" },
    badge: "Weddings & Galas",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    id: "prod-4",
    name: "Corporate Executive Dispenser",
    volume: "20 L",
    ph: "8.5+",
    tds: "< 105 ppm",
    packaging: "BPA-Free Food Grade Reusable Polycarbonate",
    price: 450,
    minOrder: 5,
    description: "Sustained hydration crafted for executive suites, tech headquarters, and premium gyms.",
    minerals: { Calcium: "22 mg/L", Magnesium: "16 mg/L", Potassium: "5.5 mg/L", Electrolytes: "Infused" },
    badge: "Enterprise Bulk",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

const CLIENT_LOGOS = [
  { name: "Oberoi Grandeur", category: "Hospitality" },
  { name: "The Leela Palace", category: "Luxury Resort" },
  { name: "Taj Exotica", category: "5-Star Suites" },
  { name: "St. Regis Residences", category: "Ultra Luxury" },
  { name: "Four Seasons Dining", category: "Michelin Partner" },
  { name: "Gourmet Connoisseur Club", category: "Private Member" }
];

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "02:00 PM - 03:00 PM",
  "03:30 PM - 04:30 PM",
  "05:00 PM - 06:00 PM"
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  // Mouse hover 3D tilt state for hero bottle
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [whatsAppHistory, setWhatsAppHistory] = useState([
    {
      id: 1,
      sender: "system",
      text: "👋 Welcome to Shaanta Enterprise. We curate custom-labeled natural pH 8.5+ alkaline water for luxury hospitality, corporate spaces, and elite events.",
      time: "Just now"
    }
  ]);

  // Private Label Studio State
  const [bottleMaterial, setBottleMaterial] = useState("glass");
  const [bottleVolume, setBottleVolume] = useState("500ml");
  const [capFinish, setCapFinish] = useState({ name: "Brushed Gold", hex: "#D4AF37", border: "#ecc94b" });
  const [brandText, setBrandText] = useState("GRAND LUXE RESORT");
  const [taglineText, setTaglineText] = useState("EST. 1994 • PRIVATE RESERVE");
  const [labelBgColor, setLabelBgColor] = useState("#0f172a");
  const [labelTextColor, setLabelTextColor] = useState("#f8fafc");
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [customQuantity, setCustomQuantity] = useState(1000);
  const fileInputRef = useRef(null);

  // Booking Engine State
  const [bookingDate, setBookingDate] = useState("2026-10-24");
  const [bookingSlot, setBookingSlot] = useState(TIME_SLOTS[1]);
  const [bookingType, setBookingType] = useState("tasting");
  const [bookingFormData, setBookingFormData] = useState({
    fullName: "",
    orgName: "",
    phone: "",
    email: "",
    attendees: "2-4 People",
    notes: ""
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Checkout State
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: "Aakash Mehta",
    email: "aakash@mehtagroup.com",
    phone: "+91 63627 93476",
    address: "Suite 12A, Marine One Towers, Nariman Point, Mumbai 400021",
    gstin: "27AABCU9603R1ZM"
  });

  const customBottlePrice = useMemo(() => {
    let base = bottleMaterial === "glass" ? 115 : bottleMaterial === "frosted" ? 135 : 68;
    if (bottleVolume === "750ml") base += 35;
    if (bottleVolume === "250ml") base -= 20;
    if (customQuantity >= 5000) base *= 0.82;
    else if (customQuantity >= 2500) base *= 0.88;
    else if (customQuantity >= 1000) base *= 0.94;
    return Math.round(base);
  }, [bottleMaterial, bottleVolume, customQuantity]);

  const customOrderSubtotal = customBottlePrice * customQuantity;

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const gstTax = Math.round(cartSubtotal * 0.18);
  const cartTotal = cartSubtotal + gstTax;

  const triggerToast = (title, message) => {
    setNotificationToast({ title, message });
    setTimeout(() => {
      setNotificationToast(null);
    }, 4000);
  };

  const handleAddToCart = (product, qty = product.minOrder) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    triggerToast("Item Added", `${product.name} (${qty} units) added to cart.`);
    setIsCartOpen(true);
  };

  const handleAddCustomToCart = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Private Label: ${brandText}`,
      volume: `${bottleVolume} (${bottleMaterial.toUpperCase()})`,
      ph: "8.5+ Pure Natural",
      packaging: `${capFinish.name} Cap • Custom Die-Cut (${customQuantity} units)`,
      price: customBottlePrice,
      quantity: customQuantity,
      isCustom: true
    };
    setCart((prev) => [...prev, customItem]);
    triggerToast("Custom Label Created", `Order batch configured for ${brandText}`);
    setIsCartOpen(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedLogo(uploadEvent.target.result);
        triggerToast("Logo Applied", "Vector artwork successfully positioned on bottle label.");
      };
      reader.readAsDataURL(file);
    }
  };

  const sendWhatsAppNotification = (messageText) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setWhatsAppHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "system",
        text: messageText,
        time: now
      }
    ]);
    setIsWhatsAppModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingFormData.fullName || !bookingFormData.phone) return;
    setBookingConfirmed(true);
    sendWhatsAppNotification(
      `✅ *BOOKING CONFIRMED* - Shaanta Enterprise\n\nDear ${bookingFormData.fullName},\nYour tasting consultation has been scheduled for *${bookingDate}* at *${bookingSlot}*.\nVenue: Shaanta Experience Center & Bottling Facility.\nA dedicated Sommelier has been reserved for your team.`
    );
  };

  const handleProcessPayment = () => {
    setCheckoutStep(2);
    setTimeout(() => {
      setCheckoutStep(3);
      sendWhatsAppNotification(
        `💳 *PAYMENT SUCCESSFUL & ORDER INITIATED* (Ref: #SHAAN-${Math.floor(100000 + Math.random() * 900000)})\n\nAmount Captured: ₹${cartTotal.toLocaleString("en-IN")}\nClient: ${customerInfo.name}\nWe have initialized batch production. Digital label die-line proofs will be sent here shortly.`
      );
      setCart([]);
    }, 1800);
  };

  // Mouse move handler for realistic 3D bottle tilt in Hero
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 font-sans selection:bg-cyan-500 selection:text-white antialiased text-left relative overflow-x-hidden">
      {/* Dynamic Embedded CSS Keyframes for High-End Glass & Liquid Animations */}

      {/* Floating Interactive Toast Alert */}
      {notificationToast && (
        <div className="fixed top-6 right-6 z-50 animate-bounce duration-300">
          <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-300">{notificationToast.title}</div>
              <div className="text-[11px] text-slate-300">{notificationToast.message}</div>
            </div>
            <button
              onClick={() => setNotificationToast(null)}
              className="text-slate-400 hover:text-white ml-2 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- TOP NOTIFICATION ANNOUNCEMENT ----------------- */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 py-2 px-4 text-xs font-medium text-white text-center flex items-center justify-center gap-3 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-30 transform -skew-x-12 animate-[shimmerGlow_4s_infinite]" />
        <span className="flex items-center gap-1.5 font-semibold relative z-10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
          FSSAI & BIS Certified Alkaline Water • Natural pH 8.5+ with Active Electrolytes
        </span>
        <span className="hidden md:inline-block text-white/40">|</span>
        <button
          onClick={() => {
            setActiveTab("studio");
            window.scrollTo({ top: 350, behavior: "smooth" });
          }}
          className="hidden md:flex items-center text-cyan-100 hover:text-white underline font-semibold transition group"
        >
          Customize Hotel Batch <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-1 transition duration-200" />
        </button>
      </div>

      {/* ----------------- HEADER NAVIGATION ----------------- */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Droplets className="w-6 h-6 text-cyan-600 group-hover:rotate-12 transition duration-300" />
              </div>
            </div>
            <div>
              <div className="text-xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-600">
                Shaanta
              </div>
              <div className="text-[10px] tracking-[0.25em] text-cyan-600 font-bold uppercase -mt-0.5">
                Enterprise • Alkaline
              </div>
            </div>
          </div>

          {/* Navigation Links with animated hover pill indicator */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/60">
            {[
              { id: "home", label: "Overview" },
              { id: "products", label: "Alkaline Collection" },
              { id: "studio", label: "Private Label Studio", icon: <Sliders className="w-3.5 h-3.5 mr-1 text-cyan-500" /> },
              { id: "booking", label: "Book Tasting" },
              { id: "why", label: "Why Shaanta" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-cyan-700 shadow-sm font-bold scale-[1.02]"
                    : "hover:text-cyan-600 hover:bg-white/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="relative p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
              title="WhatsApp Bot & Live Status"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("studio")}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-600/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Design Bottle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </header>

      {}
      <main>
        {activeTab === "home" && (
          <div>
            {/* HERO SECTION WITH DYNAMIC 3D TILT ANIMATION */}
            <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
              {/* Background Ambient Radial Glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-200/40 via-sky-100/30 to-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Copy & Interactive CTAs */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wide shadow-sm hover:scale-105 transition duration-300 cursor-default">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                      THE BENCHMARK IN LUXURY ALKALINE HYDRATION
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                      Pure Elevation. <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600">
                        Naturally Balanced pH 8.5+
                      </span>{" "}
                      for Prestigious Brands.
                    </h1>

                    <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                      Shaanta Enterprise crafts bespoke water experiences. We supply 5-star hotels, luxury events,
                      corporate headquarters, and private estates with mineral-rich alkaline water packaged in custom-branded flint glass and Nordic silhouettes.
                    </p>

                    {/* Animated Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                      <button
                        onClick={() => setActiveTab("studio")}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <Sliders className="w-4 h-4 group-hover:rotate-180 transition duration-500" />
                        <span>Launch 2D Bottle Studio</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("products")}
                        className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-cyan-500 text-slate-700 font-bold text-sm transition-all duration-300 hover:bg-cyan-50/50 hover:scale-105 shadow-sm flex items-center gap-2 group"
                      >
                        <span>View Catalog</span>
                        <ChevronRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-1 transition duration-200" />
                      </button>

                      <button
                        onClick={() => setActiveTab("booking")}
                        className="px-6 py-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 hover:bg-cyan-100 font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-cyan-600 animate-pulse" />
                        <span>Book Tasting Slot</span>
                      </button>
                    </div>

                    {/* Animated Badges */}
                    <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                      {[
                        { title: "pH 8.5 - 9.0", sub: "Natural Alkaline Buffer" },
                        { title: "< 95 ppm", sub: "Ultra-Pure Low TDS" },
                        { title: "Touchless", sub: "Cleanroom Bottling" },
                        { title: "120+ Venues", sub: "Hospitality Partners" }
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-cyan-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                        >
                          <div className="text-cyan-600 font-black text-xl group-hover:scale-105 transition duration-300">{stat.title}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{stat.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hero Visual with Realistic 3D Mouse Tilt & Bubbles */}
                  <div
                    className="lg:col-span-5 relative flex justify-center perspective-[1000px]"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="relative w-80 sm:w-96 p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl transition-transform duration-200 ease-out animate-float"
                      style={{
                        transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`
                      }}
                    >
                      <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-black rounded-full uppercase tracking-wider shadow animate-pulse">
                        Signature Line
                      </div>

                      {/* Animated Water Bubbles inside bottle container */}
                      <div className="relative mx-auto flex flex-col items-center py-4">
                        {/* Bottle Cap */}
                        <div className="w-16 h-8 rounded-t-lg bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 shadow-md border-b border-amber-600 flex items-center justify-center transition-all duration-300 hover:brightness-110">
                          <div className="w-12 h-1 bg-white/60 rounded" />
                        </div>
                        {/* Bottle Neck */}
                        <div className="w-10 h-16 bg-gradient-to-r from-slate-100 via-cyan-50 to-slate-100 border-x border-cyan-300/80 relative overflow-hidden">
                          <div className="absolute inset-0 glass-specular" />
                        </div>
                        {/* Bottle Body */}
                        <div className="w-48 h-80 rounded-b-3xl bg-gradient-to-b from-cyan-50 via-sky-100/70 to-cyan-200/60 border-x-2 border-b-2 border-cyan-400 relative overflow-hidden flex flex-col items-center justify-center shadow-xl">
                          {/* Animated Bubbles */}
                          <div className="absolute w-2.5 h-2.5 rounded-full bg-white/70 bubble-1" />
                          <div className="absolute w-2 h-2 rounded-full bg-white/60 bubble-2" />
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-white/80 bubble-3" />

                          {/* Specular Glare Lines */}
                          <div className="absolute top-4 inset-x-3 h-2 bg-white/80 rounded-full blur-[1px]" />
                          <div className="absolute inset-y-0 left-2 w-2 bg-gradient-to-b from-white/80 via-transparent to-white/40 rounded-full" />
                          <div className="absolute inset-y-0 right-2 w-1 bg-white/40 rounded-full" />

                          {/* Center Custom Label Area with Interactive Hover Lift */}
                          <div className="w-36 py-6 px-3 rounded-lg bg-slate-900 shadow-2xl text-center space-y-1 transform hover:scale-105 transition-all duration-300 border border-amber-400/50 cursor-pointer">
                            <div className="w-7 h-7 mx-auto rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center animate-spin duration-[10000ms]">
                              <Sparkles className="w-4 h-4 text-amber-300" />
                            </div>
                            <div className="text-[11px] tracking-[0.2em] font-black text-white uppercase">
                              Shaanta Reserve
                            </div>
                            <div className="text-[7px] tracking-widest text-cyan-300 uppercase">
                              Naturally Alkaline
                            </div>
                            <div className="pt-1 text-[8px] font-mono text-slate-300 border-t border-slate-700">
                              pH 8.8 • 750 ML
                            </div>
                          </div>

                          <div className="absolute bottom-3 text-[11px] font-bold text-cyan-800 flex items-center gap-1.5">
                            <Droplets className="w-4 h-4 text-cyan-600 animate-bounce" />
                            Active Electrolytes
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-600 italic">
                          "The hallmark of our banquet tables. Discerning guests immediately recognize the quality."
                        </p>
                        <div className="text-[11px] font-bold text-cyan-700 mt-1">
                          — F&B Director, 5-Star Mumbai Hotel
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUSTED CLIENT MARQUEE WITH HOVER ANIMATION */}
            <section className="py-12 border-y border-slate-200 bg-slate-50/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-8">
                  Trusted Private Label Partner For Elite Venues & Enterprises
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
                  {CLIENT_LOGOS.map((client, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 text-center hover:border-cyan-500 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="text-sm font-bold text-slate-800 group-hover:text-cyan-600 transition">
                        {client.name}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                        {client.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3-STEP PROCESS FLOW WITH HOVER EXPANSION */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <div className="text-cyan-600 font-bold text-xs uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-500" /> Effortless Private Labeling
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                    From Custom Branding to Bottle in 3 Steps
                  </h2>
                  <p className="text-slate-600 text-sm mt-3">
                    Fast automated proofing, tailored die-cuts, and touchless robotic bottling delivered to your venue.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 font-black text-lg mb-6 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Configure Bottle & Upload Artwork</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Select flint glass, frosted Nordic, or rPET silhouettes, choose metallic cap finishes, and preview your custom logo.
                    </p>
                    <button
                      onClick={() => setActiveTab("studio")}
                      className="text-xs font-bold text-cyan-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Open 2D Studio <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Step 2 */}
                  <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-black text-lg mb-6 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Digital Approval</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Our in-house packaging specialists prepare dimensional print proofs and dispatch die-line files via WhatsApp.
                    </p>
                    <button
                      onClick={() => setIsWhatsAppModalOpen(true)}
                      className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      View Live WhatsApp Proof <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Step 3 */}
                  <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-lg mb-6 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      03
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Cleanroom Bottling & Logistics</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Packaged in sterile cleanrooms with touchless robotic capping and scheduled door-to-door freight.
                    </p>
                    <button
                      onClick={() => setActiveTab("booking")}
                      className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Book Factory Tour <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ----------------- PRODUCTS COLLECTION TAB ----------------- */}
        {activeTab === "products" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  <Waves className="w-3.5 h-3.5" /> Natural Mineral Ionization
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                  The Shaanta Alkaline Portfolio
                </h2>
                <p className="text-slate-600 text-sm mt-2 max-w-xl">
                  Enriched with bio-available magnesium, potassium, and calcium to neutralize acidity and replenish cellular vitality.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("studio")}
                className="px-4 py-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider hover:bg-cyan-100 hover:scale-105 active:scale-95 transition-all shadow-sm w-fit"
              >
                Launch Custom Label Studio
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-cyan-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${prod.tagColor}`}>
                        {prod.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{prod.volume}</span>
                    </div>

                    {/* Bottle Display Area with Glass Reflection */}
                    <div className="h-48 rounded-2xl bg-gradient-to-b from-slate-50 via-cyan-50/50 to-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden mb-5 group-hover:scale-105 transition duration-300">
                      <div className="w-16 h-36 border-2 border-cyan-400 rounded-t-lg rounded-b-2xl flex flex-col items-center justify-center p-2 relative bg-white/80 shadow-md">
                        <div className="w-6 h-3 bg-amber-400 rounded-t mb-1 opacity-90" />
                        <div className="w-full text-center py-2 bg-slate-900 text-white rounded text-[8px] font-bold">
                          pH {prod.ph}
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-800 font-bold bg-white/70 px-2 py-0.5 rounded-md shadow-sm">
                        TDS: {prod.tds}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex justify-between text-slate-500">
                        <span>Calcium:</span>
                        <span className="text-slate-800 font-bold">{prod.minerals.Calcium}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Magnesium:</span>
                        <span className="text-slate-800 font-bold">{prod.minerals.Magnesium}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Potassium:</span>
                        <span className="text-slate-800 font-bold">{prod.minerals.Potassium}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>pH Balance:</span>
                        <span className="text-cyan-700 font-bold">{prod.ph}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-2xl font-black text-slate-900">₹{prod.price}</span>
                        <span className="text-xs text-slate-500"> / unit</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Min: {prod.minOrder} units
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(prod, prod.minOrder)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-lg hover:shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add Batch to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- PRIVATE LABEL STUDIO TAB ----------------- */}
        {activeTab === "studio" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sliders className="w-3.5 h-3.5 text-cyan-600 animate-spin" /> Interactive 2D Private Label Simulator
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
                Brand Your Luxury Alkaline Water
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Customize glass silhouettes, caps, brand typography, and logo placements. Export specs or place your order directly.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Studio Controls */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
                {/* 1. Bottle Shape & Material */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                    1. Select Bottle Silhouette & Material
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "glass", label: "Flint Glass", sub: "Crystal Luxe", icon: "✨" },
                      { id: "frosted", label: "Frosted Nordic", sub: "Velvet Satin", icon: "❄️" },
                      { id: "pet", label: "Recycled rPET", sub: "Eco-Grade", icon: "🌿" }
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => setBottleMaterial(mat.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                          bottleMaterial === mat.id
                            ? "bg-cyan-50/70 border-cyan-500 text-slate-900 shadow-md scale-105"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-xl mb-1">{mat.icon}</div>
                        <div className="font-bold text-xs text-slate-900">{mat.label}</div>
                        <div className="text-[10px] text-slate-500">{mat.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Bottle Volume & Cap Finish */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                      2. Volume Size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["250ml", "500ml", "750ml"].map((vol) => (
                        <button
                          key={vol}
                          onClick={() => setBottleVolume(vol)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            bottleVolume === vol
                              ? "bg-cyan-600 text-white border-cyan-600 shadow-md scale-105"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {vol}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                      3. Cap Closure Finish
                    </label>
                    <div className="flex items-center gap-3">
                      {[
                        { name: "Brushed Gold", hex: "#D4AF37", border: "#ecc94b" },
                        { name: "Polished Silver", hex: "#C0C0C0", border: "#cbd5e1" },
                        { name: "Matte Black", hex: "#1e293b", border: "#475569" },
                        { name: "Nordic Rose", hex: "#b76e79", border: "#f472b6" }
                      ].map((cap) => (
                        <button
                          key={cap.name}
                          onClick={() => setCapFinish(cap)}
                          className={`w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center ${
                            capFinish.name === cap.name
                              ? "ring-4 ring-cyan-500/40 scale-125 shadow-lg"
                              : "opacity-80 hover:opacity-100 hover:scale-110"
                          }`}
                          style={{ backgroundColor: cap.hex, border: `2px solid ${cap.border}` }}
                          title={cap.name}
                        >
                          {capFinish.name === cap.name && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] text-cyan-800 block mt-2 font-bold">
                      Selected: {capFinish.name}
                    </span>
                  </div>
                </div>

                {/* 3. Typography & Artwork Customization */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    4. Brand Label & Logo Configuration
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block mb-1">
                        Brand / Venue Name
                      </span>
                      <input
                        type="text"
                        value={brandText}
                        onChange={(e) => setBrandText(e.target.value.toUpperCase())}
                        maxLength={24}
                        placeholder="e.g. TAJ PALACE or ACME CORP"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 tracking-wider font-semibold"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block mb-1">
                        Tagline / Subtext
                      </span>
                      <input
                        type="text"
                        value={taglineText}
                        onChange={(e) => setTaglineText(e.target.value.toUpperCase())}
                        maxLength={32}
                        placeholder="e.g. PRIVATE ESTATE RESERVE"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 tracking-wider font-semibold"
                      />
                    </div>
                  </div>

                  {/* Colors of the Label */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-500 font-medium">Label Background:</span>
                      <input
                        type="color"
                        value={labelBgColor}
                        onChange={(e) => setLabelBgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 hover:scale-110 transition"
                      />
                      <span className="text-[11px] font-mono text-slate-700 font-bold">{labelBgColor}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-500 font-medium">Text & Border Tint:</span>
                      <input
                        type="color"
                        value={labelTextColor}
                        onChange={(e) => setLabelTextColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 hover:scale-110 transition"
                      />
                      <span className="text-[11px] font-mono text-slate-700 font-bold">{labelTextColor}</span>
                    </div>
                  </div>

                  {/* Logo Artwork Uploader */}
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-500 font-medium block mb-2">
                      Upload Vector Logo or Monogram (PNG, SVG, JPG)
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-cyan-500 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 bg-slate-50/50 hover:bg-slate-50 group"
                    >
                      {uploadedLogo ? (
                        <div className="flex items-center justify-center gap-4">
                          <img
                            src={uploadedLogo}
                            alt="Brand Logo"
                            className="w-12 h-12 object-contain rounded bg-white p-1 border border-slate-300 shadow-sm animate-pulse"
                          />
                          <div className="text-left">
                            <span className="text-xs font-bold text-cyan-700 block">
                              Custom Artwork Applied
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Click to replace brand image file
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="w-6 h-6 text-cyan-600 mb-1 group-hover:scale-125 transition duration-300" />
                          <span className="text-xs font-bold text-slate-700">
                            Click to upload your logo file
                          </span>
                          <span className="text-[10px] text-slate-500 mt-0.5">
                            High-res transparent PNG or SVG recommended
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Quantity Tiers */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      5. Batch Quantity Tier
                    </label>
                    <span className="text-xs font-black text-cyan-700">
                      ₹{customBottlePrice} / bottle (All Inclusive)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[500, 1000, 2500, 5000].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setCustomQuantity(qty)}
                        className={`p-3 rounded-2xl border text-center transition-all duration-200 ${
                          customQuantity === qty
                            ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-md scale-105"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-sm font-bold">{qty.toLocaleString()}</div>
                        <div className="text-[9px] opacity-80">Units</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview Display with Realistic Visual Glow */}
              <div className="lg:col-span-5 sticky top-28 space-y-6">
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl text-center relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <span className="flex items-center gap-1 font-bold text-cyan-700">
                      <Eye className="w-3.5 h-3.5" /> 2D Dynamic Studio Preview
                    </span>
                    <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">
                      pH 8.5+ Alkaline
                    </span>
                  </div>

                  {/* Realistic Dynamic Bottle Render */}
                  <div className="relative py-6 flex flex-col items-center justify-center">
                    <div
                      className="w-14 h-7 rounded-t-md shadow-md border-b flex items-center justify-center transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: capFinish.hex,
                        borderColor: capFinish.border
                      }}
                    >
                      <div className="w-10 h-1 bg-white/50 rounded-full" />
                    </div>

                    <div
                      className={`w-9 h-14 border-x transition-colors duration-300 ${
                        bottleMaterial === "frosted"
                          ? "bg-slate-100/90 border-slate-300"
                          : bottleMaterial === "pet"
                          ? "bg-sky-50 border-sky-300"
                          : "bg-cyan-50 border-cyan-300"
                      }`}
                    />

                    <div
                      className={`w-48 sm:w-52 h-80 rounded-b-3xl border-2 transition-all duration-500 relative flex items-center justify-center overflow-hidden shadow-xl ${
                        bottleMaterial === "frosted"
                          ? "bg-gradient-to-b from-slate-100/70 via-slate-50 to-slate-200/50 border-slate-300"
                          : bottleMaterial === "pet"
                          ? "bg-gradient-to-b from-sky-50 via-sky-100/40 to-blue-50 border-sky-300"
                          : "bg-gradient-to-b from-cyan-50 via-sky-50 to-cyan-100/70 border-cyan-400"
                      }`}
                    >
                      <div className="absolute top-3 inset-x-2 h-1.5 bg-white rounded-full blur-[1px]" />
                      <div className="absolute inset-y-0 left-2 w-1.5 bg-white/80 rounded-full" />

                      {/* Custom Label Area with Smooth Color Shifts */}
                      <div
                        className="w-36 sm:w-40 py-5 px-3 rounded-md shadow-2xl transition-all duration-500 text-center flex flex-col items-center justify-between z-10 border transform hover:scale-105 cursor-pointer"
                        style={{
                          backgroundColor: labelBgColor,
                          borderColor: labelTextColor,
                          color: labelTextColor
                        }}
                      >
                        {uploadedLogo ? (
                          <img
                            src={uploadedLogo}
                            alt="Uploaded Logo"
                            className="w-10 h-10 object-contain mb-1.5 bg-white/10 rounded p-0.5"
                          />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full border flex items-center justify-center mb-1"
                            style={{ borderColor: labelTextColor }}
                          >
                            <Droplets className="w-4 h-4" />
                          </div>
                        )}

                        <div className="text-[12px] font-black tracking-widest uppercase leading-tight line-clamp-2">
                          {brandText || "YOUR BRAND"}
                        </div>

                        <div
                          className="text-[7px] tracking-[0.2em] uppercase mt-1 opacity-90 line-clamp-1"
                          style={{ color: labelTextColor }}
                        >
                          {taglineText || "NATURAL ALKALINE WATER"}
                        </div>

                        <div className="w-full mt-2 pt-1 border-t text-[6px] tracking-wider font-mono opacity-80 flex justify-between">
                          <span>pH 8.5+</span>
                          <span>{bottleVolume}</span>
                          <span>TDS &lt;95</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Order Quantity:</span>
                      <span className="text-slate-900 font-bold">{customQuantity.toLocaleString()} Units</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Unit Price:</span>
                      <span className="text-cyan-700 font-black">₹{customBottlePrice} / Bottle</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-slate-200">
                      <span className="text-slate-700 font-semibold">Subtotal:</span>
                      <span className="text-slate-900 font-black text-sm">
                        ₹{customOrderSubtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={handleAddCustomToCart}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-lg hover:shadow-cyan-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        sendWhatsAppNotification(
                          `📋 *SPEC SHEET REQUEST* for "${brandText}"\n\nVolume: ${bottleVolume} (${bottleMaterial.toUpperCase()})\nCap: ${capFinish.name}\nQuantity: ${customQuantity} Units\nEstimated Subtotal: ₹${customOrderSubtotal.toLocaleString("en-IN")}\nOur technical packaging team is assembling the die-line.`
                        );
                      }}
                      className="py-3 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:border-cyan-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-4 h-4 text-cyan-600" />
                      Spec Sheet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- BOOKING & TASTING SCHEDULER TAB ----------------- */}
        {activeTab === "booking" && (
          <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Exclusive Sommelier Sessions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Schedule a Tasting & Plant Tour
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Experience our multi-stage cleanroom facility, evaluate comparative TDS levels, and consult on glass embossing and hot-foil branding.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {bookingConfirmed ? (
                <div className="text-center py-10 space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Session Confirmed!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Your appointment for <span className="text-cyan-700 font-bold">{bookingDate}</span> at{" "}
                    <span className="text-cyan-700 font-bold">{bookingSlot}</span> has been confirmed.
                    An automated calendar invite and WhatsApp location PIN have been generated.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      onClick={() => setIsWhatsAppModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm hover:scale-105 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      View WhatsApp Alert
                    </button>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  {/* Step 1: Session Focus */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                      Select Session Focus
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div
                        onClick={() => setBookingType("tasting")}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                          bookingType === "tasting"
                            ? "bg-cyan-50/70 border-cyan-500 text-slate-900 shadow-md scale-[1.01]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-cyan-600" />
                          Water Tasting & Sommelier Pairing
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">
                          Ideal for restaurateurs, F&B leads, and wedding planners evaluating mineral palate notes.
                        </div>
                      </div>

                      <div
                        onClick={() => setBookingType("consultation")}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                          bookingType === "consultation"
                            ? "bg-cyan-50/70 border-cyan-500 text-slate-900 shadow-md scale-[1.01]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-cyan-600" />
                          Corporate Plant & Private Label Audit
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">
                          For luxury hotel chains and corporate procurement requiring recurring volume SLAs.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Date & Slot Selectors */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 transition"
                        min="2026-10-16"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                        Available Time Window
                      </label>
                      <select
                        value={bookingSlot}
                        onChange={(e) => setBookingSlot(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 transition"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Contact Inputs */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Representative Details
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        value={bookingFormData.fullName}
                        onChange={(e) =>
                          setBookingFormData({ ...bookingFormData, fullName: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="text"
                        placeholder="Organization / Brand Name"
                        value={bookingFormData.orgName}
                        onChange={(e) =>
                          setBookingFormData({ ...bookingFormData, orgName: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="WhatsApp Phone Number *"
                        required
                        value={bookingFormData.phone}
                        onChange={(e) =>
                          setBookingFormData({ ...bookingFormData, phone: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="email"
                        placeholder="Official Corporate Email"
                        value={bookingFormData.email}
                        onChange={(e) =>
                          setBookingFormData({ ...bookingFormData, email: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white font-bold text-sm uppercase tracking-wider hover:opacity-95 shadow-lg shadow-cyan-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 animate-pulse" />
                    Confirm Tasting Slot & Trigger WhatsApp Confirmation
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ----------------- WHY SHAANTA BENCHMARK TAB ----------------- */}
        {activeTab === "why" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-cyan-600 text-xs font-bold uppercase tracking-widest">
                Benchmark Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                How Shaanta Elevates Private Label Water
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                While traditional bottlers rely on slow email quotation cycles and basic RO water, Shaanta provides real-time label rendering, verified alkaline ionization, and automated order-to-production workflows.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-5 text-sm font-bold text-slate-700">Feature Capabilities</th>
                    <th className="p-5 text-sm font-bold text-cyan-800 bg-cyan-50/70 border-x border-cyan-200">
                      Shaanta Enterprise
                    </th>
                    <th className="p-5 text-sm font-bold text-slate-500">Standard Bottlers (e.g. Watergram)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {[
                    { feature: "Water Ionization & Alkalinity", shaanta: "Certified pH 8.5 - 9.0 Electrolytes", others: "Standard RO / Neutral pH 7.0" },
                    { feature: "Live 2D Bottle Customizer", shaanta: "Interactive Real-time Visualizer", others: "Manual quotation forms" },
                    { feature: "Integrated Payment Gateway", shaanta: "Instant UPI, Cards & Net Banking", others: "Manual bank wire or offline checks" },
                    { feature: "Automated WhatsApp System", shaanta: "Meta Cloud API Webhook Updates", others: "Manual sales representative followups" },
                    { feature: "Direct Tasting & Plant Tour Scheduler", shaanta: "Live Calendar Booking Engine", others: "Standard contact form submission" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="p-5 font-semibold text-slate-800">{row.feature}</td>
                      <td className="p-5 font-bold text-cyan-800 bg-cyan-50/40 border-x border-cyan-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                        {row.shaanta}
                      </td>
                      <td className="p-5 text-slate-500">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ----------------- CART DRAWER MODAL ----------------- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm bg-black/40 flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-white border-l border-slate-200 p-6 flex flex-col justify-between h-full shadow-2xl animate-slideLeft">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-600" />
                  <span className="font-bold text-slate-900 text-base">Procurement Cart</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    Your cart is currently empty. Add products from the collection or design a custom bottle batch.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between gap-3 text-xs hover:border-cyan-300 transition"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                        <div className="text-slate-500 text-[11px]">{item.packaging}</div>
                        <div className="text-cyan-700 font-mono mt-1 font-semibold">
                          ₹{item.price} × {item.quantity.toLocaleString()} units
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                        <span className="font-black text-slate-900 text-sm">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => setCart((prev) => prev.filter((i) => i.id !== item.id))}
                          className="text-[10px] text-rose-500 hover:underline font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-bold font-mono">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>GST (18% Harmonized):</span>
                  <span className="text-slate-900 font-bold font-mono">₹{gstTax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-cyan-700 text-base font-black font-mono">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-lg hover:shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- CHECKOUT GATEWAY MODAL ----------------- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-scaleUp">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setCheckoutStep(1);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-50 rounded-xl border border-cyan-200 text-cyan-700">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Secure Gateway Checkout</h3>
                    <p className="text-xs text-slate-500">256-Bit Encrypted Payment Processing</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Invoice Total</span>
                  <span className="text-xl font-black text-cyan-700 font-mono">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-600 font-medium block mb-1">Company / Billing Name</span>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-600 font-medium block mb-1">WhatsApp Phone</span>
                      <input
                        type="text"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <span className="text-slate-600 font-medium block mb-1">GSTIN Number</span>
                      <input
                        type="text"
                        value={customerInfo.gstin}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, gstin: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Select Payment Channel
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "upi", label: "Instant UPI", sub: "GPay / PhonePe" },
                      { id: "card", label: "Corporate Card", sub: "Visa / Master" },
                      { id: "net", label: "NetBanking", sub: "HDFC / ICICI" }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          paymentMethod === m.id
                            ? "bg-cyan-50 border-cyan-500 text-cyan-800 font-bold shadow-md scale-105"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-xs text-slate-900 font-bold">{m.label}</div>
                        <div className="text-[9px] text-slate-500">{m.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg shadow-emerald-600/30 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Pay ₹{cartTotal.toLocaleString("en-IN")} via {paymentMethod.toUpperCase()}
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-cyan-200 border-t-cyan-600 animate-spin" />
                <h4 className="text-lg font-bold text-slate-900">Communicating with Banking Gateway...</h4>
                <p className="text-xs text-slate-500">
                  Verifying cryptographic webhook signature and creating private label ledger records.
                </p>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="text-center py-8 space-y-4 animate-scaleUp">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 animate-bounce">
                  <Check className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Payment Authorized & Captured</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Transaction completed successfully. A formal GST invoice and digital production proof ticket have been dispatched to your registered WhatsApp.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsWhatsAppModalOpen(true);
                      setCheckoutStep(1);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm hover:scale-105 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp Notification
                  </button>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutStep(1);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- WHATSAPP MODAL BOT SIMULATOR ----------------- */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#111b21] border border-emerald-600/40 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col h-[520px] animate-scaleUp">
            {/* Header */}
            <div className="bg-[#202c33] p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">
                  SE
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    Shaanta Enterprise Official
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-emerald-400">Verified Business Cloud API</div>
                </div>
              </div>
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0b141a]">
              <div className="text-center">
                <span className="text-[9px] bg-[#182229] text-slate-400 px-3 py-1 rounded-md">
                  Messages are end-to-end encrypted with Shaanta Enterprise API.
                </span>
              </div>

              {whatsAppHistory.map((msg) => (
                <div key={msg.id} className="flex flex-col items-start max-w-[88%] animate-slideUp">
                  <div className="bg-[#202c33] text-slate-200 text-xs p-3.5 rounded-2xl rounded-tl-none border border-slate-800 shadow whitespace-pre-line leading-relaxed">
                    {msg.text}
                    <div className="text-[9px] text-slate-400 text-right mt-1.5 flex items-center justify-end gap-1">
                      {msg.time}
                      <span className="text-emerald-400">✓✓</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input simulation */}
            <div className="p-3 bg-[#202c33] flex items-center gap-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="Ask about label proofs, minimum orders..."
                className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-xs text-white focus:outline-none placeholder-slate-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    const text = e.target.value;
                    e.target.value = "";
                    setWhatsAppHistory((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        sender: "user",
                        text,
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      }
                    ]);
                    setTimeout(() => {
                      sendWhatsAppNotification(
                        `Thank you for contacting Shaanta Enterprise! A concierge has received: "${text}" and will share immediate assistance.`
                      );
                    }, 1200);
                  }
                }}
              />
              <button
                onClick={() => {
                  sendWhatsAppNotification(
                    "Hello! Our concierge is available 24/7 for custom bulk quotes and hotel sample kits."
                  );
                }}
                className="w-9 h-9 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-110 active:scale-95 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-slate-900 font-black text-lg tracking-wider">
                SHAANTA ENTERPRISE
              </span>
            </div>
            <p className="leading-relaxed">
              Pioneering private label alkaline hydration. Engineered for luxury hotels, corporate headquarters, and high-profile events across India.
            </p>
            <div className="text-[11px] text-cyan-800 font-mono font-bold">
              FSSAI Lic. No: 11522026000492 | ISO 9001:2015 Certified
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActiveTab("products")} className="hover:text-cyan-700 transition">
                  Alkaline Bottle Variants
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("studio")} className="hover:text-cyan-700 transition">
                  2D Custom Label Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("booking")} className="hover:text-cyan-700 transition">
                  Schedule Factory Tasting Slot
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("why")} className="hover:text-cyan-700 transition">
                  Why Shaanta Enterprise
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">
              Experience Lab & Plant
            </h4>
            <ul className="space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>Plot 42, Clean Tech Industrial Corridor, Navi Mumbai, MH 400705</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>+91 (022) 8900 4400 / +91 63627 93476</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>concierge@shaantaenterprise.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">
              Enterprise Newsletter
            </h4>
            <p className="mb-3">
              Receive quarterly mineral analysis whitepapers and private label seasonal packaging trends.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter corporate email"
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500 flex-1 shadow-sm"
              />
              <button
                onClick={() =>
                  sendWhatsAppNotification(
                    "Thank you for subscribing to Shaanta Enterprise quarterly mineral insights!"
                  )
                }
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition shadow-sm hover:scale-105 active:scale-95"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[11px]">
          <div>© {new Date().getFullYear()} Shaanta Enterprise Ltd. All rights reserved.</div>
          <div className="flex gap-4 mt-2 sm:mt-0 font-medium text-slate-600">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Lab Mineral Analysis Certificate</span>
            <span className="hover:underline cursor-pointer">Terms of Bottling</span>
          </div>
        </div>
      </footer>
    </div>
  );
}