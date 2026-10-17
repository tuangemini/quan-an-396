/**
 * CƠ SỞ DỮ LIỆU THỰC ĐƠN & THÔNG TIN QUÁN ĂN 396
 * Địa chỉ: 396 Nguyễn Thị Kiểu, P. Hiệp Thành, Quận 12, TP.HCM
 * Google Maps: https://maps.app.goo.gl/zEszTX1UxapnSQRu8
 */

const RESTAURANT_INFO = {
  name: "Quán Ăn 396 - Bò Né & Bò Bít Tết",
  shortName: "Bò Né 396",
  slogan: "Bò Né Xèo Xèo Chảo Gang • Bít Tết Đậm Vị • Bánh Mì Giòn Rụm",
  address: "396 Nguyễn Thị Kiểu, Phường Hiệp Thành, Quận 12, TP. Hồ Chí Minh",
  openHours: "06:00 - 23:00 (Mở cửa tất cả các ngày trong tuần)",
  hotline: "0908 396 396",
  hotlineDisplay: "0908 396 396",
  zalo: "0908396396",
  mapsUrl: "https://maps.app.goo.gl/zEszTX1UxapnSQRu8",
  rating: 4.8,
  totalReviews: 860,
  priceRange: "30.000đ - 65.000đ"
};

const MENU_ITEMS = [
  {
    id: "bn-01",
    name: "Bò Né Đặc Biệt 396 (Full Topping)",
    category: "bo-ne",
    categoryName: "Bò Né Chảo Gang",
    price: 55000,
    priceDisplay: "55.000đ",
    originalPrice: "65.000đ",
    isBestSeller: true,
    isHot: true,
    badge: "Bán Chạy Nhất",
    image: "hero-bo-ne.jpg",
    desc: "Thịt bò tươi mềm ướp sốt đậm đà, trứng ốp la lòng đào, pate gan béo ngậy, xúc xích Đức, xíu mại sốt cà, bơ thơm lừng, tặng kèm 1 bánh mì nóng giòn và dĩa salad dưa leo cà chua tươi mát.",
    tags: ["Thịt bò tươi", "Trứng ốp la", "Pate béo", "Xúc xích Đức", "Bánh mì giòn"]
  },
  {
    id: "bn-02",
    name: "Bò Né Phô Mai Kéo Sợi Hoàng Gia",
    category: "bo-ne",
    categoryName: "Bò Né Chảo Gang",
    price: 59000,
    priceDisplay: "59.000đ",
    isBestSeller: true,
    badge: "Phô Mai Béo",
    image: "hero-bo-ne.jpg",
    desc: "Thăn bò mềm ngọt xèo xèo cùng lớp phô mai Mozzarella nhập khẩu kéo sợi ngập tràn, hòa quyện sốt bơ tỏi béo ngậy, chấm bánh mì cực cuốn.",
    tags: ["Phô mai kéo sợi", "Thịt bò mềm", "Trứng ốp la", "Sốt bơ tỏi"]
  },
  {
    id: "bn-03",
    name: "Bò Né Truyền Thống (Bò + Trứng + Pate)",
    category: "bo-ne",
    categoryName: "Bò Né Chảo Gang",
    price: 38000,
    priceDisplay: "38.000đ",
    badge: "Bình Dân",
    image: "hero-bo-ne.jpg",
    desc: "Món ăn sáng quốc dân: Bò tươi ướp gia truyền mềm ngọt, 1 trứng ốp la béo ngậy, pate gan nhà làm thơm phức, ăn kèm bánh mì nóng giòn.",
    tags: ["Bò tươi", "Trứng lòng đào", "Pate nhà làm", "Giá sinh viên"]
  },
  {
    id: "bn-04",
    name: "Bò Né Thập Cẩm Xíu Mại Trứng Muối",
    category: "bo-ne",
    categoryName: "Bò Né Chảo Gang",
    price: 52000,
    priceDisplay: "52.000đ",
    image: "hero-bo-ne.jpg",
    desc: "Sự kết hợp độc đáo giữa thịt bò áp chảo, viên xíu mại thịt băm mềm ngọt và lòng đỏ trứng muối bùi bùi sánh mịn.",
    tags: ["Trứng muối", "Xíu mại", "Bò mềm", "Sốt đậm đà"]
  },
  {
    id: "bt-01",
    name: "Bò Bít Tết Sốt Tiêu Đen Thượng Hạng",
    category: "bit-tet",
    categoryName: "Bò Bít Tết Sốt Đậm Vị",
    price: 65000,
    priceDisplay: "65.000đ",
    isBestSeller: true,
    badge: "Món Ký Danh",
    image: "bo-bit-tet.jpg",
    desc: "Miếng thăn bò ngoại dày dặn mọng nước, áp chảo vừa chín tới mềm tan trong miệng, tưới đẫm sốt tiêu đen Phú Quốc cay nồng thơm ngát, ăn kèm khoai tây chiên vàng giòn rụm và bánh mì.",
    tags: ["Thăn bò ngoại", "Sốt tiêu đen cay nồng", "Khoai tây chiên", "Bánh mì nóng"]
  },
  {
    id: "bt-02",
    name: "Bò Bít Tết Sốt Bơ Tỏi Nấm Hương",
    category: "bit-tet",
    categoryName: "Bò Bít Tết Sốt Đậm Vị",
    price: 62000,
    priceDisplay: "62.000đ",
    image: "bo-bit-tet.jpg",
    desc: "Miếng bít tết bò nguyên bản thơm ngát vị bơ lạt và tỏi phi vàng, sốt nấm hương thanh ngọt tự nhiên, kèm măng tây và cà chua bi nướng mọng nước.",
    tags: ["Sốt bơ tỏi", "Nấm hương", "Thịt bò dày", "Khoai tây chiên"]
  },
  {
    id: "bt-03",
    name: "Bò Bít Tết Khoai Tây Chiên Trứng Ốp La",
    category: "bit-tet",
    categoryName: "Bò Bít Tết Sốt Đậm Vị",
    price: 49000,
    priceDisplay: "49.000đ",
    image: "bo-bit-tet.jpg",
    desc: "Lựa chọn hoàn hảo cho bữa trưa và bữa tối năng lượng: Bò bít tết thơm mềm, trứng ốp la, dĩa khoai tây chiên giòn rụm rắc muối tiêu.",
    tags: ["Bò bít tết", "Khoai tây giòn", "Trứng ốp la"]
  },
  {
    id: "mc-01",
    name: "Mì Cay Hàn Quốc Hải Sản Bò Mỹ 7 Cấp Độ",
    category: "mi-cay",
    categoryName: "Mì Cay & Món Nóng",
    price: 48000,
    priceDisplay: "48.000đ",
    isHot: true,
    badge: "Cay Đã Miệng",
    image: "mi-cay-drinks.jpg",
    desc: "Thố đất sôi sùng sục giữ nóng lâu, sợi mì Chin-Ramyun dai giòn, tôm sú tươi ngọt, mực giòn sần sật, thịt bò Mỹ thái mỏng, nấm kim châm, bắp cải tím và nước dùng kim chi chua cay bùng nổ vị giác (tùy chọn cấp 0 - 7).",
    tags: ["Mì cay 7 cấp", "Tôm mực tươi", "Bò Mỹ", "Thố đất sôi"]
  },
  {
    id: "mc-02",
    name: "Mì Cay Bò Nấm Kim Châm Nước Dùng Kim Chi",
    category: "mi-cay",
    categoryName: "Mì Cay & Món Nóng",
    price: 42000,
    priceDisplay: "42.000đ",
    image: "mi-cay-drinks.jpg",
    desc: "Ngập tràn thịt bò tươi mềm hòa quyện nấm kim châm giòn ngọt, xúc xích và chả cá Hàn Quốc trong làn nước súp kim chi chuẩn vị cay thơm nức mũi.",
    tags: ["Bò cuộn nấm", "Xúc xích", "Nước dùng cay", "Kim chi"]
  },
  {
    id: "tp-01",
    name: "Phần Pate Gan Béo Ngậy Thêm",
    category: "topping",
    categoryName: "Topping & Ăn Kèm",
    price: 12000,
    priceDisplay: "12.000đ",
    image: "hero-bo-ne.jpg",
    desc: "Pate gan thủ công gia truyền của Quán 396, mịn mượt, thơm nức mùi bơ tiêu, cực kỳ bắt vị khi quệt bánh mì.",
    tags: ["Pate gan", "Nhà làm", "Béo ngậy"]
  },
  {
    id: "tp-02",
    name: "Đĩa Khoai Tây Chiên Lắc Phô Mai",
    category: "topping",
    categoryName: "Topping & Ăn Kèm",
    price: 25000,
    priceDisplay: "25.000đ",
    image: "bo-bit-tet.jpg",
    desc: "Khoai tây chiên vàng giòn rụm bên ngoài, bùi xốp bên trong, lắc bột phô mai mặn ngọt ăn là mê.",
    tags: ["Khoai tây chiên", "Lắc phô mai", "Món ăn vặt"]
  },
  {
    id: "tp-03",
    name: "Bánh Mì Nóng Giòn Rụm (Ổ Thêm)",
    category: "topping",
    categoryName: "Topping & Ăn Kèm",
    price: 5000,
    priceDisplay: "5.000đ",
    image: "hero-bo-ne.jpg",
    desc: "Bánh mì đặc ruột nướng than hồng giòn rụm, luôn nóng hổi khi đem ra bàn.",
    tags: ["Bánh mì giòn", "Đặc ruột"]
  },
  {
    id: "tp-04",
    name: "Xúc Xích Đức Nướng / Trứng Ốp La Thêm",
    category: "topping",
    categoryName: "Topping & Ăn Kèm",
    price: 8000,
    priceDisplay: "8.000đ",
    image: "hero-bo-ne.jpg",
    desc: "Thêm 1 quả trứng gà tươi ốp la lòng đào hoặc 1 thanh xúc xích Đức nướng xèo xèo.",
    tags: ["Trứng ốp la", "Xúc xích Đức"]
  },
  {
    id: "dr-01",
    name: "Trà Đào Cam Sả Tươi Mát Lớn",
    category: "drinks",
    categoryName: "Đồ Uống Giải Nhiệt",
    price: 22000,
    priceDisplay: "22.000đ",
    badge: "Giải Ngấy Số 1",
    image: "mi-cay-drinks.jpg",
    desc: "Hương thơm nồng nàn từ sả tươi, cam vàng mọng nước kết hợp miếng đào ngâm giòn ngọt, giải nhiệt tức thì sau chảo bò né nóng sốt.",
    tags: ["Trà đào", "Cam sả", "Thanh mát", "Đào giòn"]
  },
  {
    id: "dr-02",
    name: "Trà Tắc Hạt Chia Thanh Lọc",
    category: "drinks",
    categoryName: "Đồ Uống Giải Nhiệt",
    price: 15000,
    priceDisplay: "15.000đ",
    image: "mi-cay-drinks.jpg",
    desc: "Vị chua ngọt dịu thanh của tắc tươi quyện cùng hạt chia bùi bùi, xua tan cái nóng Sài Gòn.",
    tags: ["Trà tắc", "Hạt chia", "Giá rẻ"]
  },
  {
    id: "dr-03",
    name: "Sữa Bắp Nếp Tươi Nấu Trong Ngày",
    category: "drinks",
    categoryName: "Đồ Uống Giải Nhiệt",
    price: 18000,
    priceDisplay: "18.000đ",
    image: "mi-cay-drinks.jpg",
    desc: "Nấu từ 100% bắp nếp tươi tự nhiên, ngọt béo dịu nhẹ không gắt đường, uống nóng hoặc đá đều thơm ngon.",
    tags: ["Sữa bắp", "Tự nhiên", "Bổ dưỡng"]
  },
  {
    id: "dr-04",
    name: "Nước Ngọt Lon Ướp Lạnh (Coca / Pepsi / 7Up)",
    category: "drinks",
    categoryName: "Đồ Uống Giải Nhiệt",
    price: 14000,
    priceDisplay: "14.000đ",
    image: "mi-cay-drinks.jpg",
    desc: "Lon ướp lạnh kèm ly đá đầy sảng khoái.",
    tags: ["Coca", "Pepsi", "Ướp lạnh"]
  }
];

const REVIEWS_DATA = [
  {
    author: "Anh Tuấn Nguyễn (Google Reviewer)",
    rating: 5,
    time: "2 ngày trước",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    comment: "Bò né ở quán 396 Nguyễn Thị Kiểu ăn từ hồi mới mở tới giờ vẫn giữ nguyên chất lượng. Bò mềm không bị dai, pate béo thơm nức mũi quệt bánh mì giòn tan là hết sẩy. Giá 55k phần đặc biệt mà no căng bụng!"
  },
  {
    author: "Chị Thảo My (Local Guide Cấp 6)",
    rating: 5,
    time: "Tuần trước",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    comment: "Chảo gang hình chú bò giữ nóng lâu ghê, ăn gần hết mà nước sốt vẫn sôi liu riu. Mình thích sốt tiêu đen bít tết ở đây, vị cay nhẹ thơm rất đậm đà. Nhân viên phục vụ nhanh dù quán đông nghẹt lúc 7h tối."
  },
  {
    author: "Bảo Hoàng (Sinh viên ĐH Lao Động Xã Hội)",
    rating: 5,
    time: "3 tuần trước",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    comment: "Bò né truyền thống chỉ 38k mà đầy đủ trứng pate, salad dưa leo cà chua cho ăn thả ga. Mì cay hải sản thố đá cấp 3 ở đây cũng siêu ngon tôm mực tươi rói. Quán ruột của cả nhóm!"
  },
  {
    author: "Gia Đình Chú Sáu (Hiệp Thành, Q.12)",
    rating: 5,
    time: "1 tháng trước",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    comment: "Cả nhà cuối tuần nào cũng ghé ăn sáng. Bánh mì luôn được hơ nóng giòn rụm trước khi bưng ra. Không gian rộng rãi, thoáng mát, chủ quán rất niềm nở và mến khách."
  }
];
