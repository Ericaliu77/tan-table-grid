"use client";

import { useState } from "react";

import { User, userDatas } from "./constants";
import {
  Table,
  Button,
  TableContainer,
  Column,
  TableCell,
  TableRow,
} from "@imile/table";
const TableDemo = (props: any) => {
  const [data, setData] = useState<User[]>([...userDatas]);
  const [enableSizing, setEnableSizing] = useState(true);
  const t = (str: string) => {
    return str;
  };
  // const columns = [
  //   {
  //     title: t("序号"),
  //     dataIndex: "index",
  //     width: 80,
  //     fixed: "left",
  //     render: (_: any, row: any, index: number) => {
  //       return index + 1;
  //     },
  //   },
  //   {
  //     title: t("提单号"),
  //     dataIndex: "number",
  //     width: 160,
  //     fixed: "left",
  //   },
  //   {
  //     title: t("类型"),
  //     dataIndex: "typeDesc",
  //     width: 100,
  //   },
  //   {
  //     title: t("批次号"),
  //     dataIndex: "intlTrackingNo",
  //     width: 140,
  //   },
  //   {
  //     title: t("入仓号"),
  //     dataIndex: "lotNo",
  //     width: 170,
  //   },
  //   {
  //     title: t("发票号"),
  //     dataIndex: "invoiceNo",
  //     width: 170,
  //   },
  //   {
  //     title: t("商家自发头程"),
  //     dataIndex: "clientFmDesc",
  //     width: 140,
  //   },
  //   {
  //     title: t("出仓时间"),
  //     dataIndex: "outboundTime",
  //     width: 180,
  //   },
  //   {
  //     title: t("货代"),
  //     dataIndex: "fmVendorName",
  //     width: 160,
  //     ellipsis: {
  //       showTitle: false,
  //     },
  //     render: (fmVendorName: string) => <span>{fmVendorName}</span>,
  //   },
  //   {
  //     title: t("货代收货时间"),
  //     dataIndex: "vendorReceiveDate",
  //     width: 200,
  //   },
  //   {
  //     title: t("起运港仓库收件时间"),
  //     dataIndex: "hkReceiveDate",
  //     width: 260,
  //   },
  //   {
  //     title: t("发件网点"),
  //     dataIndex: "shippingOcName",
  //     width: 160,
  //   },
  //   {
  //     title: t("目的网点"),
  //     dataIndex: "destinationOcName",
  //     width: 160,
  //   },
  //   {
  //     title: t("发件国家"),
  //     dataIndex: "shippingCountry",
  //     width: 140,
  //   },
  //   {
  //     title: t("目的国家"),
  //     dataIndex: "destinationCountry",
  //     width: 160,
  //   },
  //   {
  //     title: t("始发港"),
  //     dataIndex: "originalPort",
  //     width: 140,
  //   },
  //   {
  //     title: t("目的港"),
  //     dataIndex: "destinationPort",
  //     width: 150,
  //   },
  //   {
  //     title: t("航空公司"),
  //     dataIndex: "airLine",
  //     width: 100,
  //   },
  //   {
  //     title: t("航班号"),
  //     dataIndex: "flightNo",
  //     width: 100,
  //   },
  //   {
  //     title: t("预计起飞时间"),
  //     dataIndex: "expectDepartureDate",
  //     width: 180,
  //   },
  //   {
  //     title: t("实际起飞时间"),
  //     dataIndex: "actualDepartureDate",
  //     width: 180,
  //   },
  //   {
  //     title: t("预计到达时间"),
  //     dataIndex: "expectArriveDate",
  //     width: 180,
  //   },
  //   {
  //     title: t("实际到达时间"),
  //     dataIndex: "actualArriveDate",
  //     width: 180,
  //   },
  //   {
  //     title: t("航班货物到达时间"),
  //     dataIndex: "receivedFromFlightTime",
  //     width: 220,
  //   },
  //   {
  //     title: t("中转"),
  //     dataIndex: "isTransferDesc",
  //     width: 100,
  //   },
  //   {
  //     title: t("进口清关行"),
  //     dataIndex: "clearanceVendorName",
  //     width: 220,
  //     ellipsis: {
  //       showTitle: false,
  //     },
  //   },
  //   {
  //     title: t("清关开始时间"),
  //     dataIndex: "underClearanceTime",
  //     width: 180,
  //   },
  //   {
  //     title: t("最早清关开始时间"),
  //     dataIndex: "firstUnderClearanceTime",
  //     width: 240,
  //   },
  //   {
  //     title: t("清关查验时间"),
  //     dataIndex: "underInspectionTime",
  //     width: 180,
  //   },
  //   {
  //     title: t("清关完成时间"),
  //     dataIndex: "clearanceDate",
  //     width: 280,
  //   },
  //   {
  //     title: <span>最早清关完成时间</span>,
  //     dataIndex: "firstClearanceDate",
  //     width: 300,
  //   },
  //   {
  //     title: t("机场发车时间"),
  //     dataIndex: "truckDepartedFromAirportTime",
  //     width: 280,
  //   },
  //   {
  //     title: t("车辆到达RDC时间"),
  //     dataIndex: "whReceivedTime",
  //     width: 250,
  //   },
  //   {
  //     title: t("最早车辆到达RDC时间"),
  //     dataIndex: "firstWhReceivedTime",
  //     width: 250,
  //   },
  //   {
  //     title: t("首次目的国到件时间"),
  //     dataIndex: "firstLmArriveTime",
  //     width: 200,
  //   },
  //   {
  //     title: t("箱数"),
  //     dataIndex: "bagCount",
  //     width: 120,
  //   },
  //   {
  //     title: t("运单数"),
  //     dataIndex: "totalShipment",
  //     width: 120,
  //   },
  //   {
  //     title: (
  //       // <StyledToolTip
  //       //   title={i18n.t("高货值运单数")}
  //       //   tip={i18n.t("高货值运单数tips")}
  //       // />
  //       <span>高货值运单数</span>
  //     ),
  //     dataIndex: "highValueQty",
  //     width: 200,
  //   },
  //   {
  //     title: <span>低货值运单数</span>,
  //     dataIndex: "lowValueQty",
  //     width: 200,
  //   },
  //   {
  //     title: t("合包后数量"),
  //     dataIndex: "afterCoPackageShipment",
  //     width: 220,
  //   },
  //   {
  //     title: t("申报价值"),
  //     dataIndex: "totalDeclaredValue",
  //     width: 100,
  //   },
  //   {
  //     title: t("件数(供应商)"),
  //     dataIndex: "totalCount",
  //     width: 140,
  //   },
  //   {
  //     title: t("板数"),
  //     dataIndex: "pallet",
  //     width: 100,
  //   },
  //   {
  //     title: t("出仓毛重"),
  //     dataIndex: "totalGrossWeight",
  //     width: 180,
  //   },
  //   {
  //     title: t("出仓体积重"),
  //     dataIndex: "totalVolumeWeight",
  //     width: 200,
  //   },
  //   {
  //     title: t("货代计费重"),
  //     dataIndex: "totalBillingWeight",
  //     width: 200,
  //   },
  //   {
  //     title: t("提单毛重"),
  //     dataIndex: "mawbGrossWeight",
  //     width: 180,
  //   },
  //   {
  //     title: t("提单计费重"),
  //     dataIndex: "mawbBillingWeight",
  //     width: 200,
  //   },
  //   {
  //     title: t("出账状态"),
  //     dataIndex: "billingStatusDesc",
  //     width: 140,
  //   },
  //   {
  //     title: t("预报邮件状态"),
  //     dataIndex: "emailStatusDesc",
  //     width: 200,
  //     render: (text: string, row: any) => {
  //       // 邮件发送状态 1是成功 3是失败
  //       if (row.emailStatus === "1") {
  //         return <span style={{ color: "#00C479" }}>{text}</span>;
  //       } else if (row.emailStatus === "2") {
  //         return <span style={{ color: "#F53831" }}>{text}</span>;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: t("头程备注"),
  //     dataIndex: "description",
  //     width: 100,
  //   },
  //   {
  //     title: t("清关备注"),
  //     dataIndex: "ccDescription",
  //     width: 100,
  //   },

  //   {
  //     title: t("创建人"),
  //     dataIndex: "createUserName",
  //     width: 140,
  //   },
  //   {
  //     title: t("创建时间"),
  //     dataIndex: "createDate",
  //     width: 180,
  //   },
  //   {
  //     title: t("最后更新人"),
  //     dataIndex: "lastUpdUserName",
  //     width: 180,
  //   },
  //   {
  //     title: t("最后更新时间"),
  //     dataIndex: "lastUpdDate",
  //     width: 160,
  //   },
  //   {
  //     title: t("提醒"),
  //     dataIndex: "reminderDesc",
  //     width: 160,
  //     fixed: "right",
  //     ellipsis: {
  //       showTitle: false,
  //     },
  //     render: (text: string) => {
  //       if (text) {
  //         return <span sx={{ width: 160, color: "#F53831" }}>{text}</span>;
  //       }
  //       return "--";
  //     },
  //   },
  //   // {
  //   //   title: t("操作"),
  //   //   key: "operation",
  //   //   fixed: "right",
  //   //   renderActionList: {
  //   //     actionCount: 4,
  //   //     render: (_, record: IMawbTable) => {
  //   //       // 是否显示推送清关供应商
  //   //       const isPushSupplier = !!(
  //   //         permissions.has("airDownloadMawb") &&
  //   //         record.destinationCountry === "RSA" &&
  //   //         record.flightNo &&
  //   //         record.expectArriveDate
  //   //       );
  //   //       return [
  //   //         mawbBtn(record),
  //   //         bagBtn(record),
  //   //         waybillBtn(record),
  //   //         isPushSupplier ? pushSupplierBtn(record) : null,
  //   //         permissions.has("PreAlertEmail") ? preEmailBtn(record) : null,
  //   //         editBtn(record),
  //   //         deleteBtn(record),
  //   //       ].filter(Boolean);
  //   //     },
  //   //   },
  //   // },
  // ];
  const columns = [
    {
      title: t('序号'),
      dataIndex: 'index',
      width: 80,
      fixed: 'left',
      render: (_: any, row: any, index: number) => {
        return index + 1
      },
    },
    {
      title: "姓",
      dataIndex: "firstName",
      width: 300,
      align: "center",
      fixed: "left",
      // render: (_: any, topic: any) => topic ,
    },
    {
      title: "名字",
      dataIndex: "lastName",
      width: 100,
      ellipsis:true,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 80,
      fixed: "left",
    },
    {
      title: "状态statusstatusstatus",
      dataIndex: "status",
      width: 150,
    },
    {
      title: "状态1",
      dataIndex: "status1",
      width: 150,
    },
    {
      title: "状态2",
      dataIndex: "status2",
      width: 150,
    },
    {
      title: "访客",
      dataIndex: "visits",
      align: "center",
      width: 150,
      fixed: "right",
    },
    {
      title: "progress",
      dataIndex: "progress",
      align: "center",
      width: 150,
    },
    {
      title: "操作",
      width: 120,
      dataIndex: "action",
      fixed: "right",
      render: (_: any, topic: any) => {
        return <Button onClick={() => {}}> abcd</Button>;
      },
    },
  ];
  const [pagination, setPagination] = useState({
    current: 1,
    total: userDatas.length,
    pageSize: 10,
  });
  const onPageSizeChange = (pageSize: number) => {
    setPagination({
      ...pagination,
      pageSize: pageSize,
    });
  };
  const onPageChange = (page: number) => {
    setPagination({
      ...pagination,
      current: page,
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <Button
        onClick={() => {
          setPagination({
            ...pagination,
            current: pagination.current + 1,
          });
        }}
      >
        切页
      </Button>
      <Button
        onClick={() => {
          setEnableSizing(true);
        }}
      >
        sizingEnable
      </Button>
      {/* <TableContainer
      
      >
        <Column title="姓名" dataIndex="firstName" align="center" width= {200}/>
        <Column title="名字" dataIndex="lastName"  width= {200}/>
        <Column title="年龄" dataIndex="age"  width= {80}/>
        <Column title="状态" dataIndex="status" />

        {userDatas.map((data: User, index: any) => {
          return (
            <TableRow key={index}>
              {Object.entries(data).map((item, index) => {
                return <TableCell key={item[0]}>{item[1]}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableContainer> */}
      <div style={{}}>
        <Table
          enableColumnResizing={enableSizing}
          data={userDatas.slice(
            pagination.current * 10,
            (pagination.current + 1) * 10
          )}
         
          columns={columns}
          rowKey = "index"
          rowSelection={{
            selectedRowKeys:[],
            onChange: ( selectedRows: any[]) => {
              console.log(selectedRows)
            },
          }}
          fixedHeader
          pagination={{
            ...pagination,
            onChange: onPageChange,
            onShowSizeChange: onPageSizeChange,
          }}
        />
      </div>
    </div>
  );
};
export default TableDemo;
