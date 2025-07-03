import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, Plus, Minus, X, CreditCard, Banknote, Check } from 'lucide-react';

const KioskApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('burger');
  const [showTutorial, setShowTutorial] = useState(true);

  const categories = [
    { id: 'burger', name: '햄버거', icon: '🍔' },
    { id: 'chicken', name: '치킨', icon: '🍗' },
    { id: 'side', name: '사이드', icon: '🍟' },
    { id: 'drink', name: '음료', icon: '🥤' },
    { id: 'dessert', name: '디저트', icon: '🍰' }
  ];

  const menuItems = {
    burger: [
      { id: 1, name: '빅맥', price: 6500, image: '🍔' },
      { id: 2, name: '치즈버거', price: 4500, image: '🍔' },
      { id: 3, name: '불고기버거', price: 5500, image: '🍔' }
    ],
    chicken: [
      { id: 4, name: '치킨너겟', price: 4000, image: '🍗' },
      { id: 5, name: '핫윙', price: 5000, image: '🍗' },
      { id: 6, name: '치킨버거', price: 6000, image: '🍗' }
    ],
    side: [
      { id: 7, name: '감자튀김', price: 2500, image: '🍟' },
      { id: 8, name: '양파링', price: 3000, image: '🧅' },
      { id: 9, name: '코울슬로', price: 2000, image: '🥗' }
    ],
    drink: [
      { id: 10, name: '콜라', price: 2000, image: '🥤' },
      { id: 11, name: '사이다', price: 2000, image: '🥤' },
      { id: 12, name: '아메리카노', price: 2500, image: '☕' }
    ],
    dessert: [
      { id: 13, name: '아이스크림', price: 2500, image: '🍦' },
      { id: 14, name: '애플파이', price: 3000, image: '🥧' },
      { id: 15, name: '초콜릿쿠키', price: 2000, image: '🍪' }
    ]
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const Tutorial = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg mx-4 text-center w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600">키오스크 사용법</h2>
        <div className="text-left space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <p className="text-sm sm:text-base md:text-lg">1. 화면을 터치하여 메뉴를 선택합니다</p>
          <p className="text-sm sm:text-base md:text-lg">2. 원하는 음식을 장바구니에 담습니다</p>
          <p className="text-sm sm:text-base md:text-lg">3. 주문 내역을 확인합니다</p>
          <p className="text-sm sm:text-base md:text-lg">4. 결제 방법을 선택합니다</p>
          <p className="text-sm sm:text-base md:text-lg">5. 천천히 따라하시면 됩니다!</p>
        </div>
        <button 
          onClick={() => setShowTutorial(false)}
          className="bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-blue-700 w-full sm:w-auto"
        >
          연습 시작하기
        </button>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-red-600 text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">🍔 패스트푸드 키오스크</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8">주문하려면 화면을 터치하세요</p>
      </div>
      
      <button 
        onClick={() => setCurrentScreen('menu')}
        className="bg-white text-red-600 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-lg text-xl sm:text-2xl md:text-3xl font-bold hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-all duration-200 w-full max-w-xs sm:max-w-sm"
      >
        주문하기
      </button>
      
      <div className="mt-6 sm:mt-8 text-center w-full max-w-md">
        <p className="text-sm sm:text-base md:text-lg opacity-90 mb-3 sm:mb-4">매장에서 드시나요? 포장하시나요?</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-yellow-600 flex-1">
            매장 식사
          </button>
          <button className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-green-600 flex-1">
            포장 주문
          </button>
        </div>
      </div>
    </div>
  );

  const MenuScreen = () => (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-red-600 text-white p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="p-2 bg-red-700 rounded-lg hover:bg-red-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">메뉴 선택</h1>
        </div>
        <button 
          onClick={() => setCurrentScreen('cart')}
          className="flex items-center gap-1 sm:gap-2 bg-red-700 px-2 sm:px-3 md:px-4 py-2 rounded-lg hover:bg-red-800"
        >
          <ShoppingCart size={18} />
          <span className="text-sm sm:text-base md:text-lg">장바구니 ({cart.length})</span>
        </button>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {/* 카테고리 섹션 */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">카테고리</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 sm:p-4 rounded-lg text-center flex flex-col items-center gap-1 sm:gap-2 text-sm sm:text-base font-semibold transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-white hover:bg-gray-50 shadow-md'
                }`}
              >
                <span className="text-2xl sm:text-3xl">{category.icon}</span>
                <span className="truncate">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 메뉴 항목 섹션 */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {categories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {menuItems[selectedCategory]?.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">{item.image}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">{item.price.toLocaleString()}원</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-red-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    장바구니에 담기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CartScreen = () => (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-red-600 text-white p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setCurrentScreen('menu')}
            className="p-2 bg-red-700 rounded-lg hover:bg-red-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">장바구니</h1>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {cart.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4">장바구니가 비어있습니다</p>
            <button 
              onClick={() => setCurrentScreen('menu')}
              className="bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-red-700"
            >
              메뉴 선택하기
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">주문 내역</h2>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{item.image}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold truncate">{item.name}</h3>
                        <p className="text-base sm:text-lg text-gray-600">{item.price.toLocaleString()}원</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 sm:p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-lg sm:text-xl font-semibold w-6 sm:w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 sm:p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 sm:p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg mt-4 sm:mt-6">
                  <div className="flex justify-between items-center text-lg sm:text-xl md:text-2xl font-bold">
                    <span>총 금액:</span>
                    <span className="text-red-600">{getTotalPrice().toLocaleString()}원</span>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('payment')}
                  className="w-full bg-red-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-lg sm:text-xl font-semibold hover:bg-red-700 transition-colors mt-4 sm:mt-6"
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const PaymentScreen = () => (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-red-600 text-white p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setCurrentScreen('cart')}
            className="p-2 bg-red-700 rounded-lg hover:bg-red-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">결제</h1>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">주문 요약</h2>
            <div className="space-y-2 mb-3 sm:mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm sm:text-base">
                  <span className="truncate pr-2">{item.name} x {item.quantity}</span>
                  <span className="flex-shrink-0">{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 sm:pt-4">
              <div className="flex justify-between text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                <span>총 금액:</span>
                <span>{getTotalPrice().toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">결제 방법 선택</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button 
                onClick={() => setCurrentScreen('complete')}
                className="flex items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
              >
                <CreditCard size={24} className="text-red-600 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">카드 결제</h3>
                  <p className="text-sm sm:text-base text-gray-600">신용카드, 체크카드</p>
                </div>
              </button>
              <button 
                onClick={() => setCurrentScreen('complete')}
                className="flex items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
              >
                <Banknote size={24} className="text-red-600 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">현금 결제</h3>
                  <p className="text-sm sm:text-base text-gray-600">현금으로 결제</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompleteScreen = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center max-w-sm sm:max-w-md w-full">
        <div className="text-green-600 mb-4">
          <Check size={48} className="mx-auto" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">주문 완료!</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
          주문번호: #{Math.floor(Math.random() * 1000) + 1}
        </p>
        <p className="text-lg sm:text-xl mb-4 sm:mb-6">
          잠시만 기다려주세요. 곧 준비해드리겠습니다.
        </p>
        <button 
          onClick={() => {
            setCurrentScreen('home');
            setCart([]);
            setSelectedCategory('burger');
          }}
          className="w-full bg-red-600 text-white py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-semibold hover:bg-red-700"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {showTutorial && <Tutorial />}
      
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'menu' && <MenuScreen />}
      {currentScreen === 'cart' && <CartScreen />}
      {currentScreen === 'payment' && <PaymentScreen />}
      {currentScreen === 'complete' && <CompleteScreen />}
    </div>
  );
};

export default KioskApp;