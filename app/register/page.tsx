"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);

  // 1. 初始化狀態全小寫
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthday: '',
    phone: '',
    timeslot: '',
    bankaccount: '',
    hasexperience: '',
    swimmingability: '',
    source: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([formData]);

      if (error) throw error;

      alert('報名資料已成功送出！請確認您的匯款資訊正確。');

      // 2. 重置表單這裡也必須全部改為小寫，否則會變成駝峰式命名
      setFormData({
        name: '', gender: '', birthday: '', phone: '',
        timeslot: '', bankaccount: '', hasexperience: '',
        swimmingability: '', source: '',
      });
    } catch (err) {
      console.error('送出錯誤:', err);
      alert('報名失敗，請確認欄位名稱是否同步。');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="p-4 md:p-10 max-w-3xl mx-auto bg-gray-50 text-gray-800">
      {/* 頁首介紹區 */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border-l-4 border-blue-600">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">2026 05-06月跳水體驗課程-台中</h1>
        <div className="space-y-1 text-gray-700 italic mb-4">
          <p>💦 絕對是其他運動無法比較的休閒運動</p>
          <p>💦 膽量與勇氣突破舒適圈的選擇</p>
          <p>💦 與自我身心對話的最佳兩秒</p>
          <p>💦 歡迎企業團體包班詢問</p>
        </div>
        <p className="font-bold">由 JorDiving 就跳水團隊教學，讓您快速學會跳水動作！</p>
        <p className="text-sm">總教練 IG：jordi_1122 | FB：林昀蒂Jordi</p>
      </div>

      {/* 課程詳情 */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-3 border-b pb-2">跳水訓練體驗課程</h2>
        <ul className="list-decimal pl-5 space-y-1 text-sm text-gray-600">
          <li>帶領從平面高度腳入水，依程度提昇至 3M, 5M, 7.5M, 10M</li>
          <li>腳入水穩定後學習頭部入水</li>
          <li>有空翻經驗者可進階學習翻騰入水</li>
          <li>每次課程依照學員進度教學，無額外分班</li>
          <li>協助訓練及參賽</li>
          <li>10歲以下學童建議一位家長報名陪同下水</li>
          <li>建議會游泳15公尺以上，泳池水深5公尺，腳踩不到地</li>
        </ul>
      </div>

      {/* 注意事項 */}
      <div className="bg-orange-50 p-6 rounded-xl shadow-sm mb-6 border border-orange-100">
        <h2 className="text-xl font-bold mb-3 text-orange-800">⚠️ 注意事項</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>近視可戴隱形眼鏡（建議日拋，多備沖洗液）</li>
          <li>女生請勿穿著比基尼，可著防寒衣或水母衣</li>
          <li>經期若無不適可照常下水（使用衛生棉條）</li>
          <li>報名一人只限定一位家長陪同，8歲以下建議家長陪同</li>
          <li>上課前須簽署同意書</li>
        </ul>
      </div>

      {/* 場次資訊 */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-3">場次與時間</h2>
        <p className="text-sm font-bold text-red-600 mb-2">地點：台中-北區運動中心（台中市北區崇德路一段55號）</p>
        <p className="text-sm text-gray-700 mb-4">❤️ 以上日期下午14點與16:30點開課為主</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-bold border-b mb-2">05月場次</h3>
            <p>常規：5/02, 5/03, 5/09, 5/10, 5/16, 5/17</p>
            <p>限定晚場(19:00)：5/23, 5/24, 5/30, 5/31</p>
          </div>
          <div>
            <h3 className="font-bold border-b mb-2">06月場次</h3>
            <p>常規：6/20, 6/21, 6/27, 6/28</p>
            <p>限定晚場(19:00)：6/06, 6/07, 6/13, 6/14</p>
          </div>
        </div>
      </div>

      {/* 費用與匯款 */}
      { /*<div className="bg-blue-50 p-6 rounded-xl shadow-sm mb-6 border border-blue-100">
        <h2 className="text-xl font-bold mb-3 text-blue-800">費用與繳費</h2>
        <p className="text-lg font-bold mb-2">費用：1000元/人/100分</p>
        <p className="text-sm mb-2">👉🏻 匯款：玉山銀行 (808) 板新分行 0484-968-027866</p>
        <p className="text-sm text-red-600 mb-2">⚠️ 匯款完成才算報名成功。一週前通知退費500元，當日不退費。</p>
        <p className="text-xs text-gray-500">🛟 跳水具風險，請注意自身安危及自行辦理保險</p>
      </div>*/}

      {/* 報名表單 */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold mb-6">填寫報名資料</h2>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">姓名</label>
            <input required name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">性別</label>
              <select name="gender" required value={formData.gender || ''} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="">請選擇</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">生日</label>
              <input type="date" name="birthday" required value={formData.birthday || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">手機號碼</label>
            <input type="tel" name="phone" required value={formData.phone || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">選擇場次與時間</label>
            <select name="timeslot" required value={formData.timeslot || ''} onChange={handleInputChange} className="w-full p-2 border rounded">
              <option value="">請選擇日期與時間</option>

              <optgroup label="05月常規場 (14:00 & 16:30)">
                <option value="05-02 (14:00)">5/02 (14:00)</option><option value="05-02 (16:30)">5/02 (16:30)</option>
                <option value="05-03 (14:00)">5/03 (14:00)</option><option value="05-03 (16:30)">5/03 (16:30)</option>
                <option value="05-09 (14:00)">5/09 (14:00)</option><option value="05-09 (16:30)">5/09 (16:30)</option>
                <option value="05-10 (14:00)">5/10 (14:00)</option><option value="05-10 (16:30)">5/10 (16:30)</option>
                <option value="05-16 (14:00)">5/16 (14:00)</option><option value="05-16 (16:30)">5/16 (16:30)</option>
                <option value="05-17 (14:00)">5/17 (14:00)</option><option value="05-17 (16:30)">5/17 (16:30)</option>
              </optgroup>

              <optgroup label="05月限定晚場 (19:00)">
                <option value="05-23 (19:00)">5/23 (19:00)</option><option value="05-24 (19:00)">5/24 (19:00)</option>
                <option value="05-30 (19:00)">5/30 (19:00)</option><option value="05-31 (19:00)">5/31 (19:00)</option>
              </optgroup>

              <optgroup label="06月常規場 (14:00 & 16:30)">
                <option value="06-20 (14:00)">6/20 (14:00)</option><option value="06-20 (16:30)">6/20 (16:30)</option>
                <option value="06-21 (14:00)">6/21 (14:00)</option><option value="06-21 (16:30)">6/21 (16:30)</option>
                <option value="06-27 (14:00)">6/27 (14:00)</option><option value="06-27 (16:30)">6/27 (16:30)</option>
                <option value="06-28 (14:00)">6/28 (14:00)</option><option value="06-28 (16:30)">6/28 (16:30)</option>
              </optgroup>

              <optgroup label="06月限定晚場 (19:00)">
                <option value="06-06 (19:00)">6/06 (19:00)</option><option value="06-07 (19:00)">6/07 (19:00)</option>
                <option value="06-13 (19:00)">6/13 (19:00)</option><option value="06-14 (19:00)">6/14 (19:00)</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">匯款帳號後五碼</label>
            <input name="bankaccount" required maxLength={5} value={formData.bankaccount || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">是否有上過本俱樂部課程？</label>
            <div className="flex gap-4">
              <label><input type="radio" name="hasexperience" value="yes" checked={formData.hasexperience === 'yes'} onChange={handleInputChange} /> 是</label>
              <label><input type="radio" name="hasexperience" value="no" checked={formData.hasexperience === 'no'} onChange={handleInputChange} /> 否</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">是否具備游泳能力？</label>
            <select name="swimmingability" value={formData.swimmingability || ''} onChange={handleInputChange} className="w-full p-2 border rounded">
              <option value="">請選擇</option>
              <option value="yes">具備 (可游15m以上)</option>
              <option value="no">不具備</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">從哪裡得知上課資訊？</label>
            <input name="source" value={formData.source || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 mt-4 disabled:bg-gray-400">
            {loading ? '送出中...' : '提交報名'}
          </button>
        </div>
      </form>
    </main>
  );
}