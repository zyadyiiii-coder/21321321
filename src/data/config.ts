
import { AppConfig, CategoryType } from '../types';

// ==========================================
// 配置文件 - 在此处修改内容 (CONFIGURATION)
// ==========================================
// 修改说明：
// 1. 修改文字：直接修改引号 '' 里的内容。
// 2. 修改图片：将 imageUrl 换成您的图片链接。
//    - 如果是本地图片，请将图片放入 public 文件夹，然后填入 '/your-image.jpg'
// 3. 修改视频：将 videoUrl 换成您的视频链接 (.mp4)。
//    - 如果有 videoUrl，图片(imageUrl)会作为视频封面显示。
// 4. 修改音频：将 audioUrl 换成您的音频链接 (.mp3)。
// 5. 修改图集：在 gallery (案例) 或 works (人员) 中添加更多图片链接。
// 6. 修改首页背景：在 heroConfig 中设置 backgroundColor (颜色) 或 backgroundImageUrl (图片)。
// 7. 修改品牌Logo：在 brandLogos 中更换为您公司的 3 个 Logo 图片。
// ==========================================

export const APP_DATA: AppConfig = {
  companyName: "译道佳华",
  slogan: "为热爱而生 · 为您而来",
  description: "贵州译道佳华文化发展有限公司，前身是一家经营10多年的品牌设计与影视工作室。现以视觉传达为核心，协助各政府、机构、企业宣传推广的创意型文化发展公司。旗下拥有【醒狮影视】&【龙予成林音乐工作室】影音创作组织架构。",
  
  // 首页首屏背景配置 (First Page Background)
  heroConfig: {
    // 默认背景色 (红色: #b91c1c)
    backgroundColor: '#b91c1c',
    
    // 背景图片 (如果您想用图片代替红色背景，请取消下面这行的注释并填入链接)
    // backgroundImageUrl: 'https://picsum.photos/1920/1080', 
  },

  // 网站背景音乐 (Background Music)
  // backgroundMusic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

  // 公司的 3 个品牌 Logo (显示在首页白色区域和页尾)
  brandLogos: [
    { id: 'l1', name: '译道佳华', imageUrl: 'https://via.placeholder.com/150x80/ffffff/b91c1c?text=YIDAO' },
    { id: 'l2', name: '醒狮影视', imageUrl: 'https://via.placeholder.com/150x80/ffffff/b91c1c?text=LION' },
    { id: 'l3', name: '龙予成林', imageUrl: 'https://via.placeholder.com/150x80/ffffff/b91c1c?text=MUSIC' }
  ],

  contact: {
    companyName: "贵州译道佳华文化发展有限公司",
    phone: ["15985194981", "13984832580"],
    address: "贵州省贵阳市"
  },
  // 服务商家 Logo 展示 (PDF P7)
  partners: [
    { id: 'p1', name: '中国工商银行', logoUrl: 'https://logo.clearbit.com/icbc.com.cn' },
    { id: 'p2', name: '贵州农信', logoUrl: 'https://via.placeholder.com/150x60?text=Guizhou+NongXin' },
    { id: 'p3', name: '苏宁易购', logoUrl: 'https://logo.clearbit.com/suning.com' },
    { id: 'p4', name: '保利新联', logoUrl: 'https://via.placeholder.com/150x60?text=Poly+XinLian' },
    { id: 'p5', name: 'GHMA', logoUrl: 'https://via.placeholder.com/150x60?text=GHMA' },
    { id: 'p6', name: '国贸集团', logoUrl: 'https://via.placeholder.com/150x60?text=Modern+Capital' },
    { id: 'p7', name: '中国南方电网', logoUrl: 'https://logo.clearbit.com/csg.cn' },
    { id: 'p8', name: '国际山地旅游联盟', logoUrl: 'https://via.placeholder.com/150x60?text=IMTA' },
    { id: 'p9', name: '贵州黔通智联', logoUrl: 'https://via.placeholder.com/150x60?text=QianTong' },
    { id: 'p10', name: 'doTERRA', logoUrl: 'https://logo.clearbit.com/doterra.com' },
    { id: 'p11', name: 'CETC大数据院', logoUrl: 'https://via.placeholder.com/150x60?text=CETC' },
    { id: 'p12', name: '联动云', logoUrl: 'https://via.placeholder.com/150x60?text=LianDongYun' }
  ],
  // 核心人员简介 (Core Team)
  team: [
    {
      id: "t1",
      role: "导演 / 品牌设计师 / 主理人",
      name: "主理人",
      imageUrl: "https://picsum.photos/400/500?random=t1",
      bio: "拥有超过10年的品牌设计与影视执导经验，擅长将视觉美学与品牌故事深度融合。曾主导多个大型政府及企业项目的品牌升级与宣传片拍摄。",
      works: [
         "https://picsum.photos/800/600?random=t1-1",
         "https://picsum.photos/800/600?random=t1-2",
         "https://picsum.photos/800/600?random=t1-3"
      ]
    },
    {
      id: "t2",
      role: "导演 / 摄影指导 / 航拍 / 主理人",
      name: "摄影指导",
      imageUrl: "https://picsum.photos/400/500?random=t2",
      bio: "资深摄影指导，精通各类电影摄影机及航拍设备。镜头语言丰富，擅长捕捉光影瞬间，为影片赋予独特的视觉质感。",
      works: [
         "https://picsum.photos/800/600?random=t2-1",
         "https://picsum.photos/800/600?random=t2-2"
      ]
    },
    {
      id: "t3",
      role: "独立音乐制作人 / 主理人",
      name: "音乐总监",
      imageUrl: "https://picsum.photos/400/500?random=t3",
      bio: "龙予成林音乐工作室创始人，专注于影视配乐、广告编曲及原创音乐制作。用声音诠释画面，提升作品的情感张力。",
      works: []
    },
    {
      id: "t4",
      role: "剪辑指导 / 灯光师",
      imageUrl: "https://picsum.photos/400/500?random=t4",
      bio: "后期制作的核心力量，对节奏与光影有独到的见解。",
      works: []
    },
    {
      id: "t5",
      role: "剪辑师 / 特效包装师",
      imageUrl: "https://picsum.photos/400/500?random=t5",
      bio: "精通特效合成与动态图形设计，为视频增添酷炫的视觉效果。",
      works: []
    },
    {
      id: "t6",
      role: "物料负责人",
      imageUrl: "https://picsum.photos/400/500?random=t6",
      bio: "负责各类宣传物料的统筹与落地，确保设计还原度。",
      works: []
    },
    {
      id: "t7",
      role: "策划师 / 文案",
      imageUrl: "https://picsum.photos/400/500?random=t7",
      bio: "创意的大脑，用文字构建品牌灵魂。",
      works: []
    },
    {
      id: "t8",
      role: "搭建及美术指导",
      imageUrl: "https://picsum.photos/400/500?random=t8",
      bio: "把控现场搭建效果与美术风格，打造沉浸式空间体验。",
      works: []
    }
  ],
  services: [
    {
      id: CategoryType.BRAND,
      title: "品牌平面设计",
      subtitle: "Brand Design",
      icon: "fa-pen-nib",
      description: "VIS视觉品牌设计、室内外文化墙宣传展板展示规划设计、平面创意海报设计。",
      items: [
        {
          id: "b1",
          title: "未来方舟-甜蜜小镇",
          description: "小区对外形象VI设计及施工图展示，打造充满幸福感的城市社区。",
          imageUrl: "https://picsum.photos/800/600?random=1",
          videoUrl: "",
          gallery: [
             "https://picsum.photos/800/600?random=1-1",
             "https://picsum.photos/800/600?random=1-2",
             "https://picsum.photos/800/600?random=1-3"
          ]
        },
        {
          id: "b2",
          title: "贵州省图书馆“贵图猫”",
          description: "形象IP设计规划，结合地域文化与阅读属性，打造亲民的IP形象。",
          imageUrl: "https://picsum.photos/800/600?random=2",
          videoUrl: "",
          gallery: []
        },
        {
          id: "b3",
          title: "工商银行中西支行",
          description: "专属VI设计，体现金融机构的专业与稳重。",
          imageUrl: "https://picsum.photos/800/600?random=3",
          videoUrl: "",
          gallery: []
        },
        {
          id: "b4",
          title: "健康基地VI全案",
          description: "设计规划及实景落地，营造健康、舒适的视觉环境。",
          imageUrl: "https://picsum.photos/800/600?random=4",
          videoUrl: "",
          gallery: []
        },
        {
          id: "b5",
          title: "党建规划设计",
          description: "贵州农商银行党建整改事项及宣传物料规划。",
          imageUrl: "https://picsum.photos/800/600?random=5",
          videoUrl: "",
          gallery: []
        },
        {
          id: "b6",
          title: "同济堂",
          description: "物料设计规划及安装，传承中医文化。",
          imageUrl: "https://picsum.photos/800/600?random=6",
          videoUrl: "",
          gallery: []
        },
         {
          id: "b7",
          title: "抗疫公益海报",
          description: "人民战疫，武汉加油 - 登上贵州动静APP。",
          imageUrl: "https://picsum.photos/800/1000?random=7",
          videoUrl: "",
          gallery: []
        }
      ]
    },
    {
      id: CategoryType.VIDEO,
      title: "影视拍摄及后期",
      subtitle: "Video Production",
      icon: "fa-video",
      description: "品牌宣传片、企业政府宣传片、广告片、微电影、微视频、后期剪辑、影视调色。",
      items: [
        {
          id: "v1",
          title: "醒狮影视 - 设备展示",
          description: "专业级前后期影视设备展示（含视频演示），配备RED摄影机、航拍器及全套灯光组。",
          imageUrl: "https://picsum.photos/800/600?random=10",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          gallery: [
            "https://picsum.photos/800/600?random=10-1",
            "https://picsum.photos/800/600?random=10-2"
          ]
        },
        {
          id: "v2",
          title: "中国南方电网研究院",
          description: "“中国十大国之重器”——伏羲芯片宣传片拍摄，展现科技硬实力。",
          imageUrl: "https://picsum.photos/800/600?random=11",
          videoUrl: "",
          gallery: []
        },
        {
          id: "v3",
          title: "构皮滩水电站通航工程",
          description: "宣传片视屏拍摄及制作，记录大国工程的宏伟时刻。",
          imageUrl: "https://picsum.photos/800/600?random=12",
          videoUrl: "",
          gallery: []
        },
        {
          id: "v4",
          title: "2024监狱微电影",
          description: "现场拍摄花絮，讲述高墙内的感人故事。",
          imageUrl: "https://picsum.photos/800/600?random=13",
          videoUrl: "",
          gallery: []
        },
         {
          id: "v5",
          title: "贵州苏宁创维新品",
          description: "拍摄及后期，商业广告片制作。",
          imageUrl: "https://picsum.photos/800/600?random=14",
          videoUrl: "",
          gallery: []
        },
        {
          id: "v6",
          title: "《军号·1979》",
          description: "纪录片拍摄及后期，铭记历史，致敬英雄。",
          imageUrl: "https://picsum.photos/800/600?random=15",
          videoUrl: "",
          gallery: []
        }
      ]
    },
    {
      id: CategoryType.MUSIC,
      title: "原创独立音乐",
      subtitle: "Original Music",
      icon: "fa-music",
      description: "龙予成林音乐工作室。广告片编曲制作、企业专属编曲&歌曲制作、微视频BGM制作。",
      items: [
        {
          id: "m1",
          title: "音乐工作室",
          description: "专业录音与编曲设备，提供高品质声音制作环境。",
          imageUrl: "https://picsum.photos/800/600?random=20",
          videoUrl: "",
          // 自主音乐链接示例 (MP3)
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
          gallery: []
        },
        {
          id: "m2",
          title: "企业专属歌曲",
          description: "为企业定制品牌主题曲，增强团队凝聚力与品牌识别度。",
          imageUrl: "https://picsum.photos/800/600?random=21",
          videoUrl: "",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          gallery: []
        }
      ]
    },
    {
      id: CategoryType.EVENT,
      title: "线下活动搭建",
      subtitle: "Event Construction",
      icon: "fa-users",
      description: "大型文艺演出策划执行、开业庆典、发布会、展厅摄影、舞台桁架搭建。",
      items: [
        {
          id: "e1",
          title: "贵州茶叶营销发展论坛",
          description: "线下活动搭建项目展示，专业舞美灯光音响支持。",
          imageUrl: "https://picsum.photos/800/600?random=30",
          videoUrl: "",
          gallery: []
        },
        {
          id: "e2",
          title: "开业典例",
          description: "醒狮表演与舞台搭建，营造热闹喜庆的开业氛围。",
          imageUrl: "https://picsum.photos/800/600?random=31",
          videoUrl: "",
          gallery: []
        },
        {
          id: "e3",
          title: "2018生态文明会议",
          description: "主会场搭建与执行，高标准会议服务。",
          imageUrl: "https://picsum.photos/800/600?random=32",
          videoUrl: "",
          gallery: []
        },
        {
          id: "e4",
          title: "阳光科密25周年",
          description: "贵阳年会现场搭建，全流程活动执行。",
          imageUrl: "https://picsum.photos/800/600?random=33",
          videoUrl: "",
          gallery: []
        },
        {
          id: "e5",
          title: "中国国际大数据产业博览会",
          description: "26个展位的设计、搭建，展示科技魅力。",
          imageUrl: "https://picsum.photos/800/600?random=34",
          videoUrl: "",
          gallery: []
        }
      ]
    },
    {
      id: CategoryType.PRINT,
      title: "广告物料&印刷",
      subtitle: "Printing Factory",
      icon: "fa-print",
      description: "自有广告物料及印刷包装厂房联合开展，提供一站式服务。",
      items: [
        {
          id: "p1",
          title: "物料厂房实景",
          description: "大型喷绘机、UV机设备展示，自有工厂，品质可控。",
          imageUrl: "https://picsum.photos/800/600?random=40",
          videoUrl: "",
          gallery: []
        },
        {
          id: "p2",
          title: "印刷厂房实景",
          description: "批量印刷生产线，满足大批量订单需求。",
          imageUrl: "https://picsum.photos/800/600?random=41",
          videoUrl: "",
          gallery: []
        },
         {
          id: "p3",
          title: "党建文化墙",
          description: "亚克力、PVC雕刻与安装，专业施工团队。",
          imageUrl: "https://picsum.photos/800/600?random=42",
          videoUrl: "",
          gallery: []
        }
      ]
    },
    {
      id: CategoryType.LECTURE,
      title: "授课&荣誉",
      subtitle: "Lectures & Honors",
      icon: "fa-graduation-cap",
      description: "获得各大学、职业学院、小学邀请授课分享，及各类奖项荣誉展示。",
      items: [
        {
          id: "l1",
          title: "大学授课分享",
          description: "受邀前往高校进行品牌设计与影视制作经验分享。",
          imageUrl: "https://picsum.photos/800/600?random=50",
          videoUrl: "",
          gallery: []
        },
        {
          id: "l2",
          title: "荣誉证书展示",
          description: "多年来荣获的各类行业奖项与认证。",
          imageUrl: "https://picsum.photos/800/600?random=51",
          videoUrl: "",
          gallery: []
        }
      ]
    }
  ]
};
