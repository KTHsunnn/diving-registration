'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

export default function AdminRegistrations() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [timeslots, setTimeslots] = useState<string[]>([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from('registrations').select('*');

            if (error) throw error;

            if (data) {
                setRegistrations(data);

                // 【關鍵修正】：抓取所有不重複的「時段」來當作分類標籤
                const uniqueTimeslots = Array.from(
                    new Set(data.map((item: any) => item.timeslot).filter((t: any) => t))
                ) as string[];

                setTimeslots(uniqueTimeslots);
                if (uniqueTimeslots.length > 0) {
                    setSelectedTimeslot(uniqueTimeslots[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (item: any) => {
        setEditingId(item.id);
        setEditForm(item);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = async (id: string) => {
        const { error } = await supabase.from('registrations').update(editForm).eq('id', id);
        if (error) alert('儲存失敗: ' + error.message);
        else {
            setEditingId(null);
            fetchData();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('確定要刪除這筆報名嗎？')) return;
        const { error } = await supabase.from('registrations').delete().eq('id', id);
        if (error) alert('刪除失敗: ' + error.message);
        else fetchData();
    };

    // --- 匯出 Excel (已過濾掉 ID 與 Batch) ---
    const exportToExcel = () => {
        const filteredData = registrations.filter((r) => r.timeslot === selectedTimeslot);
        if (filteredData.length === 0) return;

        // 指定要匯出的欄位，不寫在這裡的欄位就不會出現在 Excel
        const dataToExport = filteredData.map(item => ({
            姓名: item.name,
            年齡: item.age,
            等級: item.level,
            手機: item.phone,
            Email: item.email,
            性別: item.gender,
            生日: item.birthday,
            時段: item.timeslot,
            匯款後五碼: item.bankaccount,
            經驗: item.hasexperience === 'yes' ? '是' : '否',
            游泳: item.swimmingability === 'yes' ? '具備' : '不具備',
            來源: item.source
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '報名名單');

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        XLSX.writeFile(workbook, `${dateStr}_${selectedTimeslot}.xlsx`);
    };

    if (loading) return <div className="p-10 text-center">資料載入中...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">學員報名管理 (以時段篩選)</h1>

            {/* 時段篩選按鈕區 */}
            <div className="flex gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
                <span className="font-bold self-center mr-2">選擇時段:</span>
                {timeslots.length > 0 ? (
                    timeslots.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => setSelectedTimeslot(slot)}
                            className={`px-4 py-2 rounded transition-colors ${selectedTimeslot === slot ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-100'}`}
                        >
                            {slot}
                        </button>
                    ))
                ) : (
                    <span className="text-red-500">找不到時段資料 (請確認資料庫中的 'timeslot' 欄位是否有值)</span>
                )}
            </div>

            {selectedTimeslot ? (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">當前時段: {selectedTimeslot}</h2>
                        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            下載 {selectedTimeslot} Excel
                        </button>
                    </div>

                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4">姓名</th>
                                    <th className="p-4">手機</th>
                                    <th className="p-4">時段</th>
                                    <th className="p-4">匯款後五碼</th>
                                    <th className="p-4">經驗</th>
                                    <th className="p-4">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations
                                    .filter((r) => r.timeslot === selectedTimeslot)
                                    .map((item) => (
                                        <tr key={item.id} className="border-b">
                                            {editingId === item.id ? (
                                                <>
                                                    <td className="p-2"><input name="name" value={editForm.name || ''} onChange={handleInputChange} className="border p-1 w-20" /></td>
                                                    <td className="p-2"><input name="phone" value={editForm.phone || ''} onChange={handleInputChange} className="border p-1 w-24" /></td>
                                                    <td className="p-2"><input name="timeslot" value={editForm.timeslot || ''} onChange={handleInputChange} className="border p-1 w-24" /></td>
                                                    <td className="p-2"><input name="bankaccount" value={editForm.bankaccount || ''} onChange={handleInputChange} className="border p-1 w-16" /></td>
                                                    <td className="p-2">
                                                        <select name="hasexperience" value={editForm.hasexperience} onChange={handleInputChange}>
                                                            <option value="yes">是</option><option value="no">否</option>
                                                        </select>
                                                    </td>
                                                    <td className="p-2 space-x-2">
                                                        <button onClick={() => handleSave(item.id)} className="text-blue-600 font-bold">儲存</button>
                                                        <button onClick={() => setEditingId(null)} className="text-gray-500">取消</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="p-4">{item.name}</td>
                                                    <td className="p-4">{item.phone}</td>
                                                    <td className="p-4">{item.timeslot}</td>
                                                    <td className="p-4">{item.bankaccount}</td>
                                                    <td className="p-4">{item.hasexperience === 'yes' ? '是' : '否'}</td>
                                                    <td className="p-4 space-x-3">
                                                        <button onClick={() => startEdit(item)} className="text-blue-600">編輯</button>
                                                        <button onClick={() => handleDelete(item.id)} className="text-red-600">刪除</button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p>目前沒有報名資料或時段。</p>
            )}
        </div>
    );
}