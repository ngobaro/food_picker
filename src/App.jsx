import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, 
  Wallet, 
  Sparkles, 
  MapPin, 
  RefreshCw, 
  Flame, 
  Award,
  PlusCircle,
  Plus,
  X,
  Tag
} from 'lucide-react';

// ==================== DATABASE MÓN ĂN ====================
const INITIAL_FOOD_DATABASE = [
  // Ăn Sáng / Bình Dân
  { id: 1, name: 'Bánh Mì Pate Thịt', price: 20000, category: 'Ăn Sáng', rating: 4.8, calories: 380, image: '🥖', desc: 'Bánh mì giòn rụm với pate, chả lụa, thịt nguội và đồ chua.' },
  { id: 2, name: 'Bánh Mì Ốp La', price: 25000, category: 'Ăn Sáng', rating: 4.6, calories: 420, image: '🍳', desc: 'Hai trứng ốp la lòng đào + bánh mì nóng + nước tương.' },
  { id: 3, name: 'Bánh Mì Thịt Nướng', price: 28000, category: 'Ăn Sáng', rating: 4.7, calories: 450, image: '🥖', desc: 'Thịt nướng thơm lừng, đồ chua, rau và sốt đặc biệt.' },
  { id: 4, name: 'Bánh Mì Heo Quay', price: 30000, category: 'Ăn Sáng', rating: 4.7, calories: 480, image: '🥖', desc: 'Heo quay da giòn, thịt mềm, ăn kèm đồ chua.' },
  { id: 5, name: 'Bánh Mì Xíu Mại', price: 25000, category: 'Ăn Sáng', rating: 4.5, calories: 410, image: '🥖', desc: 'Xíu mại nóng hổi + nước sốt đậm đà.' },
  { id: 6, name: 'Xôi Mặn Thập Cẩm', price: 25000, category: 'Ăn Sáng', rating: 4.7, calories: 480, image: '🍚', desc: 'Xôi dẻo + ruốc + lạp xưởng + chả + trứng cút + mỡ hành.' },
  { id: 7, name: 'Xôi Gà Xé', price: 30000, category: 'Ăn Sáng', rating: 4.6, calories: 450, image: '🍗', desc: 'Xôi nếp thơm + gà xé phay + hành phi.' },
  { id: 8, name: 'Bánh Cuốn Nóng', price: 30000, category: 'Ăn Sáng', rating: 4.7, calories: 350, image: '🥞', desc: 'Bánh cuốn mỏng nhân thịt mộc nhĩ + chả + nước mắm.' },
  { id: 9, name: 'Bánh Giò + Chả', price: 25000, category: 'Ăn Sáng', rating: 4.5, calories: 360, image: '🥟', desc: 'Bánh giò mềm mịn nhân thịt + chả lụa.' },
  { id: 10, name: 'Cháo Lòng', price: 30000, category: 'Ăn Sáng', rating: 4.5, calories: 390, image: '🥣', desc: 'Cháo lòng Hà Nội với dồi, tim, gan và quẩy.' },
  { id: 11, name: 'Cháo Gà', price: 28000, category: 'Ăn Sáng', rating: 4.4, calories: 370, image: '🥣', desc: 'Cháo gà ta thơm ngon, thịt gà xé.' },
  { id: 12, name: 'Cháo Sườn', price: 30000, category: 'Ăn Sáng', rating: 4.5, calories: 400, image: '🥣', desc: 'Cháo sườn ninh nhừ, sườn mềm.' },
  { id: 13, name: 'Bánh Ướt Thịt Nướng', price: 30000, category: 'Ăn Sáng', rating: 4.6, calories: 380, image: '🥞', desc: 'Bánh ướt mềm + thịt nướng + nước mắm chua ngọt.' },
  { id: 14, name: 'Bánh Tráng Trộn', price: 20000, category: 'Ăn Vặt', rating: 4.5, calories: 290, image: '🥗', desc: 'Bánh tráng trộn Sài Gòn đầy đủ topping.' },
  { id: 15, name: 'Mì Tôm Trứng', price: 20000, category: 'Bình Dân', rating: 4.2, calories: 380, image: '🍜', desc: 'Mì gói + trứng + vài lát thịt bò tái.' },

  // Cơm
  { id: 16, name: 'Cơm Tấm Sườn', price: 35000, category: 'Cơm', rating: 4.9, calories: 620, image: '🍱', desc: 'Cơm tấm sườn nướng mỡ hành chuẩn vị Sài Gòn.' },
  { id: 17, name: 'Cơm Tấm Sườn Bì Chả', price: 42000, category: 'Cơm', rating: 4.9, calories: 680, image: '🍱', desc: 'Sườn + bì + chả + đồ chua đầy đủ.' },
  { id: 18, name: 'Cơm Tấm Sườn Trứng', price: 38000, category: 'Cơm', rating: 4.8, calories: 650, image: '🍱', desc: 'Sườn nướng + trứng ốp la.' },
  { id: 19, name: 'Cơm Gà Xối Mỡ', price: 40000, category: 'Cơm', rating: 4.8, calories: 630, image: '🍗', desc: 'Gà da giòn vàng + cơm mỡ gà thơm béo.' },
  { id: 20, name: 'Cơm Gà Xé', price: 35000, category: 'Cơm', rating: 4.6, calories: 580, image: '🍗', desc: 'Gà xé phay + cơm + nước mắm gừng.' },
  { id: 21, name: 'Cơm Thịt Kho Trứng', price: 32000, category: 'Cơm', rating: 4.7, calories: 590, image: '🍛', desc: 'Thịt ba chỉ kho trứng đậm đà.' },
  { id: 22, name: 'Cơm Thịt Kho Tàu', price: 35000, category: 'Cơm', rating: 4.7, calories: 610, image: '🍛', desc: 'Thịt kho tàu nước dừa thơm ngon.' },
  { id: 23, name: 'Cơm Cá Kho Tộ', price: 35000, category: 'Cơm', rating: 4.6, calories: 560, image: '🐟', desc: 'Cá kho tộ đậm vị, ăn với cơm nóng.' },
  { id: 24, name: 'Cơm Cá Chiên', price: 32000, category: 'Cơm', rating: 4.5, calories: 540, image: '🐟', desc: 'Cá chiên giòn + nước mắm chua ngọt.' },
  { id: 25, name: 'Cơm Trứng Ốp La', price: 25000, category: 'Cơm', rating: 4.4, calories: 480, image: '🍳', desc: 'Cơm + trứng ốp la + chả hoặc thịt.' },
  { id: 26, name: 'Cơm Đậu Hũ Nhồi Thịt', price: 30000, category: 'Cơm', rating: 4.5, calories: 520, image: '🍛', desc: 'Đậu hũ nhồi thịt sốt cà chua.' },
  { id: 27, name: 'Cơm Bò Xào', price: 38000, category: 'Cơm', rating: 4.6, calories: 570, image: '🍛', desc: 'Bò xào hành tây hoặc cần tỏi.' },
  { id: 28, name: 'Cơm Chiên Trứng', price: 30000, category: 'Cơm', rating: 4.5, calories: 550, image: '🍚', desc: 'Cơm chiên trứng thơm ngon.' },
  { id: 29, name: 'Cơm Rang Dưa Bò', price: 35000, category: 'Cơm', rating: 4.6, calories: 580, image: '🍚', desc: 'Cơm rang dưa chua + bò.' },
  { id: 30, name: 'Cơm Hến', price: 30000, category: 'Cơm', rating: 4.5, calories: 420, image: '🐚', desc: 'Cơm hến Huế đặc trưng, thanh mát.' },
  { id: 31, name: 'Cơm Sườn Rim', price: 35000, category: 'Cơm', rating: 4.6, calories: 600, image: '🍱', desc: 'Sườn rim chua ngọt đậm đà.' },
  { id: 32, name: 'Cơm Gà Chiên Nước Mắm', price: 38000, category: 'Cơm', rating: 4.7, calories: 620, image: '🍗', desc: 'Cánh/đùi gà chiên nước mắm thơm lừng.' },
  { id: 33, name: 'Cơm Xíu Mại', price: 32000, category: 'Cơm', rating: 4.5, calories: 540, image: '🍛', desc: 'Xíu mại sốt cà + cơm.' },
  { id: 34, name: 'Cơm Lạp Xưởng', price: 30000, category: 'Cơm', rating: 4.4, calories: 560, image: '🍛', desc: 'Lạp xưởng chiên + trứng + cơm.' },

  // Bún / Phở
  { id: 35, name: 'Bún Thịt Nướng', price: 35000, category: 'Bún / Phở', rating: 4.8, calories: 530, image: '🥗', desc: 'Bún + thịt nướng + chả giò + nước mắm.' },
  { id: 36, name: 'Bún Chả Hà Nội', price: 40000, category: 'Bún / Phở', rating: 4.8, calories: 580, image: '🥗', desc: 'Chả nướng than hoa + nước mắm chua ngọt.' },
  { id: 37, name: 'Bún Bò Huế', price: 45000, category: 'Bún / Phở', rating: 4.8, calories: 610, image: '🍲', desc: 'Nước dùng đậm đà mắm ruốc, sả, giò heo.' },
  { id: 38, name: 'Bún Riêu Cua', price: 38000, category: 'Bún / Phở', rating: 4.6, calories: 470, image: '🍜', desc: 'Riêu cua đồng + đậu hũ + huyết + dấm bỗng.' },
  { id: 39, name: 'Bún Đậu Mắm Tôm', price: 45000, category: 'Đặc Sản', rating: 4.9, calories: 680, image: '🍱', desc: 'Đậu chiên giòn + bún + mắm tôm + chả cốm.' },
  { id: 40, name: 'Phở Bò Tái', price: 40000, category: 'Bún / Phở', rating: 4.9, calories: 520, image: '🍲', desc: 'Nước dùng xương bò thanh ngọt + tái mềm.' },
  { id: 41, name: 'Phở Gà', price: 38000, category: 'Bún / Phở', rating: 4.7, calories: 480, image: '🥣', desc: 'Phở gà ta nước trong, thịt ngọt.' },
  { id: 42, name: 'Hủ Tiếu Nam Vang', price: 40000, category: 'Bún / Phở', rating: 4.7, calories: 490, image: '🍜', desc: 'Hủ tiếu + tôm + thịt băm + trứng cút.' },
  { id: 43, name: 'Bánh Canh Cua', price: 45000, category: 'Bún / Phở', rating: 4.7, calories: 510, image: '🥣', desc: 'Bánh canh bột lọc + thịt cua béo.' },
  { id: 44, name: 'Bánh Canh Giò Heo', price: 40000, category: 'Bún / Phở', rating: 4.6, calories: 530, image: '🥣', desc: 'Bánh canh + giò heo mềm.' },
  { id: 45, name: 'Hoành Thánh Nước', price: 35000, category: 'Bún / Phở', rating: 4.5, calories: 420, image: '🥟', desc: 'Hoành thánh nhân tôm thịt + nước dùng trong.' },
  { id: 46, name: 'Hoành Thánh Chiên', price: 30000, category: 'Ăn Vặt', rating: 4.5, calories: 450, image: '🥟', desc: 'Hoành thánh chiên giòn vàng.' },
  { id: 47, name: 'Mì Quảng', price: 40000, category: 'Bún / Phở', rating: 4.7, calories: 520, image: '🍜', desc: 'Mì Quảng gà tôm + bánh tráng nướng.' },
  { id: 48, name: 'Bún Mắm', price: 45000, category: 'Bún / Phở', rating: 4.6, calories: 550, image: '🍜', desc: 'Bún mắm miền Tây đậm đà.' },
  { id: 49, name: 'Phở Xào Bò', price: 38000, category: 'Bún / Phở', rating: 4.5, calories: 540, image: '🍜', desc: 'Phở xào bò mềm + rau cải.' },
  { id: 50, name: 'Mì Xào Bò', price: 35000, category: 'Bún / Phở', rating: 4.5, calories: 560, image: '🍜', desc: 'Mì xào bò + trứng.' },

  // Bò Né / Fastfood
  { id: 51, name: 'Bò Né', price: 45000, category: 'Đặc Sản', rating: 4.7, calories: 620, image: '🍳', desc: 'Bò né trứng + pate + bánh mì.' },
  { id: 52, name: 'Bò Né Đặc Biệt', price: 55000, category: 'Đặc Sản', rating: 4.8, calories: 700, image: '🍳', desc: 'Bò né đầy đủ topping.' },
  { id: 53, name: 'Gà Rán Phần Nhỏ', price: 40000, category: 'Fastfood', rating: 4.5, calories: 650, image: '🍗', desc: 'Gà rán giòn + khoai tây.' },
  { id: 54, name: 'Hamburger', price: 35000, category: 'Fastfood', rating: 4.4, calories: 580, image: '🍔', desc: 'Hamburger thịt bò/gà kiểu bình dân.' },
  { id: 55, name: 'Kebab Gà', price: 35000, category: 'Fastfood', rating: 4.5, calories: 520, image: '🥙', desc: 'Kebab gà cuốn bánh mì + sốt.' },
  { id: 56, name: 'Kebab Bò', price: 40000, category: 'Fastfood', rating: 4.5, calories: 550, image: '🥙', desc: 'Kebab bò thơm + rau + sốt.' },

  // Món Tây / Nhật / Hàn
  { id: 57, name: 'Pizza Mini', price: 50000, category: 'Món Tây', rating: 4.5, calories: 680, image: '🍕', desc: 'Pizza cá nhân phô mai hoặc hải sản.' },
  { id: 58, name: 'Pizza Phô Mai', price: 55000, category: 'Món Tây', rating: 4.6, calories: 720, image: '🍕', desc: 'Pizza phô mai kéo sợi.' },
  { id: 59, name: 'Mì Ý Sốt Bò Bằm', price: 45000, category: 'Món Tây', rating: 4.6, calories: 540, image: '🍝', desc: 'Spaghetti sốt bò bằm.' },
  { id: 60, name: 'Sushi Cuộn Cá Hồi', price: 60000, category: 'Nhật Bản', rating: 4.7, calories: 380, image: '🍣', desc: 'Set sushi cuộn cá hồi nhỏ.' },
  { id: 61, name: 'Sushi Tổng Hợp', price: 70000, category: 'Nhật Bản', rating: 4.7, calories: 420, image: '🍣', desc: 'Sushi tổng hợp vài miếng.' },
  { id: 62, name: 'Kimbap / Cơm Cuộn', price: 35000, category: 'Hàn Quốc', rating: 4.5, calories: 450, image: '🍙', desc: 'Kimbap cuộn đầy đủ.' },
  { id: 63, name: 'Cơm Trộn Hàn Quốc', price: 40000, category: 'Hàn Quốc', rating: 4.6, calories: 520, image: '🍲', desc: 'Cơm trộn + trứng + kim chi.' },

  // Đồ uống
  { id: 64, name: 'Cà Phê Sữa Đá', price: 20000, category: 'Đồ Uống', rating: 4.9, calories: 150, image: '☕', desc: 'Cà phê sữa đá Sài Gòn đậm đà.' },
  { id: 65, name: 'Cà Phê Đen Đá', price: 15000, category: 'Đồ Uống', rating: 4.7, calories: 20, image: '☕', desc: 'Cà phê đen đá nguyên chất.' },
  { id: 66, name: 'Cà Phê Muối', price: 25000, category: 'Đồ Uống', rating: 4.8, calories: 180, image: '☕', desc: 'Cà phê muối Huế béo mặn nhẹ.' },
  { id: 67, name: 'Trà Sữa Trân Châu', price: 35000, category: 'Đồ Uống', rating: 4.7, calories: 380, image: '🧋', desc: 'Trà sữa trân châu đường đen.' },
  { id: 68, name: 'Trà Đào Cam Sả', price: 30000, category: 'Đồ Uống', rating: 4.6, calories: 220, image: '🍹', desc: 'Trà đào thơm + cam + sả.' },
  { id: 69, name: 'Nước Mía', price: 15000, category: 'Đồ Uống', rating: 4.7, calories: 110, image: '🥤', desc: 'Nước mía tắc ướp lạnh.' },
  { id: 70, name: 'Sữa Đậu Nành', price: 12000, category: 'Đồ Uống', rating: 4.5, calories: 130, image: '🥛', desc: 'Sữa đậu nành nóng/lạnh.' },
  { id: 71, name: 'Trà Chanh', price: 15000, category: 'Đồ Uống', rating: 4.5, calories: 80, image: '🍋', desc: 'Trà chanh giải khát.' },

  // Ăn vặt khác
  { id: 72, name: 'Bánh Khọt', price: 35000, category: 'Ăn Vặt', rating: 4.6, calories: 410, image: '🍤', desc: 'Bánh khọt tôm giòn + rau sống.' },
  { id: 73, name: 'Bánh Xèo', price: 35000, category: 'Ăn Vặt', rating: 4.6, calories: 480, image: '🥞', desc: 'Bánh xèo miền Tây nhân tôm thịt.' },
  { id: 74, name: 'Gỏi Cuốn', price: 25000, category: 'Ăn Vặt', rating: 4.5, calories: 220, image: '🥗', desc: 'Gỏi cuốn tôm thịt tươi.' },
  { id: 75, name: 'Chả Giò', price: 20000, category: 'Ăn Vặt', rating: 4.4, calories: 350, image: '🍤', desc: 'Chả giò chiên giòn.' },
  { id: 76, name: 'Xôi Mặn', price: 25000, category: 'Ăn Sáng', rating: 4.5, calories: 460, image: '🍚', desc: 'Xôi mặn đầy đủ topping.' },
  { id: 77, name: 'Bánh Bao', price: 15000, category: 'Ăn Sáng', rating: 4.3, calories: 280, image: '🥟', desc: 'Bánh bao nhân thịt trứng cút.' },
  { id: 78, name: 'Há Cảo', price: 30000, category: 'Ăn Vặt', rating: 4.5, calories: 320, image: '🥟', desc: 'Há cảo hấp nhân tôm thịt.' },
  { id: 79, name: 'Cơm Niêu', price: 45000, category: 'Cơm', rating: 4.6, calories: 600, image: '🍲', desc: 'Cơm niêu cháy cạnh + món mặn.' },
  { id: 80, name: 'Lẩu Mini 1 Người', price: 55000, category: 'Lẩu / Nướng', rating: 4.6, calories: 650, image: '🍲', desc: 'Lẩu thái hoặc lẩu bò mini.' },
];

export default function App() {
  const [foodDatabase, setFoodDatabase] = useState(() => {
    const saved = localStorage.getItem('custom_food_db');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_DATABASE;
  });

  const [budgetMode, setBudgetMode] = useState('exact');
  const [maxBudget, setMaxBudget] = useState(60000);
  const [minBudget, setMinBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newFood, setNewFood] = useState({ name: '', price: 30000, category: 'Bình Dân', image: '🍱', desc: '' });

  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [reelItems, setReelItems] = useState([]);
  
  const reelRef = useRef(null);
  const cardWidth = 220;

  useEffect(() => {
    localStorage.setItem('custom_food_db', JSON.stringify(foodDatabase));
  }, [foodDatabase]);

  useEffect(() => {
    const valid = foodDatabase.filter(item => {
      const matchPrice = budgetMode === 'exact' 
        ? item.price <= maxBudget 
        : (item.price >= minBudget && item.price <= maxBudget);
      const matchCategory = selectedCategory === 'Tất Cả' || item.category === selectedCategory;
      return matchPrice && matchCategory;
    });

    setFilteredFoods(valid);
    
    if (selectedFood) {
      const isStillValid = valid.some(f => f.id === selectedFood.id);
      if (!isStillValid) setSelectedFood(null);
    }
  }, [maxBudget, minBudget, budgetMode, selectedCategory, foodDatabase]);

  const handleSpin = () => {
    if (filteredFoods.length === 0) return;
    
    setIsSpinning(true);
    setSelectedFood(null);

    const winnerIndex = Math.floor(Math.random() * filteredFoods.length);
    const winner = filteredFoods[winnerIndex];

    const repeats = 15;
    let newReel = [];
    for (let i = 0; i < repeats; i++) {
      newReel = [...newReel, ...filteredFoods];
    }
    
    const winnerPosition = newReel.length - filteredFoods.length + winnerIndex;
    newReel[winnerPosition] = winner;
    
    setReelItems(newReel);

    setTimeout(() => {
      if (reelRef.current) {
        const offset = winnerPosition * cardWidth - (reelRef.current.parentElement.clientWidth / 2 - cardWidth / 2);
        reelRef.current.style.transition = 'transform 4.5s cubic-bezier(0.15, 0.85, 0.35, 1.0)';
        reelRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }, 50);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedFood(winner);
    }, 4600);
  };

  const resetReelPosition = () => {
    if (reelRef.current) {
      reelRef.current.style.transition = 'none';
      reelRef.current.style.transform = 'translateX(0px)';
    }
  };

  useEffect(() => {
    resetReelPosition();
  }, [maxBudget, minBudget, selectedCategory, budgetMode]);

  const handleAddCustomFood = (e) => {
    e.preventDefault();
    if (!newFood.name.trim()) return;

    const created = {
      id: Date.now(),
      name: newFood.name.trim(),
      price: Number(newFood.price),
      category: newFood.category,
      rating: 5.0,
      calories: 450,
      image: newFood.image || '🍱',
      desc: newFood.desc.trim() || 'Món ăn tùy chỉnh do bạn thêm vào danh sách.'
    };

    setFoodDatabase(prev => [created, ...prev]);
    setNewFood({ name: '', price: 30000, category: 'Bình Dân', image: '🍱', desc: '' });
    setShowAddModal(false);
  };

  const categories = ['Tất Cả', ...Array.from(new Set(foodDatabase.map(f => f.category)))];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-rose-500 to-amber-500 p-2 rounded-xl text-white shadow-lg shadow-rose-500/20">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-400">
                Hôm Nay Ăn Gì?
              </h1>
              <p className="text-xs text-slate-400">80+ Món Việt & Tùy Chọn Giá Thông Minh</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Món Mới</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 py-6 flex-1 flex flex-col gap-6">

        {/* BỘ LỌC NGÂN SÁCH */}
        <section className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/40">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-semibold text-slate-200">Thiết Lập Ngân Sách</h2>
            </div>

            <div className="flex items-center bg-slate-900/90 border border-slate-700 p-1 rounded-xl text-xs">
              <button
                onClick={() => setBudgetMode('exact')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  budgetMode === 'exact' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Giá Tối Đa
              </button>
              <button
                onClick={() => setBudgetMode('range')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  budgetMode === 'range' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Khoảng Giá
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {budgetMode === 'range' && (
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Giá Tối Thiểu (VNĐ):</label>
                <div className="relative">
                  <input
                    type="number"
                    step="5000"
                    min="0"
                    value={minBudget}
                    onChange={(e) => setMinBudget(Math.max(0, Number(e.target.value)))}
                    disabled={isSpinning}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold text-base focus:outline-none focus:border-rose-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500">đ</span>
                </div>
              </div>
            )}

            <div className={budgetMode === 'exact' ? 'sm:col-span-2' : ''}>
              <label className="text-xs text-slate-400 mb-1 block">
                {budgetMode === 'exact' ? 'Số Tiền Tối Đa (VNĐ):' : 'Giá Tối Đa (VNĐ):'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="5000"
                  min="10000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  disabled={isSpinning}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2 text-amber-400 font-bold text-lg focus:outline-none focus:border-rose-500"
                />
                <span className="absolute right-3 top-3 text-xs text-slate-500">đ</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-xs text-slate-400">Chọn nhanh:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Dưới 30k', max: 30000, min: 0 },
                { label: '30k - 60k', max: 60000, min: 30000 },
                { label: '60k - 100k', max: 100000, min: 60000 },
                { label: 'Trên 100k', max: 250000, min: 100000 },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (budgetMode === 'range') {
                      setMinBudget(preset.min);
                      setMaxBudget(preset.max);
                    } else {
                      setMaxBudget(preset.max);
                    }
                  }}
                  disabled={isSpinning}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-300 hover:border-rose-500/60 transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/40 flex items-center gap-2 overflow-x-auto pb-1">
            <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                disabled={isSpinning}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-rose-500 border-rose-500 text-white font-medium shadow' 
                    : 'bg-slate-900/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Đã tìm thấy: <strong className="text-rose-400">{filteredFoods.length}</strong> món phù hợp</span>
            {filteredFoods.length === 0 && (
              <span className="text-rose-400 font-medium">⚠️ Không có món nào trong khoảng giá này!</span>
            )}
          </div>
        </section>

        {/* VÒNG QUAY */}
        <section className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-rose-500 filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.8)] animate-bounce"></div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-rose-500 filter drop-shadow-[0_-2px_8px_rgba(244,63,94,0.8)]"></div>
          </div>

          <div className="relative w-full overflow-hidden py-6 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

            <div 
              ref={reelRef}
              className="flex gap-4 items-center px-4"
              style={{ width: 'max-content' }}
            >
              {(reelItems.length > 0 ? reelItems : filteredFoods).map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  className="w-[204px] h-[150px] shrink-0 bg-slate-800/90 border border-slate-700/80 rounded-xl p-3 flex flex-col justify-between items-center text-center shadow-md select-none group"
                >
                  <div className="text-4xl my-1 group-hover:scale-110 transition-transform">
                    {item.image}
                  </div>
                  <div className="w-full">
                    <h3 className="font-semibold text-sm text-slate-100 truncate">{item.name}</h3>
                    <p className="text-xs text-rose-400 font-bold mt-0.5">{item.price.toLocaleString('vi-VN')} đ</p>
                  </div>
                  <span className="text-[10px] bg-slate-900/80 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              ))}

              {filteredFoods.length === 0 && (
                <div className="w-full py-10 text-center text-slate-500 italic">
                  Không tìm thấy món ăn phù hợp với khoảng giá đã chọn.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSpin}
              disabled={isSpinning || filteredFoods.length === 0}
              className="relative group overflow-hidden bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-rose-500/25 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-3"
            >
              <Sparkles className={`w-5 h-5 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
              <span>{isSpinning ? 'Đang Lựa Món...' : 'Quay Món Ngay!'}</span>
            </button>
          </div>
        </section>

        {/* KẾT QUẢ */}
        {selectedFood && (
          <section className="bg-gradient-to-br from-slate-800/90 to-slate-900 border-2 border-rose-500/60 rounded-2xl p-6 shadow-2xl shadow-rose-950/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase flex items-center gap-1">
              <Award className="w-3 h-3" /> Gợi Ý Hôm Nay
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-28 h-28 bg-slate-950/60 border border-slate-700/60 rounded-2xl flex items-center justify-center text-6xl shadow-inner shrink-0">
                {selectedFood.image}
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedFood.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400" /> {selectedFood.calories} kcal
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    ⭐ {selectedFood.rating}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-100">{selectedFood.name}</h2>
                <p className="text-sm text-slate-300 line-clamp-2">{selectedFood.desc}</p>
                
                <div className="text-xl font-extrabold text-rose-400 pt-1">
                  Giá: {selectedFood.price.toLocaleString('vi-VN')} VNĐ
                </div>
              </div>

              <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-200 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  <MapPin className="w-4 h-4 text-rose-400 group-hover:animate-bounce" />
                  <span>Tìm Quán Gần Đây</span>
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] px-1.5 py-0.5 rounded border border-rose-500/30">
                    Sắp có
                  </span>
                </button>

                <button
                  onClick={handleSpin}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Chọn Món Khác</span>
                </button>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>Hôm Nay Ăn Gì? - Random món ăn theo ngân sách</p>
      </footer>

      {/* MODAL THÊM MÓN */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-rose-400" /> Thêm Món Ăn Tùy Chỉnh
            </h3>

            <form onSubmit={handleAddCustomFood} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Tên món ăn (*):</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bún mắm miền Tây"
                  value={newFood.name}
                  onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Giá tiền (VNĐ):</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={newFood.price}
                    onChange={(e) => setNewFood({...newFood, price: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Icon:</label>
                  <select
                    value={newFood.image}
                    onChange={(e) => setNewFood({...newFood, image: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                  >
                    {['🍱', '🍲', '🍜', '🥖', '🍚', '🥩', '🍕', '🍣', '🍗', '☕', '🧋', '🍧', '🍳', '🥟', '🥗'].map((emoji) => (
                      <option key={emoji} value={emoji}>{emoji}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Danh mục:</label>
                <select
                  value={newFood.category}
                  onChange={(e) => setNewFood({...newFood, category: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                >
                  <option value="Ăn Sáng">Ăn Sáng</option>
                  <option value="Cơm">Cơm</option>
                  <option value="Bún / Phở">Bún / Phở</option>
                  <option value="Ăn Vặt">Ăn Vặt</option>
                  <option value="Đồ Uống">Đồ Uống</option>
                  <option value="Đặc Sản">Đặc Sản</option>
                  <option value="Fastfood">Fastfood</option>
                  <option value="Món Tây">Món Tây</option>
                  <option value="Hàn Quốc">Hàn Quốc</option>
                  <option value="Nhật Bản">Nhật Bản</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Mô tả ngắn:</label>
                <textarea
                  rows="2"
                  placeholder="Hương vị..."
                  value={newFood.desc}
                  onChange={(e) => setNewFood({...newFood, desc: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-rose-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-rose-500/20"
              >
                Lưu Món Ăn Mới
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TÌM QUÁN */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center text-rose-400 mb-4 mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-center text-slate-100 mb-2">
              Tính năng đang phát triển
            </h3>
            
            <p className="text-sm text-slate-300 text-center mb-6 leading-relaxed">
              Tính năng <strong>"Tìm Quán Gần Đây"</strong> sẽ được tích hợp Google Maps / OpenStreetMap trong phiên bản tiếp theo.
            </p>

            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}

    </div>
  );
}