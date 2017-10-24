export default {
  _data: {
    //会员等级
    memberLevels: [{
        id: 0,
        name: '一星会员',
      },
      {
        id: 1,
        name: '二星会员',
      },
      {
        id: 2,
        name: '三星会员',
      },
      {
        id: 3,
        name: '四星会员',
      },
      {
        id: 4,
        name: '五星会员',
      },
    ],

    //权限
    authorities: [{
        id: 0,
        name: '充值统计',
      },
      {
        id: 1,
        name: '城市管理',
      },
      {
        id: 2,
        name: '举报管理',
      },
      {
        id: 3,
        name: '举报退费',
      },
      {
        id: 4,
        name: '申请兼职',
      },
      {
        id: 5,
        name: '用户查询',
      },
      {
        id: 6,
        name: '用户操作',
      },
      {
        id: 7,
        name: '删除停用权利',
      },
      {
        id: 8,
        name: '联系电话拉黑权利',
      },
      {
        id: 9,
        name: '审核原因添加权利',
      },
      {
        id: 10,
        name: '信息审核按城市选择权限',
      },
      {
        id: 11,
        name: '信息修改权利',
      },
      {
        id: 12,
        name: '信息删除下架权利',
      },
      {
        id: 13,
        name: '分享页修改权利',
      },
      {
        id: 14,
        name: '三个广告位修改权利',
      }
    ],

    //收费模式
    chargeMode: [{
        id: 0,
        name: '金额付费'
      },
      {
        id: 1,
        name: '积分付费'
      }
    ],

    //日期设置
    dateOptions: {
      shortcuts: [{
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    }
  }
}
