import React from 'react';
import { Button, Divider, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AuthLayout from '../component/layout/AuthLayout';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginApi(email, password);

        if (res && res.EC === 0) {
            notification.success({ message: "Thành công", description: "Đăng nhập thành công!" });
            navigate("/");
        } else {
            notification.error({ message: "Lỗi", description: res?.EM ?? "Đã có lỗi xảy ra" });
        }
    };

    return (
        <AuthLayout title="Đăng nhập">
            <div style={{ marginBottom: 20 }}>
                <Link to="/">
                    <ArrowLeftOutlined /> Về trang chủ
                </Link>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form.Item>

                <Divider>Hoặc</Divider>

                <div style={{ textAlign: "center" }}>
                    Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </div>
                <div style={{ textAlign: "center", marginTop: 10 }}>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default LoginPage;
