// frontend/src/pages/ApprovalPage.js

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Spin, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { endpoint } from "../constants";

const ApprovalPage = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  const fetchPendingLeaves = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${endpoint}/leaves/pending`);
      setPendingLeaves(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch pending leaves");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId) => {
    try {
      setActionLoading(true);
      await axios.put(`${endpoint}/leaves/${leaveId}/approve`);
      message.success(`Leave ID ${leaveId} approved`);
      fetchPendingLeaves();
    } catch (error) {
      message.error("Approval failed");
    } finally {
      setActionLoading(false);
      setModalVisible(false);
    }
  };

  const handleReject = async (leaveId) => {
    try {
      setActionLoading(true);
      await axios.put(`${endpoint}/leaves/${leaveId}/reject`);
      message.success(`Leave ID ${leaveId} rejected`);
      fetchPendingLeaves();
    } catch (error) {
      message.error("Rejection failed");
    } finally {
      setActionLoading(false);
      setModalVisible(false);
    }
  };

  const showLeaveDetails = (leave) => {
    setSelectedLeave(leave);
    setModalVisible(true);
  };

  const columns = [
    { title: "Employee", dataIndex: "employee_name" },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    { title: "Days", dataIndex: "leave_days" },
    { title: "Reason", dataIndex: "reason", ellipsis: true },
    {
      title: "Applied On",
      dataIndex: "applied_date",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            icon={<CheckOutlined />}
            style={{ color: "green" }}
            onClick={() => handleApprove(record.id)}
            loading={actionLoading}
          />
          <Button
            icon={<CloseOutlined />}
            style={{ color: "red" }}
            onClick={() => handleReject(record.id)}
            loading={actionLoading}
          />
          <Button type="link" onClick={() => showLeaveDetails(record)}>
            Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Leave Approvals</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Table columns={columns} dataSource={pendingLeaves} rowKey="id" />
          <Modal
            title="Leave Details"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="back" onClick={() => setModalVisible(false)}>
                Close
              </Button>,
              <Button
                key="approve"
                type="primary"
                onClick={() => handleApprove(selectedLeave.id)}
                loading={actionLoading}
              >
                Approve
              </Button>,
              <Button
                key="reject"
                danger
                onClick={() => handleReject(selectedLeave.id)}
                loading={actionLoading}
              >
                Reject
              </Button>,
            ]}
          >
            {selectedLeave && (
              <>
                <p>
                  <b>Employee:</b> {selectedLeave.employee_name}
                </p>
                <p>
                  <b>Type:</b> {selectedLeave.leave_type}
                </p>
                <p>
                  <b>Period:</b> {selectedLeave.start_date} to{" "}
                  {selectedLeave.end_date}
                </p>
                <p>
                  <b>Reason:</b> {selectedLeave.reason}
                </p>
              </>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ApprovalPage;
