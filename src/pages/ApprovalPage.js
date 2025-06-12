import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Spin, Tag } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

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

      // Dummy leave data
      const dummyData = [
        {
          id: 1,
          employeeName: 'John Doe',
          leaveType: 'Sick Leave',
          startDate: '2025-06-10',
          endDate: '2025-06-12',
          days: 3,
          reason: 'Fever and doctor’s advice',
          appliedDate: '2025-06-08',
          comments: 'Need rest as advised',
        },
        {
          id: 2,
          employeeName: 'Jane Smith',
          leaveType: 'Annual Leave',
          startDate: '2025-06-15',
          endDate: '2025-06-20',
          days: 6,
          reason: 'Family vacation',
          appliedDate: '2025-06-09',
        },
        {
          id: 3,
          employeeName: 'Rahul Kumar',
          leaveType: 'Parental Leave',
          startDate: '2025-06-05',
          endDate: '2025-06-25',
          days: 21,
          reason: 'New baby born',
          appliedDate: '2025-06-01',
        },
      ];

      // Simulate API delay
      setTimeout(() => {
        setPendingLeaves(dummyData);
        setLoading(false);
      }, 1000);

    } catch (error) {
      message.error('Failed to fetch pending leaves');
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId) => {
    setActionLoading(true);
    setTimeout(() => {
      message.success(`Leave ID ${leaveId} approved (mock)`);
      setPendingLeaves((prev) => prev.filter((leave) => leave.id !== leaveId));
      setActionLoading(false);
      setModalVisible(false);
    }, 800);
  };

  const handleReject = async (leaveId) => {
    setActionLoading(true);
    setTimeout(() => {
      message.success(`Leave ID ${leaveId} rejected (mock)`);
      setPendingLeaves((prev) => prev.filter((leave) => leave.id !== leaveId));
      setActionLoading(false);
      setModalVisible(false);
    }, 800);
  };

  const showLeaveDetails = (leave) => {
    setSelectedLeave(leave);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: 'Applied On',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="text"
            icon={<CheckOutlined />}
            style={{ color: 'green' }}
            onClick={() => handleApprove(record.id)}
            loading={actionLoading}
          />
          <Button
            type="text"
            icon={<CloseOutlined />}
            style={{ color: 'red' }}
            onClick={() => handleReject(record.id)}
            loading={actionLoading}
          />
          <Button type="link" onClick={() => showLeaveDetails(record)}>
            Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="approval-page" style={{ padding: '20px' }}>
      <h2>Pending Leave Approvals</h2>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={pendingLeaves}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />

          <Modal
            title="Leave Request Details"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="back" onClick={() => setModalVisible(false)}>
                Close
              </Button>,
              <Button
                key="approve"
                type="primary"
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                onClick={() => handleApprove(selectedLeave?.id)}
                loading={actionLoading}
              >
                Approve
              </Button>,
              <Button
                key="reject"
                danger
                onClick={() => handleReject(selectedLeave?.id)}
                loading={actionLoading}
              >
                Reject
              </Button>,
            ]}
          >
            {selectedLeave && (
              <div>
                <p>
                  <strong>Employee:</strong> {selectedLeave.employeeName}
                </p>
                <p>
                  <strong>Leave Type:</strong> {selectedLeave.leaveType}
                </p>
                <p>
                  <strong>Period:</strong> {new Date(selectedLeave.startDate).toLocaleDateString()} to{' '}
                  {new Date(selectedLeave.endDate).toLocaleDateString()} ({selectedLeave.days} days)
                </p>
                <p>
                  <strong>Reason:</strong> {selectedLeave.reason}
                </p>
                {selectedLeave.comments && (
                  <p>
                    <strong>Comments:</strong> {selectedLeave.comments}
                  </p>
                )}
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ApprovalPage;
