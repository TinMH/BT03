import React from 'react';
import { Button, Divider, Form, Input, notification } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AuthLayout from '../component/layout/AuthLayout';

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password } = values;
        const res = await createUserApi(name, email, password);

        if (res && res.EC === 0) {
            notification.success({ message: "Thành công", description: "Tạo tài khoản thành công!" });
            navigate("/login");
        } else {
            notification.error({ message: "Lỗi", description: res?.EM ?? "Đã có lỗi xảy ra" });
        }
    };

    return (
        <AuthLayout title="Đăng Ký Tài Khoản">
            <div style={{ marginBottom: 20 }}>
                <Link to="/">
                    <ArrowLeftOutlined /> Quay lại trang chủ
                </Link>
            </div>
            <Form name="register" onFinish={onFinish} layout='vertical'>
                <Form.Item label="Họ tên" name="name" rules={[{ required: true, message: 'Nhập tên!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, min: 6, message: 'Tối thiểu 6 ký tự!' }]}>
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>Đăng ký</Button>
            </Form>
            <Divider />
            <div style={{ textAlign: "center" }}>
                <div style={{ marginTop: "10px" }}>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;