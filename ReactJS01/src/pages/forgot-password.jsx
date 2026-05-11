import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { forgotPasswordApi } from '../util/api';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AuthLayout from '../component/layout/AuthLayout';

const ForgotPasswordPage = () => {
    const onFinish = async (values) => {
        const res = await forgotPasswordApi(values.email);
        if (res && res.EC === 0) {
            notification.success({ message: "Thông báo", description: res.EM });
        } else {
            notification.error({ message: "Lỗi", description: res?.EM });
        }
    };

    return (
        <AuthLayout title="Khôi Phục Mật Khẩu">
            <div style={{ marginBottom: 20 }}>
                <Link to="/">
                    <ArrowLeftOutlined /> Quay lại trang chủ
                </Link>
            </div>
            <p>Nhập email để nhận link đặt lại mật khẩu.</p>
            <Form onFinish={onFinish} layout='vertical'>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="example@gmail.com" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>Gửi yêu cầu</Button>
            </Form>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
                <Link to="/login">Quay lại Đăng nhập</Link>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;