import {
  GoogleCircleFilled,
  LockOutlined,
  MobileOutlined,
  QqCircleFilled,
  RobotOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import { useState } from 'react';
import { supabase } from '../route/api';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';


export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState('phone');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(''); 
  const [error, setError] = useState(null);
  const [showVerifyCodeInput, setShowVerifyCodeInput] = useState(false); 

  
  const handleLogin = async (values) => {
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) setError(error.message);
    else alert('登录成功');
  };

  const handlePhoneLogin = async (phoneNumber) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error) {
      setError(error.message);
    } else {
      alert('验证码已发送至您的手机');
      setShowVerifyCodeInput(true); 
    }
  };

  const handleVerifyCode = async (phoneNumber, code) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: code,
      type: 'sms',
    });

    if (error) {
      setError(error.message);
    } else {
      alert('手机号验证成功，登录成功！');
      console.log('登录成功:', data); // data 包含用户 session 信息
    }
  };

  const onFinishForm = async (values) => {
    setError(null); 
    if (loginType === 'account') {
      // 邮箱密码登录直接调用 handleLogin
      await handleLogin(values);
    } else if (loginType === 'phone') {
      // 手机号登录根据当前状态判断是发送验证码还是验证验证码
      if (showVerifyCodeInput) {
        // 如果 showVerifyCodeInput 为 true，说明已经发送了验证码，现在需要验证
        if (values.captcha) {
          await handleVerifyCode(mobile, values.captcha);
        } else {
          setError('请输入验证码');
        }
      } else {
        // 如果 showVerifyCodeInput 为 false，说明需要先发送验证码
        if (values.mobile) {
          setMobile(values.mobile);
          await handlePhoneLogin(values.mobile);
        } else {
          setError('请输入手机号');
        }
      }
    }
  };

  const iconStyles = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          width: 600,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: 32,
        }}
      >
        <LoginForm
          logo={<RobotOutlined style={{ marginUp: 20, marginRight: 16, fontSize: 36 }} />}
          title="Chat Studio"
          subTitle="由 Sawtone 开发的 mini Cherry Studio"
          actions={
            <Space>
              其他登录方式
              <WechatOutlined style={iconStyles} />
              <QqCircleFilled style={iconStyles} />
              <GoogleCircleFilled style={iconStyles} />
            </Space>
          }
          onFinish={onFinishForm}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => {
              setLoginType(activeKey);
              setShowVerifyCodeInput(false);
              setError(null);
            }}
          >
            <Tabs.TabPane key={'account'} tab={'邮箱密码登录'} />
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'邮箱'}
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>强度：弱</div>
                    );
                  },
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码'}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  // onGetCaptcha={async (form) => {
                  //   const mobileValue = form?.getFieldValue('mobile');
                  //   if (mobileValue) {
                  //     setMobile(mobileValue); // 保存输入的手机号
                  //     await handlePhoneLogin(mobileValue);
                  //   } else {
                  //     setError('请先输入手机号');
                  //   }
                  // }}
                  onGetCaptcha={async () => {
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                  captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
            <Link 
              to="/signup" 
              style={{ 
                float: 'right',
                marginRight: '10px',
              }}
            >
              立即注册
            </Link>
          </div>
        </LoginForm>
      </div>
      </div>
    </ProConfigProvider>
  );
};