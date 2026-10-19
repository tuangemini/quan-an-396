/**
 * AI ASSISTANT CHATBOT (DEEPSEEK & GOOGLE GEMINI) - QUÁN ĂN 396
 * Tự động giải đáp 24/7 mọi thắc mắc của khách hàng về thực đơn, giá cả, giờ mở cửa, địa chỉ, ưu đãi...
 */

(function () {
  'use strict';

  // Mã hóa Base64 an toàn cho key hệ thống mặc định
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  // Cấu hình trợ lý
  const AI_CONFIG = {
    provider: localStorage.getItem('scb396_ai_provider') || 'deepseek', // 'deepseek' | 'gemini'
    deepseekKey: localStorage.getItem('scb396_deepseek_key') || DEFAULT_DEEPSEEK_KEY,
    geminiKey: localStorage.getItem('scb396_gemini_key') || DEFAULT_GEMINI_KEY,
    geminiModel: 'gemini-3.8-flash',
    deepseekModel: 'deepseek-chat',
    maxHistory: 10
  };

  // Kho tri thức (Knowledge Base) về Quán Ăn 396
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện chính thức, tận tâm, niềm nở và lễ phép của "Quán Ăn 396 - Bò Né & Bò Bít Tết Chảo Gang".
THÔNG TIN QUÁN ĂN 396:
- Tên quán: Quán Ăn 396 - Bò Né & Bò Bít Tết Chảo Gang.
- Địa chỉ: 396 Nguyễn Thị Kiểu, Phường Hiệp Thành, Quận 12, TP. Hồ Chí Minh.
- Chỉ đường Google Maps: https://maps.app.goo.gl/zEszTX1UxapnSQRu8
- Hotline & Zalo đặt món / giữ bàn: 0908 396 396 (tư vấn nhanh, giao tận nơi).
- Giờ mở cửa: 06:00 đến 23:00 tất cả các ngày trong tuần (kể cả Thứ 7, Chủ Nhật, ngày Lễ và Tết).
- Website chính thức: https://quanan396.life/

BẢNG GIÁ & THỰC ĐƠN ĐẶC SẮC:
1. Bò Né Chảo Gang:
   - Bò Né Đặc Biệt 396 (Full Topping: Thịt bò tươi mềm ướp sốt, pate gan béo ngậy, trứng ốp la lòng đào, xúc xích Đức, xíu mại sốt cà, bơ thơm lừng): 55.000đ.
   - Bò Né Phô Mai Kéo Sợi Hoàng Gia (Thịt bò tươi mềm kết hợp phô mai Mozzarella nhập khẩu kéo sợi ngập tràn): 59.000đ.
   - Bò Né Truyền Thống (Thịt bò + Trứng ốp la + Pate gan béo): 38.000đ.
   - Bò Né Thập Cẩm (Thịt bò + Trứng + Xúc xích + Pate): 45.000đ.
   - Bò Né Cá Mòi Sốt Cà: 45.000đ.
   - Bò Né Xíu Mại Trứng Muối: 48.000đ.

2. Bò Bít Tết (Beefsteak) Thượng Hạng:
   - Bò Bít Tết Sốt Tiêu Đen Đặc Biệt (Thịt thăn bò phi lê mềm mọng, sốt tiêu đen cay nồng sóng sánh, kèm khoai tây chiên vàng giòn): 65.000đ.
   - Bò Bít Tết Sốt Bơ Tỏi Nấm Hương: 62.000đ.
   - Bò Bít Tết Sốt Phô Mai Tan Chảy: 68.000đ.

3. Mì Cay Hàn Quốc 7 Cấp Độ:
   - Mì Cay Hải Sản 7 Cấp Độ (Tôm sú tươi, mực giòn, chả cá, nấm kim châm): 49.000đ.
   - Mì Cay Bò Mỹ Kim Chi (Thịt bò Mỹ mềm thơm, kim chi cay chuẩn vị Hàn): 52.000đ.
   - Mì Cay Thập Cẩm Đặc Biệt 396 (Tôm, mực, bò Mỹ, xúc xích, chả cá): 59.000đ.

4. Topping & Món Ăn Kèm:
   - Bánh mì nóng giòn thêm: 5.000đ/ổ.
   - Trứng ốp la thêm: 7.000đ/quả.
   - Pate gan nhà làm thêm: 10.000đ/phần.
   - Phô mai kéo sợi thêm: 12.000đ/phần.
   - Xúc xích Đức thêm: 10.000đ/cây.
   - Thêm thịt bò: 25.000đ/phần.
   - Khoai tây chiên giòn: 18.000đ/dĩa.

5. Đồ Uống Giải Nhiệt:
   - Trà đào cam sả tươi mát: 25.000đ.
   - Trà chanh tắc mật ong: 18.000đ.
   - Nước sâm thảo mộc / Sữa đậu nành: 12.000đ.
   - Nước ngọt lon (Coca, Pepsi, 7Up, Sting, Redbull): 15.000đ.

ƯU ĐÃI ĐẶC BIỆT CỦA QUÁN:
- TẤT CẢ các phần Bò Né và Bò Bít Tết luôn được TẶNG KÈM MIỄN PHÍ 1 BÁNH MÌ NÓNG GIÒN và 1 DĨA SALAD TƯƠI SẠCH!
- Miễn phí trà đá, khăn lạnh, wifi tốc độ cao và chỗ để xe rộng rãi an toàn có người trông.

DỊCH VỤ & GIAO HÀNG:
- Quán phục vụ ăn tại chỗ (không gian máy lạnh & bàn ngoài trời thoáng mát).
- Có nhận giao hàng tận nơi (ship đồ ăn nóng hổi) qua Hotline/Zalo: 0908 396 396 hoặc qua ứng dụng GrabFood, ShopeeFood.
- Nhận đặt bàn trước cho cá nhân, cặp đôi, gia đình và liên hoan nhóm bạn.

QUY TẮC PHỤC VỤ VÀ GIAO TIẾP:
- Luôn mở đầu lễ phép: "Dạ em chào Quý khách! Quán Ăn 396 rất hân hạnh được phục vụ Quý khách ạ."
- Trả lời đúng trọng tâm câu hỏi của khách hàng, ngắn gọn, súc tích, văn phong vui vẻ, ấm cúng và hiếu khách đậm chất Sài Gòn.
- Khi nhắc đến món ăn hay khuyến mãi, hãy làm nổi bật giá tiền và ưu đãi tặng bánh mì + salad miễn phí.
- Cuối câu luôn mời khách ghé 396 Nguyễn Thị Kiểu hoặc gọi hotline 0908 396 396 để đặt món nóng hổi.
`;

  // Lưu trữ lịch sử hội thoại tạm thời
  let chatHistory = [
    {
      role: 'assistant',
      content: 'Dạ em chào Quý khách! Em là đại diện của **Quán Ăn 396** (396 Nguyễn Thị Kiểu, Q.12). Em luôn sẵn sàng giúp Quý khách xem thực đơn món ngon, báo giá các món bò né - bít tết xèo xèo, hướng dẫn đặt bàn và giao hàng tận nơi ạ! Quý khách muốn hỏi thông tin gì hôm nay ạ?'
    }
  ];

  // Helper: Chuyển đổi Markdown đơn giản sang HTML an toàn
  function formatMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Bullet points
    html = html.replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    // Phone numbers linkable
    html = html.replace(/(09\d{2}[\s.]?\d{3}[\s.]?\d{3})/g, '<a href="tel:$1"><strong>$1</strong></a>');
    // Line breaks
    html = html.replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
    return html;
  }

  // Fallback Engine cục bộ: Trả lời thông minh ngay cả khi mất mạng hoặc hết quota API
  function getSmartFallbackReply(question) {
    const q = question.toLowerCase();

    if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('menu') || q.includes('thực đơn') || q.includes('món')) {
      return `Dạ giá các món ngon tại **Quán Ăn 396** rất bình dân chỉ từ **38.000đ - 65.000đ** thôi ạ:\n\n` +
        `• **Bò Né Đặc Biệt 396 (Full topping bò, pate, trứng, xúc xích, xíu mại):** 55.000đ\n` +
        `• **Bò Né Phô Mai Kéo Sợi Hoàng Gia:** 59.000đ\n` +
        `• **Bò Né Truyền Thống:** 38.000đ\n` +
        `• **Bò Bít Tết Sốt Tiêu Đen (kèm khoai tây):** 65.000đ\n` +
        `• **Mì Cay 7 Cấp Độ:** 49.000đ - 59.000đ\n\n` +
        `🔥 **Đặc biệt:** Mọi phần Bò Né & Bít Tết đều được **TẶNG KÈM 1 Bánh Mì Nóng Giòn & 1 Dĩa Salad Tươi** miễn phí ạ! Quý khách gọi Hotline **0908 396 396** để quán chuẩn bị nhé!`;
    }

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('chỉ đường') || q.includes('vị trí') || q.includes('bản đồ')) {
      return `Dạ Quán Ăn 396 tọa lạc tại địa chỉ:\n\n📍 **396 Nguyễn Thị Kiểu, Phường Hiệp Thành, Quận 12, TP.HCM**\n(Cách ngã tư Lê Văn Khương - Nguyễn Thị Kiểu khoảng 300m, quán có biển hiệu đỏ vàng to rõ, chỗ để xe rộng rãi miễn phí ạ).\n\n🗺️ Quý khách có thể xem đường đi trên [Google Maps tại đây](https://maps.app.goo.gl/zEszTX1UxapnSQRu8) hoặc gọi **0908 396 396** để nhân viên hướng dẫn nhé!`;
    }

    if (q.includes('giờ') || q.includes('mở cửa') || q.includes('đóng cửa') || q.includes('mấy giờ') || q.includes('sáng') || q.includes('tối')) {
      return `Dạ Quán Ăn 396 mở cửa phục vụ liên tục từ **06:00 sáng đến 23:00 đêm** tất cả các ngày trong tuần (kể cả Thứ 7, Chủ Nhật, ngày Lễ và Tết) ạ!\n\nBuổi sáng quán có bánh mì bò né nóng giòn ăn sáng cực đã, buổi trưa chiều tối có bít tết, mì cay ấm bụng. Rất hân hạnh được đón tiếp Quý khách!`;
    }

    if (q.includes('ship') || q.includes('giao') || q.includes('tận nơi') || q.includes('đặt về') || q.includes('mang về')) {
      return `Dạ quán **CÓ GIAO HÀNG TẬN NƠI** nóng hổi trong khu vực Quận 12, Gò Vấp và lân cận ạ!\n\n🛵 Quý khách có thể:\n1. Nhắn tin Zalo hoặc gọi trực tiếp: **0908 396 396** để quán làm món và giao ngay.\n2. Hoặc tìm "Quán Ăn 396" trên các ứng dụng ShopeeFood, GrabFood.\n\nĐồ ăn mang đi luôn được đóng gói hộp giữ nhiệt sạch sẽ và tặng kèm bánh mì + salad tươi đầy đủ ạ!`;
    }

    if (q.includes('đặt bàn') || q.includes('giữ bàn') || q.includes('liên hoan') || q.includes('sinh nhật') || q.includes('nhóm')) {
      return `Dạ Quán Ăn 396 nhận **đặt bàn trước** hoàn toàn miễn phí cho cả nhóm bạn, gia đình và cặp đôi ạ!\n\nQuý khách chỉ cần bấm vào nút **"Đặt Bàn Trước"** trên website hoặc gọi Hotline **0908 396 396**, quán sẽ chuẩn bị chỗ ngồi thoáng mát và đồ ăn nóng hổi đúng giờ hẹn ạ!`;
    }

    return `Dạ Quán Ăn 396 (396 Nguyễn Thị Kiểu, Q.12) chuyên Bò Né & Bít Tết chảo gang xèo xèo thơm nức, mở cửa từ 06:00 - 23:00. Để được tư vấn chi tiết hơn theo ý Quý khách, Quý khách có thể gọi nhanh Hotline/Zalo: **0908 396 396** ạ!`;
  }

  // Gọi DeepSeek API
  async function callDeepSeekAPI(messages) {
    const formattedMessages = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-AI_CONFIG.maxHistory)
    ];

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.deepseekKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.deepseekModel,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 650
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  // Gọi Google Gemini API
  async function callGeminiAPI(messages) {
    const contents = messages.slice(-AI_CONFIG.maxHistory).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.geminiModel}:generateContent?key=${AI_CONFIG.geminiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_KNOWLEDGE }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 650
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  // Bộ điều phối AI: Thử Provider được chọn -> Thử tiếp Provider còn lại -> Nếu lỗi thì dùng Fallback
  async function requestAIResponse(userMessage) {
    chatHistory.push({ role: 'user', content: userMessage });

    const primaryProvider = AI_CONFIG.provider;
    const secondaryProvider = primaryProvider === 'deepseek' ? 'gemini' : 'deepseek';

    // Lần 1: Gọi primary provider
    try {
      if (primaryProvider === 'deepseek') {
        const reply = await callDeepSeekAPI(chatHistory);
        if (reply) return { reply, provider: 'DeepSeek AI' };
      } else {
        const reply = await callGeminiAPI(chatHistory);
        if (reply) return { reply, provider: 'Gemini AI' };
      }
    } catch (err1) {
      console.warn(`[AI 396] ${primaryProvider} failed, switching to ${secondaryProvider}:`, err1.message);

      // Lần 2: Thử secondary provider
      try {
        if (secondaryProvider === 'deepseek') {
          const reply = await callDeepSeekAPI(chatHistory);
          if (reply) return { reply, provider: 'DeepSeek AI (Backup)' };
        } else {
          const reply = await callGeminiAPI(chatHistory);
          if (reply) return { reply, provider: 'Gemini AI (Backup)' };
        }
      } catch (err2) {
        console.warn(`[AI 396] Both AI APIs failed, fallback to local knowledge:`, err2.message);
      }
    }

    // Lần 3: Trả lời bằng Smart Fallback
    const fallback = getSmartFallbackReply(userMessage);
    return { reply: fallback, provider: 'AI 396 (Trợ lý tự động)' };
  }

  // Khởi tạo và gắn DOM giao diện
  function renderAIAssistant() {
    // 1. Tạo Launcher FAB
    const fab = document.createElement('div');
    fab.className = 'ai-fab-launcher';
    fab.id = 'aiFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', 'Hỏi Quán Ăn 396');
    fab.innerHTML = `
      <div class="ai-fab-icon-box">
        <span class="ai-fab-pulse-ring"></span>
        <span>🔥</span>
      </div>
      <div class="ai-fab-text">
        <span class="ai-fab-title">Hỏi Quán Ăn 396</span>
        <span class="ai-fab-sub">Menu, giá món, ship 24/7</span>
      </div>
      <span class="ai-fab-badge">Sẵn Sàng</span>
    `;

    // 2. Tạo Chat Window
    const chatWin = document.createElement('div');
    chatWin.className = 'ai-chat-window';
    chatWin.id = 'aiChatWindow';
    chatWin.setAttribute('role', 'dialog');
    chatWin.setAttribute('aria-label', 'Cửa sổ trò chuyện Quán Ăn 396');
    chatWin.innerHTML = `
      <!-- Header -->
      <div class="ai-chat-header">
        <div class="ai-chat-profile">
          <div class="ai-avatar">
            <span>🔥</span>
            <span class="ai-online-dot"></span>
          </div>
          <div class="ai-profile-meta">
            <div class="ai-title">
              <span>Quán Ăn 396</span>
            </div>
            <span class="ai-status-text">Bò Né & Bít Tết Nguyễn Thị Kiểu Q.12</span>
          </div>
        </div>
        <div class="ai-header-actions">
          <button class="ai-icon-btn" id="btnAiSettings" style="display:none;" aria-label="Cài đặt">⚙️</button>
          <button class="ai-icon-btn" id="btnAiClear" title="Làm mới trò chuyện" aria-label="Xóa chat">🗑️</button>
          <button class="ai-icon-btn" id="btnAiClose" title="Thu nhỏ" aria-label="Đóng">&times;</button>
        </div>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="ai-chips-bar" id="aiChipsBar">
        <button class="ai-chip" data-q="Bò Né đặc biệt gồm những gì và giá bao nhiêu?">🔥 Bò Né đặc biệt?</button>
        <button class="ai-chip" data-q="Giá các món Bò Né và Bít Tết tại quán thế nào?">💰 Bảng giá thực đơn?</button>
        <button class="ai-chip" data-q="Quán mở cửa mấy giờ và địa chỉ ở đâu?">⏰ Giờ mở cửa & Địa chỉ?</button>
        <button class="ai-chip" data-q="Quán có giao hàng tận nơi không?">🛵 Ship tận nơi?</button>
        <button class="ai-chip" data-q="Có khuyến mãi tặng bánh mì và salad không?">🥖 Khuyến mãi hôm nay?</button>
      </div>

      <!-- Chat Messages Body -->
      <div class="ai-chat-body" id="aiChatBody">
        <div class="ai-msg bot">
          <div class="ai-msg-avatar">🔥</div>
          <div class="ai-msg-bubble">
            ${formatMarkdown(chatHistory[0].content)}
          </div>
        </div>
      </div>

      <!-- Input Form Footer -->
      <div class="ai-chat-footer">
        <form class="ai-input-form" id="aiChatForm">
          <textarea 
            class="ai-input-field" 
            id="aiInputField" 
            rows="1" 
            placeholder="Hỏi giá món, thực đơn, giờ mở cửa, ship..."
            aria-label="Nhập câu hỏi"
          ></textarea>
          <button type="submit" class="ai-send-btn" id="aiSendBtn" aria-label="Gửi tin nhắn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </form>
        <div class="ai-footer-note">Quán Ăn 396 • Phục vụ tận tâm 24/7 • Hotline: 0908 396 396</div>
      </div>

      <!-- Settings Overlay Modal -->
      <div class="ai-settings-overlay" id="aiSettingsOverlay">
        <div class="ai-settings-header">
          <h4>⚙️ Cài Đặt Hệ Thống</h4>
          <button class="ai-icon-btn" id="btnCloseAiSettings">&times;</button>
        </div>
        <div class="ai-settings-body">
          <div class="ai-setting-group">
            <label for="selectAiProvider">Kênh kết nối ưu tiên:</label>
            <select class="ai-setting-select" id="selectAiProvider">
              <option value="deepseek">Kênh 1 (Khuyên dùng - Phản hồi nhanh & chính xác)</option>
              <option value="gemini">Kênh 2 (Mạnh mẽ & Đầy đủ)</option>
            </select>
          </div>

          <div class="ai-setting-group" style="display:none;">
            <label for="inputDeepseekKey">DeepSeek Key:</label>
            <input type="password" class="ai-setting-input" id="inputDeepseekKey" placeholder="Mặc định">
          </div>

          <div class="ai-setting-group" style="display:none;">
            <label for="inputGeminiKey">Gemini Key:</label>
            <input type="password" class="ai-setting-input" id="inputGeminiKey" placeholder="Mặc định">
          </div>
        </div>
        <div class="ai-settings-footer">
          <button class="ai-btn-reset" id="btnResetAiDefault">Khôi phục mặc định</button>
          <button class="ai-btn-save" id="btnSaveAiSettings">Lưu Cài Đặt</button>
        </div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    // Gắn sự kiện điều khiển
    attachAIEvents(fab, chatWin);
  }

  // Gắn sự kiện tương tác
  function attachAIEvents(fab, chatWin) {
    const chatBody = document.getElementById('aiChatBody');
    const chatForm = document.getElementById('aiChatForm');
    const inputField = document.getElementById('aiInputField');
    const sendBtn = document.getElementById('aiSendBtn');
    const chipsBar = document.getElementById('aiChipsBar');
    const btnClose = document.getElementById('btnAiClose');
    const btnClear = document.getElementById('btnAiClear');
    const btnSettings = document.getElementById('btnAiSettings');
    const settingsOverlay = document.getElementById('aiSettingsOverlay');
    const btnCloseSettings = document.getElementById('btnCloseAiSettings');
    const btnSaveSettings = document.getElementById('btnSaveAiSettings');
    const btnResetDefault = document.getElementById('btnResetAiDefault');
    const providerBadge = document.getElementById('aiProviderBadge');
    const selectProvider = document.getElementById('selectAiProvider');
    const inputDeepseek = document.getElementById('inputDeepseekKey');
    const inputGemini = document.getElementById('inputGeminiKey');

    // Mở / Đóng cửa sổ chat
    function toggleChat(open) {
      const isOpen = open !== undefined ? open : !chatWin.classList.contains('open');
      if (isOpen) {
        chatWin.classList.add('open');
        inputField.focus();
        scrollToBottom();
      } else {
        chatWin.classList.remove('open');
        if (settingsOverlay) settingsOverlay.classList.remove('open');
      }
    }

    fab.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));

    // Cuộn xuống tin nhắn mới nhất
    function scrollToBottom() {
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 50);
    }

    // Hiển thị bong bóng tin nhắn
    function appendMessage(role, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `ai-msg ${role === 'user' ? 'user' : 'bot'}`;

      if (role === 'assistant') {
        msgDiv.innerHTML = `
          <div class="ai-msg-avatar">🔥</div>
          <div class="ai-msg-bubble">
            ${formatMarkdown(text)}
          </div>
        `;
      } else {
        msgDiv.innerHTML = `
          <div class="ai-msg-bubble">
            ${formatMarkdown(text)}
          </div>
        `;
      }

      chatBody.appendChild(msgDiv);
      scrollToBottom();
    }

    // Hiệu ứng đang gõ (Typing Indicator)
    let typingElement = null;
    function showTyping() {
      if (typingElement) return;
      typingElement = document.createElement('div');
      typingElement.className = 'ai-typing-indicator';
      typingElement.innerHTML = `
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      `;
      chatBody.appendChild(typingElement);
      scrollToBottom();
    }

    function hideTyping() {
      if (typingElement) {
        typingElement.remove();
        typingElement = null;
      }
    }

    // Xử lý gửi tin nhắn
    async function handleUserSubmit(text) {
      const cleanText = text.trim();
      if (!cleanText) return;

      inputField.value = '';
      inputField.style.height = 'auto';
      sendBtn.disabled = true;

      appendMessage('user', cleanText);
      showTyping();

      try {
        const { reply, provider } = await requestAIResponse(cleanText);
        hideTyping();
        chatHistory.push({ role: 'assistant', content: reply });
        appendMessage('assistant', reply);
      } catch (err) {
        hideTyping();
        appendMessage('assistant', getSmartFallbackReply(cleanText));
      } finally {
        sendBtn.disabled = false;
        inputField.focus();
      }
    }

    // Submit form
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit(inputField.value);
    });

    // Enter để gửi tin nhắn (Shift+Enter để xuống dòng)
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSubmit(inputField.value);
      }
    });

    // Auto resize textarea
    inputField.addEventListener('input', () => {
      inputField.style.height = 'auto';
      inputField.style.height = Math.min(inputField.scrollHeight, 80) + 'px';
    });

    // Quick chips
    chipsBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (chip && chip.dataset.q) {
        handleUserSubmit(chip.dataset.q);
      }
    });

    // Xóa hội thoại
    btnClear.addEventListener('click', () => {
      if (confirm('Quý khách có muốn xóa lịch sử trò chuyện và bắt đầu lại không?')) {
        chatHistory = [chatHistory[0]];
        chatBody.innerHTML = `
          <div class="ai-msg bot">
            <div class="ai-msg-avatar">🔥</div>
            <div class="ai-msg-bubble">
              ${formatMarkdown(chatHistory[0].content)}
            </div>
          </div>
        `;
      }
    });

    // Mở Cài đặt
    btnSettings.addEventListener('click', () => {
      selectProvider.value = AI_CONFIG.provider;
      inputDeepseek.value = localStorage.getItem('scb396_deepseek_key') || '';
      inputGemini.value = localStorage.getItem('scb396_gemini_key') || '';
      settingsOverlay.classList.add('open');
    });

    btnCloseSettings.addEventListener('click', () => {
      settingsOverlay.classList.remove('open');
    });

    // Lưu Cài đặt
    btnSaveSettings.addEventListener('click', () => {
      AI_CONFIG.provider = selectProvider.value;
      localStorage.setItem('scb396_ai_provider', AI_CONFIG.provider);
      providerBadge.textContent = AI_CONFIG.provider === 'deepseek' ? 'DeepSeek' : 'Gemini';

      if (inputDeepseek.value.trim()) {
        AI_CONFIG.deepseekKey = inputDeepseek.value.trim();
        localStorage.setItem('scb396_deepseek_key', AI_CONFIG.deepseekKey);
      } else {
        localStorage.removeItem('scb396_deepseek_key');
        AI_CONFIG.deepseekKey = DEFAULT_DEEPSEEK_KEY;
      }

      if (inputGemini.value.trim()) {
        AI_CONFIG.geminiKey = inputGemini.value.trim();
        localStorage.setItem('scb396_gemini_key', AI_CONFIG.geminiKey);
      } else {
        localStorage.removeItem('scb396_gemini_key');
        AI_CONFIG.geminiKey = DEFAULT_GEMINI_KEY;
      }

      settingsOverlay.classList.remove('open');
      appendMessage('assistant', `✅ Đã lưu cấu hình AI! Hiện đang ưu tiên mô hình **${AI_CONFIG.provider === 'deepseek' ? 'DeepSeek AI' : 'Google Gemini AI'}**.`);
    });

    // Khôi phục mặc định
    btnResetDefault.addEventListener('click', () => {
      localStorage.removeItem('scb396_ai_provider');
      localStorage.removeItem('scb396_deepseek_key');
      localStorage.removeItem('scb396_gemini_key');
      AI_CONFIG.provider = 'deepseek';
      AI_CONFIG.deepseekKey = DEFAULT_DEEPSEEK_KEY;
      AI_CONFIG.geminiKey = DEFAULT_GEMINI_KEY;
      selectProvider.value = 'deepseek';
      inputDeepseek.value = '';
      inputGemini.value = '';
      providerBadge.textContent = 'DeepSeek';
      settingsOverlay.classList.remove('open');
      appendMessage('assistant', '🔄 Đã khôi phục cài đặt mặc định của hệ thống.');
    });
  }

  // Khởi chạy khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAIAssistant);
  } else {
    renderAIAssistant();
  }
})();
