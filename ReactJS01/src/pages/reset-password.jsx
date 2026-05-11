import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '../util/api';
import AuthLayout from '../component/layout/AuthLayout';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values) => {
        if (values.password !== values.confirmPassword) {
            notification.error({ 
                message: "Lỗi", 
                description: "Mật khẩu không trùng khớp!" 
            });
            return;
        }

        setLoading(true);
        try {
            const res = await resetPasswordApi(token, values.password);
            
            if (res && res.EC === 0) {
                notification.success({ 
                    message: "Thông báo", 
                    description: res.EM 
                });
                navigate('/login');
            } else {
                notification.error({ 
                    message: "Lỗi", 
                    description: res?.EM || "Đã xảy ra lỗi" 
                });
            }
        } catch (error) {
            notification.error({ 
                message: "Lỗi", 
                description: "Có lỗi xảy ra, vui lòng thử lại!" 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Đặt Lại Mật Khẩu">
            <Form onFinish={onFinish} layout='vertical'>
                <Form.Item 
                    name="password" 
                    label="Mật khẩu mới" 
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu' },
                        { min: 6, message: 'Mật khẩu phải tối thiểu 6 ký tự' }
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>
                
                <Form.Item 
                    name="confirmPassword" 
                    label="Xác nhận mật khẩu" 
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu' }
                    ]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu" />
                </Form.Item>
                
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    block 
                    loading={loading}
                >
                    Đặt lại mật khẩu
                </Button>
            </Form>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
