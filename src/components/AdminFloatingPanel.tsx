
import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { AppConfig, CategoryType, PortfolioItem, TeamMember } from '../types';

const AdminFloatingPanel: React.FC = () => {
  const { data, updateData, resetData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'services' | 'team' | 'partners' | 'export'>('basic');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(CategoryType.BRAND);

  // Helper to handle deep updates safely
  const handleChange = (path: string, value: any) => {
    // Simple deep clone
    const newData = JSON.parse(JSON.stringify(data));
    
    // Very basic path setter for specific top-level fields
    if (path === 'companyName') newData.companyName = value;
    if (path === 'slogan') newData.slogan = value;
    if (path === 'description') newData.description = value;
    if (path === 'phone') newData.contact.phone[0] = value;
    if (path === 'heroBg') {
        if (!newData.heroConfig) newData.heroConfig = {};
        newData.heroConfig.backgroundColor = value;
    }
    
    updateData(newData);
  };

  // Image Upload Helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Service Item Handlers ---
  const updateServiceItem = (catId: string, itemId: string, field: keyof PortfolioItem, value: any) => {
    const newData = { ...data };
    const catIndex = newData.services.findIndex(s => s.id === catId);
    if (catIndex === -1) return;
    const itemIndex = newData.services[catIndex].items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    (newData.services[catIndex].items[itemIndex] as any)[field] = value;
    updateData(newData);
  };

  const addServiceItem = (catId: string) => {
    const newData = { ...data };
    const catIndex = newData.services.findIndex(s => s.id === catId);
    if (catIndex === -1) return;
    
    const newItem: PortfolioItem = {
        id: `new-${Date.now()}`,
        title: '新案例',
        description: '请输入案例描述...',
        imageUrl: 'https://via.placeholder.com/800x600?text=New+Project',
        videoUrl: '',
        gallery: []
    };
    newData.services[catIndex].items.unshift(newItem); // Add to top
    updateData(newData);
  };

  const removeServiceItem = (catId: string, itemId: string) => {
    if(!window.confirm("确定删除此案例吗？")) return;
    const newData = { ...data };
    const catIndex = newData.services.findIndex(s => s.id === catId);
    if (catIndex === -1) return;
    newData.services[catIndex].items = newData.services[catIndex].items.filter(i => i.id !== itemId);
    updateData(newData);
  };

  // --- Team Handlers ---
  const updateTeamMember = (id: string, field: keyof TeamMember, value: any) => {
    const newData = { ...data };
    const index = newData.team.findIndex(t => t.id === id);
    if (index === -1) return;
    (newData.team[index] as any)[field] = value;
    updateData(newData);
  };

  const addTeamMember = () => {
    const newData = { ...data };
    const newMember: TeamMember = {
        id: `t-${Date.now()}`,
        name: '新成员',
        role: '职位名称',
        imageUrl: 'https://via.placeholder.com/400x500?text=Member',
        bio: '简介...',
        works: []
    };
    newData.team.push(newMember);
    updateData(newData);
  };

   const removeTeamMember = (id: string) => {
    if(!window.confirm("确定删除此成员吗？")) return;
    const newData = { ...data };
    newData.team = newData.team.filter(t => t.id !== id);
    updateData(newData);
  };


  // Export
  const copyConfig = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    // Wrap in TS export syntax
    const fileContent = `
import { AppConfig, CategoryType } from '../types';

// ==========================================
// 配置文件 - 由管理面板生成
// ==========================================

export const APP_DATA: AppConfig = ${jsonStr};
    `;
    navigator.clipboard.writeText(fileContent).then(() => alert("配置代码已复制！请覆盖 src/data/config.ts 文件。"));
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-[100] w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
        title="编辑网站内容"
      >
        <i className="fa-solid fa-pen-to-square text-xl"></i>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6">
       <div className="bg-white w-full md:w-[800px] h-[85vh] md:h-[80vh] rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
             <h3 className="font-bold text-gray-800"><i className="fa-solid fa-sliders mr-2"></i>网站内容管理</h3>
             <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                <i className="fa-solid fa-xmark text-2xl"></i>
             </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
             <button 
                onClick={() => setActiveTab('basic')} 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
             >
                基础信息
             </button>
             <button 
                onClick={() => setActiveTab('services')} 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
             >
                案例管理
             </button>
             <button 
                onClick={() => setActiveTab('team')} 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
             >
                核心人员
             </button>
             <button 
                onClick={() => setActiveTab('export')} 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'export' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
             >
                <i className="fa-solid fa-download mr-1"></i>导出/保存
             </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
             
             {/* --- BASIC TAB --- */}
             {activeTab === 'basic' && (
                <div className="space-y-4">
                   <div className="bg-white p-4 rounded-lg shadow-sm">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">公司名称</label>
                      <input 
                         type="text" 
                         value={data.companyName} 
                         onChange={(e) => handleChange('companyName', e.target.value)}
                         className="w-full border rounded p-2 text-sm"
                      />
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slogan 口号</label>
                      <input 
                         type="text" 
                         value={data.slogan} 
                         onChange={(e) => handleChange('slogan', e.target.value)}
                         className="w-full border rounded p-2 text-sm"
                      />
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">公司简介</label>
                      <textarea 
                         rows={4}
                         value={data.description} 
                         onChange={(e) => handleChange('description', e.target.value)}
                         className="w-full border rounded p-2 text-sm"
                      />
                   </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">首页红色背景色 (Hex)</label>
                      <input 
                         type="color" 
                         value={data.heroConfig?.backgroundColor || '#b91c1c'} 
                         onChange={(e) => handleChange('heroBg', e.target.value)}
                         className="w-full h-10 p-1 border rounded"
                      />
                   </div>
                </div>
             )}

             {/* --- SERVICES TAB --- */}
             {activeTab === 'services' && (
                <div className="space-y-4">
                   <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {data.services.map(s => (
                         <button 
                            key={s.id}
                            onClick={() => setSelectedCategory(s.id)}
                            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${selectedCategory === s.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
                         >
                            {s.title}
                         </button>
                      ))}
                   </div>

                   <button 
                      onClick={() => addServiceItem(selectedCategory)}
                      className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg font-bold mb-4 hover:bg-blue-50"
                   >
                      + 添加新案例
                   </button>

                   {data.services.find(s => s.id === selectedCategory)?.items.map(item => (
                      <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                         <div className="flex justify-between items-start mb-2">
                             <div className="font-bold text-gray-400 text-xs">ID: {item.id}</div>
                             <button onClick={() => removeServiceItem(selectedCategory, item.id)} className="text-red-500 text-xs hover:underline">删除</button>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 mb-1">标题</label>
                                 <input 
                                    type="text" 
                                    value={item.title} 
                                    onChange={(e) => updateServiceItem(selectedCategory, item.id, 'title', e.target.value)}
                                    className="w-full border rounded p-2 text-sm mb-2"
                                 />
                                 <label className="block text-xs font-bold text-gray-500 mb-1">描述</label>
                                 <textarea 
                                    rows={2}
                                    value={item.description} 
                                    onChange={(e) => updateServiceItem(selectedCategory, item.id, 'description', e.target.value)}
                                    className="w-full border rounded p-2 text-sm"
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 mb-1">封面图片 (URL或本地上传)</label>
                                 <div className="flex gap-2 mb-2">
                                     <img src={item.imageUrl} className="w-12 h-12 object-cover rounded bg-gray-100" />
                                     <div className="flex-1">
                                         <input 
                                            type="text" 
                                            value={item.imageUrl} 
                                            onChange={(e) => updateServiceItem(selectedCategory, item.id, 'imageUrl', e.target.value)}
                                            className="w-full border rounded p-1 text-xs mb-1"
                                            placeholder="https://..."
                                         />
                                         <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, (b64) => updateServiceItem(selectedCategory, item.id, 'imageUrl', b64))}
                                            className="text-xs"
                                         />
                                     </div>
                                 </div>

                                 <label className="block text-xs font-bold text-gray-500 mb-1">视频链接 (.mp4)</label>
                                 <input 
                                    type="text" 
                                    value={item.videoUrl || ''} 
                                    onChange={(e) => updateServiceItem(selectedCategory, item.id, 'videoUrl', e.target.value)}
                                    className="w-full border rounded p-2 text-sm"
                                    placeholder="https://...mp4"
                                 />
                             </div>
                         </div>
                      </div>
                   ))}
                </div>
             )}

             {/* --- TEAM TAB --- */}
             {activeTab === 'team' && (
                <div className="space-y-4">
                   <button 
                      onClick={addTeamMember}
                      className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg font-bold mb-4 hover:bg-blue-50"
                   >
                      + 添加核心成员
                   </button>
                   {data.team.map(member => (
                       <div key={member.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold">{member.name}</h4>
                             <button onClick={() => removeTeamMember(member.id)} className="text-red-500 text-xs hover:underline">删除</button>
                           </div>
                           <div className="flex gap-4">
                               <div className="w-20 shrink-0">
                                   <img src={member.imageUrl} className="w-20 h-24 object-cover rounded bg-gray-100 mb-2" />
                                   <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, (b64) => updateTeamMember(member.id, 'imageUrl', b64))}
                                        className="w-full text-[10px]"
                                   />
                               </div>
                               <div className="flex-1">
                                   <input 
                                        type="text" 
                                        value={member.name} 
                                        onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                                        className="w-full border rounded p-1 text-sm mb-2"
                                        placeholder="姓名"
                                   />
                                   <input 
                                        type="text" 
                                        value={member.role} 
                                        onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                                        className="w-full border rounded p-1 text-sm mb-2"
                                        placeholder="职位"
                                   />
                                   <textarea 
                                        rows={3}
                                        value={member.bio} 
                                        onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
                                        className="w-full border rounded p-1 text-xs"
                                        placeholder="简介..."
                                   />
                               </div>
                           </div>
                       </div>
                   ))}
                </div>
             )}

             {/* --- EXPORT TAB --- */}
             {activeTab === 'export' && (
                <div className="space-y-4 text-center">
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                        <i className="fa-solid fa-check-circle text-4xl text-green-600 mb-4"></i>
                        <h3 className="text-xl font-bold text-green-800 mb-2">准备好保存了吗？</h3>
                        <p className="text-green-700 text-sm mb-6">
                            由于这是一个静态网站，您的修改目前保存在浏览器中。<br/>
                            要永久生效，请点击下方按钮复制配置代码，并更新到项目中。
                        </p>
                        <button 
                            onClick={copyConfig}
                            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 active:scale-95 transition-all"
                        >
                            一键复制配置代码
                        </button>
                    </div>

                    <div className="bg-red-50 p-6 rounded-xl border border-red-200 mt-8">
                        <h3 className="text-lg font-bold text-red-800 mb-2">重置修改</h3>
                        <p className="text-red-700 text-sm mb-4">
                            如果修改乱了，可以一键恢复到初始状态。
                        </p>
                        <button 
                            onClick={resetData}
                            className="bg-white border border-red-300 text-red-600 px-6 py-2 rounded-full text-sm hover:bg-red-50"
                        >
                            恢复默认配置
                        </button>
                    </div>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default AdminFloatingPanel;
