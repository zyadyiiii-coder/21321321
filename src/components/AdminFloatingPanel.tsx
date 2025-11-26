
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PortfolioItem, TeamMember, Partner, BrandLogo, SubBrand, CategoryType } from '../types';

const AdminFloatingPanel: React.FC = () => {
  const { data, updateData, resetData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'logos' | 'brands' | 'subbrands' | 'partners' | 'services' | 'team' | 'export'>('basic');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(CategoryType.BRAND);

  // --- Generic Change Handler ---
  const handleChange = (path: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    
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

  // --- Image Upload Helper ---
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

  // --- UI Icons & Header Logo ---
  const updateUIIcon = (iconName: string, value: string) => {
      const newData = { ...data };
      if (!newData.uiIcons) newData.uiIcons = {};
      newData.uiIcons[iconName] = value;
      updateData(newData);
  };

  // --- Brand Logos (Hero/Footer) Handlers ---
  const addBrandLogo = () => {
      const newData = { ...data };
      if (!newData.brandLogos) newData.brandLogos = [];
      const newLogo: BrandLogo = {
          id: `bl-${Date.now()}`,
          name: '新品牌',
          imageUrl: 'https://via.placeholder.com/150x80?text=New+Brand'
      };
      newData.brandLogos.push(newLogo);
      updateData(newData);
  };

  const removeBrandLogo = (id: string) => {
      if(!window.confirm("确定删除此品牌Logo吗？")) return;
      const newData = { ...data };
      if (newData.brandLogos) {
          newData.brandLogos = newData.brandLogos.filter(b => b.id !== id);
          updateData(newData);
      }
  };

  const updateBrandLogo = (id: string, field: keyof BrandLogo, value: string) => {
      const newData = { ...data };
      const index = newData.brandLogos?.findIndex(b => b.id === id);
      if (index !== undefined && index !== -1 && newData.brandLogos) {
          (newData.brandLogos[index] as any)[field] = value;
          updateData(newData);
      }
  };

  // --- Sub Brands (旗下品牌) Handlers ---
  const addSubBrand = () => {
      const newData = { ...data };
      if (!newData.subBrands) newData.subBrands = [];
      const newSub: SubBrand = {
          id: `sb-${Date.now()}`,
          title: '新服务商',
          subtitle: 'New Service',
          icon: 'fa-star',
          iconUrl: ''
      };
      newData.subBrands.push(newSub);
      updateData(newData);
  };

  const removeSubBrand = (id: string) => {
      if(!window.confirm("确定删除此旗下品牌板块吗？")) return;
      const newData = { ...data };
      if (newData.subBrands) {
          newData.subBrands = newData.subBrands.filter(b => b.id !== id);
          updateData(newData);
      }
  };

  const updateSubBrand = (id: string, field: keyof SubBrand, value: string) => {
      const newData = { ...data };
      const index = newData.subBrands?.findIndex(b => b.id === id);
      if (index !== undefined && index !== -1 && newData.subBrands) {
          (newData.subBrands[index] as any)[field] = value;
          updateData(newData);
      }
  };

  // --- Partner Handlers ---
  const addPartner = () => {
      const newData = { ...data };
      if (!newData.partners) newData.partners = [];
      const newPartner: Partner = {
          id: `p-${Date.now()}`,
          name: '新合作伙伴',
          logoUrl: 'https://via.placeholder.com/150x60?text=Logo'
      };
      newData.partners.push(newPartner);
      updateData(newData);
  };

  const removePartner = (id: string) => {
      const newData = { ...data };
      if (!newData.partners) return;
      newData.partners = newData.partners.filter(p => p.id !== id);
      updateData(newData);
  };

  const updatePartner = (id: string, field: keyof Partner, value: string) => {
      const newData = { ...data };
      const index = newData.partners?.findIndex(p => p.id === id);
      if (index !== undefined && index !== -1 && newData.partners) {
          (newData.partners[index] as any)[field] = value;
          updateData(newData);
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
    newData.services[catIndex].items.unshift(newItem);
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

  // --- Export ---
  const copyConfig = () => {
    const jsonStr = JSON.stringify(data, null, 2);
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
       <div className="bg-white w-full md:w-[900px] h-[90vh] md:h-[85vh] rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
             <h3 className="font-bold text-gray-800"><i className="fa-solid fa-sliders mr-2"></i>网站内容管理</h3>
             <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                <i className="fa-solid fa-xmark text-2xl"></i>
             </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
             {[
               { id: 'basic', label: '基础信息' },
               { id: 'logos', label: '导航Logo' },
               { id: 'brands', label: '品牌矩阵' },
               { id: 'subbrands', label: '旗下服务商' },
               { id: 'partners', label: '合作伙伴' },
               { id: 'services', label: '案例管理' },
               { id: 'team', label: '核心人员' },
               { id: 'export', label: '保存/导出', icon: 'fa-download' }
             ].map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)} 
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                 >
                    {tab.icon && <i className={`fa-solid ${tab.icon}`}></i>}
                    {tab.label}
                 </button>
             ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
             
             {/* --- BASIC TAB --- */}
             {activeTab === 'basic' && (
                <div className="space-y-4 max-w-2xl mx-auto">
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
                         rows={5}
                         value={data.description} 
                         onChange={(e) => handleChange('description', e.target.value)}
                         className="w-full border rounded p-2 text-sm leading-relaxed"
                      />
                   </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">首页红色背景色 (Hex)</label>
                      <input 
                         type="color" 
                         value={data.heroConfig?.backgroundColor || '#b91c1c'} 
                         onChange={(e) => handleChange('heroBg', e.target.value)}
                         className="w-full h-10 p-1 border rounded cursor-pointer"
                      />
                   </div>
                </div>
             )}

             {/* --- LOGOS TAB (Header/UI) --- */}
             {activeTab === 'logos' && (
                 <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">顶部导航栏 Logo</h4>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-brand-red rounded-lg flex items-center justify-center border border-gray-200">
                                {data.uiIcons?.logo ? <img src={data.uiIcons.logo} className="w-12 h-12 object-contain bg-white rounded-sm"/> : <span className="text-white font-bold">译</span>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">上传图片 (建议白色透明底)</label>
                                <input type="file" accept="image/*" className="text-xs" onChange={(e) => handleImageUpload(e, (b64) => updateUIIcon('logo', b64))} />
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">首页图标 (Home Icon)</h4>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                                {data.uiIcons?.home ? <img src={data.uiIcons.home} className="w-8 h-8"/> : <i className="fa-solid fa-house"></i>}
                            </div>
                            <div className="flex-1">
                                <input type="file" accept="image/*" className="text-xs" onChange={(e) => handleImageUpload(e, (b64) => updateUIIcon('home', b64))} />
                            </div>
                        </div>
                    </div>
                 </div>
             )}

             {/* --- BRANDS TAB (3 Major Brands) --- */}
             {activeTab === 'brands' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                        <div className="text-sm text-blue-800">
                            <i className="fa-solid fa-info-circle mr-2"></i>
                            这些Logo会显示在<b>首页首屏</b>底部和<b>页尾</b>。
                        </div>
                        <button onClick={addBrandLogo} className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 font-bold">
                            + 添加品牌
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.brandLogos?.map((brand) => (
                            <div key={brand.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative group">
                                <button onClick={() => removeBrandLogo(brand.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 w-6 h-6 rounded flex items-center justify-center transition-colors" title="删除">
                                    <i className="fa-solid fa-trash text-sm"></i>
                                </button>
                                
                                <div className="flex gap-4">
                                    <div className="w-24 h-16 bg-gray-800 rounded flex items-center justify-center shrink-0 border border-gray-200">
                                        <img src={brand.imageUrl} className="max-w-full max-h-full p-1 object-contain" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <label className="text-[10px] text-gray-400 block">品牌名称</label>
                                            <input type="text" value={brand.name} onChange={(e) => updateBrandLogo(brand.id, 'name', e.target.value)} className="w-full border rounded p-1 text-sm font-bold" />
                                        </div>
                                        <div>
                                             <label className="text-[10px] text-gray-400 block">Logo图片 (建议白色)</label>
                                             <input type="file" accept="image/*" className="text-xs w-full" onChange={(e) => handleImageUpload(e, (b64) => updateBrandLogo(brand.id, 'imageUrl', b64))} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* --- SUB BRANDS TAB (Service Providers) --- */}
             {activeTab === 'subbrands' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-700">旗下品牌/服务商列表</h4>
                        <button onClick={addSubBrand} className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 font-bold">
                            + 添加服务商
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.subBrands?.map((brand) => (
                            <div key={brand.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center relative">
                                <button onClick={() => removeSubBrand(brand.id)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 w-6 h-6 rounded flex items-center justify-center" title="删除">
                                    <i className="fa-solid fa-trash text-sm"></i>
                                </button>
                                
                                <div className="w-16 h-16 bg-brand-red text-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                     {brand.iconUrl ? <img src={brand.iconUrl} className="w-full h-full object-cover"/> : <i className={`fa-solid ${brand.icon} text-2xl`}></i>}
                                </div>
                                
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                    <div>
                                        <label className="text-[10px] text-gray-400 block">主标题</label>
                                        <input type="text" value={brand.title} onChange={(e) => updateSubBrand(brand.id, 'title', e.target.value)} className="w-full border rounded p-1 text-sm font-bold" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-400 block">副标题</label>
                                        <input type="text" value={brand.subtitle} onChange={(e) => updateSubBrand(brand.id, 'subtitle', e.target.value)} className="w-full border rounded p-1 text-sm" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-[10px] text-gray-400 block">上传图标</label>
                                        <input type="file" accept="image/*" className="text-xs w-full" onChange={(e) => handleImageUpload(e, (b64) => updateSubBrand(brand.id, 'iconUrl', b64))} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* --- PARTNERS TAB --- */}
             {activeTab === 'partners' && (
                 <div className="space-y-4">
                    <button onClick={addPartner} className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg font-bold hover:bg-blue-50">
                        + 添加服务商家 Logo
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.partners?.map((partner) => (
                            <div key={partner.id} className="bg-white p-3 rounded shadow-sm border relative group">
                                <button onClick={() => removePartner(partner.id)} className="absolute top-1 right-1 text-red-500 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-50 z-10">×</button>
                                <div className="h-12 flex items-center justify-center mb-2 bg-gray-50 rounded overflow-hidden border border-gray-100">
                                    <img src={partner.logoUrl} className="max-h-10 max-w-full w-auto object-contain" />
                                </div>
                                <input type="file" accept="image/*" className="w-full text-[10px] mb-2" onChange={(e) => handleImageUpload(e, (b64) => updatePartner(partner.id, 'logoUrl', b64))} />
                                <input type="text" value={partner.name} onChange={(e) => updatePartner(partner.id, 'name', e.target.value)} className="w-full border rounded p-1 text-xs text-center" placeholder="商家名称" />
                            </div>
                        ))}
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
                                 <label className="block text-xs font-bold text-gray-500 mb-1">封面图片</label>
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
