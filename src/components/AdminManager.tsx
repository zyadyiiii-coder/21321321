import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CategoryType, PortfolioItem, TeamMember } from '../types';

const AdminManager: React.FC = () => {
  const { data, updateData, resetData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'team' | 'cases' | 'export'>('cases');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(CategoryType.BRAND);

  // Helper to update specific fields
  const handleCompanyInfoChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    updateData(newData);
  };

  // --- Team Logic ---
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: `t${Date.now()}`,
      name: "新成员",
      role: "职位描述",
      imageUrl: "https://picsum.photos/400/500"
    };
    updateData({ ...data, team: [...data.team, newMember] });
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    const newTeam = data.team.map(m => m.id === id ? { ...m, [field]: value } : m);
    updateData({ ...data, team: newTeam });
  };

  const deleteTeamMember = (id: string) => {
    if(!confirm('确定删除该成员吗？')) return;
    updateData({ ...data, team: data.team.filter(m => m.id !== id) });
  };

  // --- Cases Logic ---
  const addCase = () => {
    const newCase: PortfolioItem = {
      id: `c${Date.now()}`,
      title: "新案例标题",
      description: "案例描述...",
      imageUrl: "https://picsum.photos/800/600",
      videoUrl: ""
    };
    const newServices = data.services.map(s => {
      if (s.id === selectedCategory) {
        return { ...s, items: [newCase, ...s.items] }; // Add to top
      }
      return s;
    });
    updateData({ ...data, services: newServices });
  };

  const updateCase = (itemId: string, field: keyof PortfolioItem, value: string) => {
    const newServices = data.services.map(s => {
      if (s.id === selectedCategory) {
        const newItems = s.items.map(item => item.id === itemId ? { ...item, [field]: value } : item);
        return { ...s, items: newItems };
      }
      return s;
    });
    updateData({ ...data, services: newServices });
  };

  const deleteCase = (itemId: string) => {
    if(!confirm('确定删除该案例吗？')) return;
    const newServices = data.services.map(s => {
      if (s.id === selectedCategory) {
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }
      return s;
    });
    updateData({ ...data, services: newServices });
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-[100] w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
        title="打开管理面板"
      >
        <i className="fa-solid fa-wrench"></i>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-hidden flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center shrink-0">
          <h2 className="font-bold text-lg"><i className="fa-solid fa-gear mr-2"></i>网站内容管理</h2>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-700 flex items-center justify-center">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 shrink-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('cases')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'cases' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            案例管理
          </button>
          <button 
            onClick={() => setActiveTab('team')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            核心人员
          </button>
          <button 
            onClick={() => setActiveTab('info')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            基本信息
          </button>
          <button 
            onClick={() => setActiveTab('export')} 
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'export' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            导出/重置
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          
          {/* --- CASES TAB --- */}
          {activeTab === 'cases' && (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded shadow-sm sticky top-0 z-10 border-b border-gray-100">
                <label className="block text-xs font-bold text-gray-500 mb-1">选择业务分类</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  {data.services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <button 
                  onClick={addCase}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> 添加新案例
                </button>
              </div>

              <div className="space-y-4">
                {data.services.find(s => s.id === selectedCategory)?.items.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0 mr-3">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <button onClick={() => deleteCase(item.id)} className="text-red-500 hover:text-red-700 p-1">
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">标题</label>
                        <input 
                          type="text" 
                          value={item.title} 
                          onChange={(e) => updateCase(item.id, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">描述</label>
                        <textarea 
                          value={item.description || ''} 
                          onChange={(e) => updateCase(item.id, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded text-sm h-20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">图片链接 (URL)</label>
                        <input 
                          type="text" 
                          value={item.imageUrl} 
                          onChange={(e) => updateCase(item.id, 'imageUrl', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded text-sm font-mono text-xs"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">视频链接 (URL, 可选)</label>
                        <input 
                          type="text" 
                          value={item.videoUrl || ''} 
                          onChange={(e) => updateCase(item.id, 'videoUrl', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded text-sm font-mono text-xs"
                          placeholder="https://... (mp4)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- TEAM TAB --- */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <button 
                onClick={addTeamMember}
                className="w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-2 sticky top-0 z-10 shadow-sm"
              >
                <i className="fa-solid fa-plus"></i> 添加新成员
              </button>

              {data.team.map((member) => (
                <div key={member.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                     <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden shrink-0 mr-3">
                        <img src={member.imageUrl} alt="" className="w-full h-full object-cover" />
                     </div>
                     <button onClick={() => deleteTeamMember(member.id)} className="text-red-500 hover:text-red-700 p-1">
                        <i className="fa-regular fa-trash-can"></i>
                     </button>
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      value={member.name || ''} 
                      onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded text-sm"
                      placeholder="姓名"
                    />
                    <input 
                      type="text" 
                      value={member.role} 
                      onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded text-sm"
                      placeholder="职位/角色"
                    />
                    <input 
                      type="text" 
                      value={member.imageUrl} 
                      onChange={(e) => updateTeamMember(member.id, 'imageUrl', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded text-sm font-mono text-xs"
                      placeholder="头像链接 URL"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- INFO TAB --- */}
          {activeTab === 'info' && (
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">公司名称</label>
                <input 
                  type="text" 
                  value={data.companyName} 
                  onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Slogan (口号)</label>
                <input 
                  type="text" 
                  value={data.slogan} 
                  onChange={(e) => handleCompanyInfoChange('slogan', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">公司简介</label>
                <textarea 
                  value={data.description} 
                  onChange={(e) => handleCompanyInfoChange('description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm h-32"
                />
              </div>
            </div>
          )}

          {/* --- EXPORT TAB --- */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded border border-blue-100 text-sm text-blue-800">
                <h3 className="font-bold mb-2">如何保存更改？</h3>
                <p>您当前的更改保存在浏览器缓存中。</p>
                <p className="mt-2">要永久保存，请复制下方的代码，覆盖项目中的 <strong>src/data/config.ts</strong> 文件内容。</p>
              </div>

              <div className="relative">
                <textarea 
                  readOnly 
                  className="w-full h-64 p-3 bg-gray-800 text-green-400 font-mono text-xs rounded"
                  value={`import { AppConfig, CategoryType } from '../types';\n\nexport const APP_DATA: AppConfig = ${JSON.stringify(data, null, 2)};`}
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`import { AppConfig, CategoryType } from '../types';\n\nexport const APP_DATA: AppConfig = ${JSON.stringify(data, null, 2)};`);
                    alert('代码已复制！');
                  }}
                  className="absolute top-2 right-2 bg-white text-gray-800 px-3 py-1 rounded text-xs font-bold hover:bg-gray-100 shadow"
                >
                  复制代码
                </button>
              </div>

              <button 
                onClick={resetData}
                className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700"
              >
                重置所有数据 (清除缓存)
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminManager;
